'use client'
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "./container";
import { achivementsContent } from "../Content/Achievements";

/**
 * Achievement slider / showcase (keeps existing layout & styles)
 * - Safely derives year from item.date (if present) instead of relying on a non-existent `year` property.
 * - Keeps Next/Image usage and Tailwind styling.
 */
const Achievement = () => {
  const data = achivementsContent;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      setCanPrev(el.scrollLeft > 10);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onPointerDown: React.PointerEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler = (e) => {
    if (!isDragging.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    el.scrollLeft = scrollStart.current - dx;
  };

  const onPointerUp: React.PointerEventHandler = (e) => {
    isDragging.current = false;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const cardWidth = () => {
    const el = scrollerRef.current;
    if (!el) return 320;
    const card = el.querySelector<HTMLElement>("[data-ach-card]");
    if (!card) return 320;
    const style = getComputedStyle(card);
    return card.offsetWidth + parseFloat(style.marginRight || "16");
  };

  const scrollBy = (count = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: cardWidth() * count, behavior: "smooth" });
  };

  const extractYear = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return null;
      return String(d.getFullYear());
    } catch {
      return null;
    }
  };

  return (
    <Container className="px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mt-6 md:mt-10">
        <h1 className="text-white font-figtree text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-medium leading-tight lg:leading-[81px] not-italic">
          Our Achievements
        </h1>
        <div className="w-full h-[2px] bg-white/12" />
        <div className="text-sm md:text-base font-normal text-[var(--muted-text)]">
          Over the years we&apos;ve transformed the face of cybersecurity, therby
          therefore realise regardless thereafter unrestored underestimated
          variety of various undisputed achievments
        </div>
      </div>

      <div className="relative mt-6">
        {/* Prev button */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous achievement"
            className={`w-11 h-11 rounded-lg flex items-center justify-center border border-white/10 bg-white/3 backdrop-blur-md text-white transition ${canPrev ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
            disabled={!canPrev}
          >
            ‹
          </button>
        </div>

        {/* Next button */}
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next achievement"
            className={`w-11 h-11 rounded-lg flex items-center justify-center border border-white/10 bg-white/3 backdrop-blur-md text-white transition ${canNext ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
            disabled={!canNext}
          >
            ›
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth scroll-snap-x snap-mandatory touch-pan-x"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="list"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") scrollBy(-1);
            else if (e.key === "ArrowRight") scrollBy(1);
          }}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {data.map((item, idx) => {
            const year = extractYear((item as any).date || (item as any).year);
            return (
              <article
                key={idx}
                data-ach-card
                role="listitem"
                className="flex-shrink-0 w-[280px] sm:w-[320px] max-w-[320px] scroll-snap-align-center rounded-2xl border border-[var(--border)] bg-white/5 backdrop-blur-md overflow-hidden shadow-lg"
              >
                <div className="w-full aspect-[2.1/1] bg-[#111] relative">
                  <Image src={item.imgUrl} fill alt={item.title} className="object-cover" />
                </div>

                <div className="p-3">
                  <div className="flex justify-between items-center text-xs text-[var(--muted-text)] mb-2">
                    <span className="font-medium">{item.title}</span>
                    {year && <span className="text-xs px-2 py-1 rounded-full bg-white/3">{year}</span>}
                  </div>
                  <div className="text-sm text-white/90 font-semibold leading-tight">
                    {item.title}
                  </div>
                  {item.description && <p className="text-sm text-[var(--muted-text)] mt-2">{item.description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Achievement;
