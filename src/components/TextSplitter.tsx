type Props = {
  text: string;
  className?: string;
  wordDisplayStyle?: "inline-block" | "block";
};

export function TextSplitter({
  text,
  className,
  wordDisplayStyle = "inline-block",
}: Props) {
  if (!text) return null;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span
          key={`${wi}-${word}`}
          className={`split-word ${className ?? ""}`}
          style={{ display: wordDisplayStyle, whiteSpace: "pre" }}
        >
          {word.split("").map((ch, ci) => (
            <span
              key={ci}
              className={`split-char split-char--${wi}-${ci}`}
              style={{ display: "inline-block" }}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? <span className="split-char">{` `}</span> : ""}
        </span>
      ))}
    </>
  );
}
