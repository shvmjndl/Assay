/**
 * Field palette — grassy, grainy, earthy.
 */
export const themeStory = {
  name: "Meadow ledger",
  oneLiner:
    "Meadow paper, moss for living marks, umber earth, ink for words — grain like dry grass.",
  pigments: [
    {
      id: "meadow",
      role: "Ground",
      hex: "#C5C2A4",
      note: "Grass-warm paper — the field under everything",
    },
    {
      id: "moss",
      role: "Living",
      hex: "#5A6B45",
      note: "Links, marks, the green of care",
    },
    {
      id: "ink",
      role: "Words",
      hex: "#2B2D33",
      note: "Primary ink — what you read",
    },
    {
      id: "charcoal",
      role: "Shade",
      hex: "#3A3A3A",
      note: "Quieter text — secondary",
    },
    {
      id: "raw-umber",
      role: "Earth",
      hex: "#5C4A34",
      note: "Years underway, hard decisions",
    },
    {
      id: "soil-dusk",
      role: "Depth",
      hex: "#4A5340",
      note: "Hover — moss into soil",
    },
  ],
} as const;
