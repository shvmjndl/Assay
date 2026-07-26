/**
 * Assay — physical newsprint
 */
export const themeStory = {
  name: "Digital edition",
  oneLiner:
    "Warm fiber stock, absorbed ink, navy mark — a paper you can almost touch.",
  pigments: [
    {
      id: "board",
      role: "Desk",
      hex: "#D4CBC0",
      note: "Reading surface under the sheet",
    },
    {
      id: "newsprint",
      role: "Paper",
      hex: "#EBE5D6",
      note: "Warm pulp stock — the page itself",
    },
    {
      id: "ink",
      role: "Ink",
      hex: "#1C1914",
      note: "Absorbed black — headlines and body",
    },
    {
      id: "navy",
      role: "Accent",
      hex: "#052962",
      note: "Kickers, links — modern paper blue",
    },
    {
      id: "signal-red",
      role: "Signal",
      hex: "#B01010",
      note: "Rare emphasis — edition flash",
    },
    {
      id: "soft",
      role: "Shade",
      hex: "#E0D8C8",
      note: "Cuttings and hover wash",
    },
  ],
} as const;
