import React from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors open:bg-[var(--surface-warm)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[var(--fg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
        <span className="text-base sm:text-lg">{question}</span>
        <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-sm transition-transform duration-200 group-open:rotate-180">
          ↓
        </span>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] sm:text-base border-t border-[var(--border-soft)] pt-3">
        {answer}
      </div>
    </details>
  );
}
