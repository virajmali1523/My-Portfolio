"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    // Subtle fog to blend elements
    scene.fog = new THREE.FogExp2(0x030014, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111122, 1.5);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8f43ff, 8, 30);
    purpleLight.position.set(5, 5, 5);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 8, 30);
    cyanLight.position.set(-5, -5, 5);
    scene.add(cyanLight);

    const accentLight = new THREE.PointLight(0xff007a, 4, 20);
    accentLight.position.set(0, 0, 8);
    scene.add(accentLight);

    // Starfield Particle System
    const particleCount = 250;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread stars around
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      particleSpeeds[i] = 0.02 + Math.random() * 0.05;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Make stars circular and glowing
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 16;
    starCanvas.height = 16;
    const ctx = starCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(0, 229, 255, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starParticles);

    // 3D Organic Morphing Blob
    // Detail: icosahedron with subdivision
    const blobGeometry = new THREE.IcosahedronGeometry(2.4, 3);
    // Keep a copy of the original vertex positions for deformation
    const originalPositions = blobGeometry.attributes.position.clone();

    // Material with glass/glow look
    const blobMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x120c2b,
      emissive: 0x2a0d5c,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6, // Glassy transmission
      thickness: 1.5,
      flatShading: false,
      wireframe: false,
    });

    const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
    blobMesh.position.set(0, 0, 0);
    scene.add(blobMesh);

    // Also a wireframe overlay for techy aesthetic
    const wireframeGeometry = new THREE.IcosahedronGeometry(2.42, 3);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff007a,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize from -1 to 1
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Rotate starfield and tilt based on mouse
      starParticles.rotation.y = elapsedTime * 0.02;
      starParticles.rotation.x = mouse.y * 0.2;
      starParticles.rotation.y += mouse.x * 0.2;

      // Animate particles (drift forward/downward)
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Slowly modify the Z position
        positions[i * 3 + 2] += particleSpeeds[i] * 0.05;
        // If they fly past the camera, reset them deep
        if (positions[i * 3 + 2] > 10) {
          positions[i * 3 + 2] = -15;
          positions[i * 3] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Animate Point Lights based on mouse
      accentLight.position.x = mouse.x * 6;
      accentLight.position.y = mouse.y * 6;

      purpleLight.position.x = Math.sin(elapsedTime * 0.5) * 8 + mouse.x * 3;
      purpleLight.position.y = Math.cos(elapsedTime * 0.3) * 8 + mouse.y * 3;

      cyanLight.position.x = -Math.sin(elapsedTime * 0.4) * 8 + mouse.x * 3;
      cyanLight.position.y = -Math.cos(elapsedTime * 0.6) * 8 + mouse.y * 3;

      // Deform Blob Geometry (CPU vertex noise / wave simulation)
      const blobPositions = blobGeometry.attributes.position;
      const originalArray = originalPositions.array as Float32Array;
      const blobArray = blobPositions.array as Float32Array;

      for (let i = 0; i < blobPositions.count; i++) {
        const x = originalArray[i * 3];
        const y = originalArray[i * 3 + 1];
        const z = originalArray[i * 3 + 2];

        // 3D vector length (radius)
        const length = Math.sqrt(x * x + y * y + z * z);

        // Simple wave equations to deform coordinates
        const wave1 = Math.sin(x * 1.5 + elapsedTime * 1.2) * 0.15;
        const wave2 = Math.cos(y * 1.5 + elapsedTime * 1.5) * 0.15;
        const wave3 = Math.sin(z * 1.2 + elapsedTime * 1.0) * 0.12;

        const scale = 1 + (wave1 + wave2 + wave3);

        blobArray[i * 3] = x * scale;
        blobArray[i * 3 + 1] = y * scale;
        blobArray[i * 3 + 2] = z * scale;
      }
      blobGeometry.computeVertexNormals();
      blobPositions.needsUpdate = true;

      // Rotate Blob & Wireframe
      blobMesh.rotation.y = elapsedTime * 0.15;
      blobMesh.rotation.x = elapsedTime * 0.1;
      // Slight response to mouse
      blobMesh.position.x = mouse.x * 0.5;
      blobMesh.position.y = mouse.y * 0.5;

      wireframeMesh.rotation.y = -elapsedTime * 0.08;
      wireframeMesh.rotation.x = -elapsedTime * 0.05;
      wireframeMesh.position.copy(blobMesh.position);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose resources
      scene.clear();
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      starTexture.dispose();
      blobGeometry.dispose();
      blobMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
