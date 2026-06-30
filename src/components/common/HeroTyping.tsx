"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface HeroTypingProps {
  strings: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  cursorChar?: string;
}

export default function HeroTyping({
  strings,
  className = "",
  typeSpeed = 80,
  backSpeed = 40,
  backDelay = 1500,
  loop = true,
  cursorChar = "|",
}: HeroTypingProps) {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
      showCursor: true,
      cursorChar,
    });

    return () => {
      typed.destroy();
    };
  }, [strings, typeSpeed, backSpeed, backDelay, loop, cursorChar]);

  return (
    <div className={`block min-h-[42px] sm:min-h-[50px] lg:min-h-[64px] ${className}`}>
      <span ref={typedRef} />
    </div>
  );
}