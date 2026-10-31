/**
 * Markdown.tsx — the tiny renderer the blog posts use: ## / ### headings,
 * bullets, **bold**, [text](url) links and bare URLs. Pure; no hooks.
 */

const LINK_CLASS =
  'text-orange-500 underline underline-offset-2 hover:text-orange-400 break-all';

// Renders [text](url), **bold**, and bare http(s) URLs inside a line of text.
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(
        <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <strong key={key++} className="text-white">
          {match[3]}
        </strong>
      );
    } else {
      // Bare URL: keep trailing punctuation out of the link target
      const raw = match[4];
      const trimmed = raw.replace(/[.,;:]+$/, '');
      parts.push(
        <a key={key++} href={trimmed} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {trimmed}
        </a>
      );
      if (trimmed.length < raw.length) parts.push(raw.slice(trimmed.length));
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="mt-8 mb-3 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('- **')) {
      // List item with bold start
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="flex min-w-0 items-start gap-3 text-gray-400 leading-relaxed [&>span]:min-w-0">
            <span className="text-white/40 mt-1">&bull;</span>
            <span><strong className="text-white">{match[1]}</strong>{renderInline(match[2])}</span>
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="flex min-w-0 items-start gap-3 text-gray-400 leading-relaxed [&>span]:min-w-0">
          <span className="text-white/40 mt-1">&bull;</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      // Inline bold-prefix pattern (e.g., "**Lead-in:** rest of line")
      const m = line.match(/^\*\*([^*]+):\*\*(.*)$/);
      if (m) {
        elements.push(
          <p key={i} className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-white">{m[1]}: </strong>
            {renderInline(m[2].trim())}
          </p>
        );
      } else {
        elements.push(
          <p key={i} className="text-white font-semibold mt-4 mb-2">
            {line.slice(2, -2)}
          </p>
        );
      }
    } else if (line.startsWith('**')) {
      // Bold paragraph
      const cleaned = line.replace(/\*\*/g, '');
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed mb-4">
          <strong className="text-white">{cleaned}</strong>
        </p>
      );
    } else if (line.trim() === '') {
      // Skip empty lines
    } else {
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="space-y-0">{elements}</div>;
}
