"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for high-end organic movement
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const innerSpringX = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const innerSpringY = useSpring(cursorY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    // Detect coarse pointers (touchscreens) safely after hydration
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsCoarsePointer(true);
    }
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    // Enable cursor class on body
    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hover effect event listeners
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .interactive-planet, .terminal-container, .timeline-node"
      );

      interactiveElements.forEach((el) => {
        // Skip elements that already have listeners to avoid double counts
        if (el.getAttribute("data-cursor-bound")) return;
        el.setAttribute("data-cursor-bound", "true");

        el.addEventListener("mouseenter", () => {
          setIsHovered(true);
          const text = el.getAttribute("data-cursor-text") || "";
          setCursorText(text);
        });

        el.addEventListener("mouseleave", () => {
          setIsHovered(false);
          setCursorText("");
        });
      });
    };

    // Observe DOM changes to attach listeners to dynamic elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial run
    addHoverListeners();

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible, isCoarsePointer]);

  if (isCoarsePointer) {
    // Disable render on touch screens
    return null;
  }

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-secondary pointer-events-none z-50 mix-blend-screen opacity-0"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? "#00FFA3" : "#00E5FF",
          backgroundColor: isHovered ? "rgba(0, 255, 163, 0.05)" : "rgba(0, 229, 255, 0.02)",
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovered
            ? "0 0 20px rgba(0, 255, 163, 0.6), inset 0 0 10px rgba(0, 255, 163, 0.3)"
            : "0 0 12px rgba(0, 229, 255, 0.3)",
          transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Inner Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-primary pointer-events-none z-50 opacity-0 flex items-center justify-center overflow-hidden"
        style={{
          x: innerSpringX,
          y: innerSpringY,
          left: 9,
          top: 9,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "#00FFA3" : "#6C63FF",
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovered ? "0 0 8px #00FFA3" : "0 0 4px #6C63FF",
          transition: "background-color 0.2s, box-shadow 0.2s",
        }}
      >
        {cursorText && (
          <span className="text-[3px] font-bold text-black select-none tracking-tighter uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
