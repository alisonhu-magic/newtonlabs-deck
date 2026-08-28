type Tone = "muted" | "default";

export type DeckTableColumn = {
  header: string;
  /** Body cell tone. Defaults to `default`. */
  tone?: Tone;
  /** Header tone. Defaults to `tone`. */
  headerTone?: Tone;
};

function toneClass(tone: Tone = "default") {
  return tone === "muted" ? "text-on-surface-muted" : "text-on-surface";
}

/** Comparison table for the deck — header + ruled rows, last column typically emphasized. */
export default function DeckTable({
  caption,
  columns,
  rows,
  dense = false,
}: {
  caption?: string;
  columns: readonly DeckTableColumn[];
  rows: readonly (readonly string[])[];
  dense?: boolean;
}) {
  const cellType = dense ? "text-body-sm" : "text-body";
  const cellPad = dense ? "py-3" : "py-4";

  return (
    <table className="w-full table-fixed border-collapse">
      {caption ? (
        <caption className="text-label text-on-surface text-left mb-4 caption-top">
          {caption}
        </caption>
      ) : null}
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={col.header || `h-${i}`}
              scope="col"
              className={`text-label font-medium text-left align-bottom pb-4 pr-8 last:pr-0 border-b border-surface-alt ${toneClass(col.headerTone ?? col.tone)}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join("|")}>
            {row.map((cell, j) => (
              <td
                key={`${columns[j]?.header ?? j}-${cell}`}
                className={`${cellType} ${cellPad} pr-8 last:pr-0 border-b border-surface-alt text-left align-top ${toneClass(columns[j]?.tone)}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
