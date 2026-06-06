export function Field({ label, value, onChange, multiline = false }) {
  return (
    <div>
      <label className="label">{label}</label>
      {multiline ? (
        <textarea
          className="field min-h-28 resize-y"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className="field" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function ListEditor({ label, items, onChange }) {
  const text = items.join("\n");
  return (
    <div>
      <label className="label">{label} (one item per line)</label>
      <textarea
        className="field min-h-36 resize-y font-mono text-sm"
        value={text}
        onChange={(e) => onChange(e.target.value.split("\n").filter(Boolean))}
      />
    </div>
  );
}
