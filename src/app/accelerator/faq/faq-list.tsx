"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/accelerator/faq";
import { track } from "@/lib/accelerator/analytics";
import { cn } from "@/lib/utils";

export function FaqList({ items, group }: { items: FaqItem[]; group: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="mt-2 divide-y divide-[var(--acc-line-paper)]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <button
              onClick={() => {
                setOpen(isOpen ? null : i);
                if (!isOpen) track("faq_opened", { question: f.q, group });
              }}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acc-signal)]"
            >
              <span className="text-[16.5px] font-medium">{f.q}</span>
              <Plus
                aria-hidden
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--acc-signal)] transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            {isOpen && (
              <p className="pb-6 pr-10 max-w-3xl text-[15px] leading-relaxed text-[var(--acc-graphite)]">
                {f.a}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
