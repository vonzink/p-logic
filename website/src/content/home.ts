/**
 * Home page copy. Kept apart from the components so wording can change
 * without touching layout code.
 *
 * Anything in [brackets] is a placeholder that Prosperous Logic needs to supply.
 * Only publish facts that are true and provable. Never promise a win.
 */

export const hero = {
  eyebrow: "Government proposals & pricing",
  title: "Bid the right work. Price it to win.",
  lead: "We help contractors decide which government opportunities to chase, write proposals that answer the evaluation criteria, and build prices that are competitive and still make money.",
  secondaryCta: { label: "See our services", href: "/#services" },
};

export const atAGlance: { label: string; value: string }[] = [
  { label: "Founded by", value: "[Founder name]" },
  { label: "Experience", value: "[XX] years" },
  { label: "Focus", value: "Federal bids & pricing" },
  { label: "Where", value: "Remote, nationwide" },
  { label: "Reply time", value: "[1 business day]" },
];

export type Service = {
  title: string;
  summary: string;
  includes: string[];
};

export const services: Service[] = [
  {
    title: "Opportunity & Bid/No-Bid",
    summary:
      "Find solicitations that fit your capabilities and make a clear go or no-go call before you spend money on a proposal.",
    includes: ["Opportunity research", "Fit & win-probability review", "Bid / no-bid decisions", "Pipeline tracking"],
  },
  {
    title: "Capture Strategy",
    summary:
      "Position for the win before the RFP drops: know the customer, the competition, and the teaming you need.",
    includes: ["Customer & competitor research", "Win themes", "Teaming & subcontracting", "Capture plans"],
  },
  {
    title: "Proposal Development",
    summary: "Compliant, readable proposals built around how the government will score them.",
    includes: ["Compliance matrices", "Technical & management volumes", "Past performance write-ups", "Color-team reviews"],
  },
  {
    title: "Pricing & Cost Volumes",
    summary:
      "Build prices that hold up to evaluation and protect your margin, with the backup to support every number.",
    includes: ["Labor & rate build-ups", "Price-to-win analysis", "Cost volume narratives", "Basis of estimate"],
  },
];

export const approach = {
  eyebrow: "How we work",
  title: "From solicitation to submission.",
  flag: "Qualify / Write / Price / Win",
  steps: [
    { title: "Qualify", body: "Review the opportunity and decide together whether it's worth bidding." },
    { title: "Plan", body: "Set win themes, assignments, and a schedule back from the due date." },
    { title: "Write & price", body: "Draft the volumes and build the price in parallel so they tell one story." },
    { title: "Review & submit", body: "Check compliance, run final reviews, and submit on time." },
  ],
};

export const about = {
  eyebrow: "About Prosperous Logic",
  title: "Disciplined bids, sound numbers.",
  paragraphs: [
    "[Short founder story: who started Prosperous Logic, the background they bring, and why they started it. Two to three sentences.]",
    "We keep the process simple: bid what you can win, say it clearly, and price it so the contract is worth having.",
  ],
  principles: [
    { title: "Discipline", body: "Not every opportunity is worth chasing. Saying no early saves time and money." },
    { title: "Clarity", body: "Evaluators score what they can find. We write so they find it fast." },
    { title: "Value", body: "A winning price has to be one you can live with for the whole contract." },
  ],
};

export const contact = {
  eyebrow: "Next step",
  title: "Have an opportunity in mind?",
  body: "Send us the solicitation number or a short note about what you're pursuing. We'll reply to set up a short introductory call.",
};
