import React from 'react';

interface MdxRendererProps {
  source: string;
}

const INLINE_PATTERN = /(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\([^)\s]+\))/g;

/**
 * Markdown inline minimal: **tebal** dan [tautan](url).
 * Cukup untuk catatan kaki/sumber tanpa menambah dependensi parser.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text
    .split(INLINE_PATTERN)
    .filter((part) => part !== '')
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;

      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={key} className="font-semibold text-[var(--fg)]">
            {part.slice(2, -2)}
          </strong>
        );
      }

      const link = /^\[([^\]\n]+)\]\(([^)\s]+)\)$/.exec(part);
      if (link) {
        return (
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
          >
            {link[1]}
          </a>
        );
      }

      return part;
    });
}

export function MdxRenderer({ source }: MdxRendererProps) {
  const paragraphs = source.split(/\n\n+/);

  return (
    <article className="prose max-w-none text-base leading-relaxed text-[var(--fg)]">
      {paragraphs.map((p, idx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className="mt-10 mb-4 text-lg font-bold tracking-tight text-[var(--fg)] sm:text-xl"
            >
              {renderInline(trimmed.slice(4), `h3-${idx}`)}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="mt-10 mb-5 text-xl font-bold tracking-tight text-[var(--fg)] sm:text-2xl"
            >
              {renderInline(trimmed.slice(3), `h2-${idx}`)}
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h1
              key={idx}
              className="mt-14 mb-6 text-2xl font-extrabold tracking-tight text-[var(--fg)] sm:text-3xl"
            >
              {renderInline(trimmed.slice(2), `h1-${idx}`)}
            </h1>
          );
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter((line) => line.trim().startsWith('- '));
          return (
            <ul
              key={idx}
              className="my-6 list-disc space-y-3 pl-7 text-base leading-relaxed text-[var(--fg-2)]"
            >
              {items.map((item, iIdx) => (
                <li key={iIdx}>{renderInline(item.replace(/^- /, ''), `li-${idx}-${iIdx}`)}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((line) => /^\d+\.\s/.test(line.trim()));
          return (
            <ol
              key={idx}
              className="my-6 list-decimal space-y-3 pl-7 text-base leading-relaxed text-[var(--fg-2)]"
            >
              {items.map((item, iIdx) => (
                <li key={iIdx}>{renderInline(item.replace(/^\d+\.\s*/, ''), `ol-${idx}-${iIdx}`)}</li>
              ))}
            </ol>
          );
        }
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="my-8 rounded-r-lg border-l-4 border-[var(--accent)] bg-[var(--surface-warm)]/40 py-2 pl-6 text-base text-[var(--fg-2)] italic sm:text-lg"
            >
              {renderInline(trimmed.replace(/^>\s*/gm, ''), `quote-${idx}`)}
            </blockquote>
          );
        }

        return (
          <p key={idx} className="my-6 text-base leading-relaxed text-[var(--fg-2)]">
            {renderInline(trimmed, `p-${idx}`)}
          </p>
        );
      })}
    </article>
  );
}
