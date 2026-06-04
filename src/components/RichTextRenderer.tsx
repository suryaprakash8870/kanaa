type LexicalTextNode = {
  type: "text";
  text: string;
  format?: number;
};

type LexicalElementNode = {
  type: string;
  tag?: string;
  listType?: "bullet" | "number";
  children?: LexicalNode[];
  url?: string;
  fields?: { url?: string };
};

type LexicalNode = LexicalTextNode | LexicalElementNode;

function renderText(node: LexicalTextNode): React.ReactNode {
  if (!node.text) return null;
  let content: React.ReactNode = node.text;
  const fmt = node.format ?? 0;
  if (fmt & 1) content = <strong>{content}</strong>;
  if (fmt & 2) content = <em>{content}</em>;
  if (fmt & 8) content = <u>{content}</u>;
  if (fmt & 4) content = <s>{content}</s>;
  if (fmt & 16) content = <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: "0.88em", fontFamily: "monospace" }}>{content}</code>;
  return content;
}

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === "text") return <span key={key}>{renderText(node as LexicalTextNode)}</span>;
  if (node.type === "linebreak") return <br key={key} />;

  const el = node as LexicalElementNode;
  const children = el.children?.map((child, i) => renderNode(child, i)) ?? [];

  switch (el.type) {
    case "paragraph":
      return <p key={key} style={{ margin: "0 0 1.2em", lineHeight: 1.8 }}>{children.length ? children : <br />}</p>;
    case "heading": {
      const tag = (el.tag ?? "h2") as keyof React.JSX.IntrinsicElements;
      const sizes: Record<string, string> = { h1: "2em", h2: "1.55em", h3: "1.25em", h4: "1.1em", h5: "1em", h6: "0.9em" };
      const Tag = tag;
      return <Tag key={key} style={{ margin: "1.6em 0 0.5em", fontWeight: 700, lineHeight: 1.25, fontSize: sizes[tag as string] ?? "1.2em" }}>{children}</Tag>;
    }
    case "quote":
      return (
        <blockquote key={key} style={{ margin: "1.5em 0", borderLeft: "3px solid #1F4A33", paddingLeft: 18, color: "#4b5563", fontStyle: "italic" }}>
          {children}
        </blockquote>
      );
    case "list":
      return el.listType === "number"
        ? <ol key={key} style={{ margin: "0 0 1.2em", paddingLeft: 24, lineHeight: 1.8 }}>{children}</ol>
        : <ul key={key} style={{ margin: "0 0 1.2em", paddingLeft: 24, lineHeight: 1.8 }}>{children}</ul>;
    case "listitem":
      return <li key={key}>{children}</li>;
    case "link": {
      const url = el.fields?.url ?? el.url ?? "#";
      return <a key={key} href={url} style={{ color: "#C0301F", textDecoration: "underline" }} target={url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a>;
    }
    case "horizontalrule":
      return <hr key={key} style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "2em 0" }} />;
    default:
      return children.length ? <span key={key}>{children}</span> : null;
  }
}

export default function RichTextRenderer({ content }: { content: unknown }) {
  if (!content || typeof content !== "object") return null;
  const root = (content as { root?: { children?: LexicalNode[] } }).root;
  if (!root?.children) return null;
  return <>{root.children.map((node, i) => renderNode(node, i))}</>;
}
