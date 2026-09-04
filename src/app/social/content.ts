import { asset } from "@/lib/asset";

export const socialMeta = {
  title: "Digital Asset Compliance Landscape",
  subtitle:
    "Foundation social cuts — square, landscape, and LinkedIn banner. Sparse categories share a canvas on square and landscape.",
  ticket: "NEWT-2393",
  href: "/social",
  downloads: {
    png: "/downloads/digital-asset-compliance-landscape.zip",
  },
} as const;

export function canvasSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const logo = (file: string) => asset(`/assets/social/logos/${file}.webp`);

const LOGOS: Record<string, string> = {
  Regnology: logo("regnology"),
  "Eventus Validus": logo("eventus-validus"),
  "Shyft / Veriscope": logo("shyft-veriscope"),
  "BlockSec (Phalcon)": logo("blocksec"),
  Cyvers: logo("cyvers"),
  Blockpass: logo("blockpass"),
  AMLBot: logo("amlbot"),
  "AnChain.AI": logo("anchain"),
  Scorechain: logo("scorechain"),
  "TRM Labs": logo("trmlabs"),
  "Crystal Intelligence": logo("crystal-intelligence"),
  Elliptic: logo("elliptic"),
  Hypernative: logo("hypernative"),
  "Holonym / Human.tech": logo("holonym"),
  "Aztec Labs (ZKPassport)": logo("aztec"),
  "Credora (RedStone)": logo("credora"),
  LedgerLens: logo("ledgerlens"),
  "Ironblocks (Firewall)": logo("ironblocks"),
  "Forte (Rules Engine)": logo("forte"),
  Bitbond: logo("bitbond"),
  Brickken: logo("brickken"),
  Securitize: logo("securitize"),
  Ledgible: logo("ledgible"),
  "Solidus Labs": logo("solidus"),
  "Global Ledger": logo("global-ledger"),
  "Blockaid (Risk Exposure)": logo("blockaid"),
  "Blockaid (Cosigner)": logo("blockaid"),
  Bitrace: logo("bitrace"),
  Chainalysis: logo("chainalysis"),
  "Merkle Science": logo("merkle-science"),
  "GoPlus Security": logo("goplus"),
  Webacy: logo("webacy"),
  Persona: logo("persona"),
  Sumsub: logo("sumsub"),
  "Privado ID": logo("privado"),
  zkMe: logo("zkme"),
  zkPass: logo("zkpass"),
  "Chainlink (Data Feeds)": logo("chainlink"),
  "Chainlink ACE": logo("chainlink"),
  "Chainlink Proof of Reserve": logo("chainlink"),
  RedStone: logo("redstone"),
  "vaults.fyi": logo("vaultsfyi"),
  Accountable: logo("accountable"),
  TaxBit: logo("taxbit"),
  "Nasdaq Market Surveillance": logo("nasdaq"),
  Hacken: logo("hacken"),
  "Circle Compliance Engine": logo("circle"),
  Newton: logo("newton-protocol"),
  Phylax: logo("phylax"),
  Predicate: logo("predicate"),
  "Forta (Firewall)": logo("forta"),
  "21 Analytics": logo("21analytics"),
  Notabene: logo("notabene"),
  VerifyVASP: logo("verifyvasp"),
  "The Network Firm": logo("network-firm"),
  "Tokeny (ERC-3643 / T-REX)": logo("tokeny"),
  Vertalo: logo("vertalo"),
};

export const MARK = asset("/assets/social/newton-mark.svg");

/** One entry per unique file — used by `/social/lab`. */
export const logoSpecimens = [
  ...new Map(
    Object.entries(LOGOS).map(([name, src]) => [src, { name, src }]),
  ).values(),
];

type StageKey = "input" | "pre" | "post" | "asset";

const STAGES: Record<
  StageKey,
  { n: string; stage: string; tag: string }
> = {
  input: { n: "01", stage: "Input Layer", tag: "Informs" },
  pre: { n: "02", stage: "Pre-Settlement", tag: "Binds" },
  post: { n: "03", stage: "Monitoring", tag: "Observes" },
  asset: { n: "04", stage: "Asset Layer", tag: "Binds" },
};

const RAW: [string, StageKey, string[]][] = [
  [
    "AML & Blockchain Analytics",
    "input",
    [
      "AMLBot",
      "AnChain.AI",
      "Bitrace",
      "Chainalysis",
      "Crystal Intelligence",
      "Elliptic",
      "Global Ledger",
      "Merkle Science",
      "Scorechain",
      "TRM Labs",
    ],
  ],
  [
    "ZK Credentials",
    "input",
    [
      "Aztec Labs (ZKPassport)",
      "Holonym / Human.tech",
      "Privado ID",
      "zkMe",
      "zkPass",
    ],
  ],
  [
    "Onchain Threat Intelligence",
    "input",
    ["Blockaid (Risk Exposure)", "Cyvers", "GoPlus Security", "Webacy"],
  ],
  ["KYC & KYB Verification", "input", ["Blockpass", "Persona", "Sumsub"]],
  [
    "Oracle & Risk Data Feeds",
    "input",
    [
      "Chainlink (Data Feeds)",
      "Credora (RedStone)",
      "RedStone",
      "vaults.fyi",
    ],
  ],
  [
    "Reserve & Solvency Verification",
    "input",
    ["Accountable", "Chainlink Proof of Reserve", "The Network Firm"],
  ],
  [
    "Policy Engines",
    "pre",
    [
      "Chainlink ACE",
      "Circle Compliance Engine",
      "Forte (Rules Engine)",
      "Newton",
      "Phylax",
      "Predicate",
    ],
  ],
  [
    "Transaction Firewalls",
    "pre",
    ["BlockSec (Phalcon)", "Forta (Firewall)", "Ironblocks (Firewall)"],
  ],
  [
    "Custody & Response Controls",
    "pre",
    ["Blockaid (Cosigner)", "Hypernative"],
  ],
  [
    "Travel Rule & VASP",
    "pre",
    ["21 Analytics", "Notabene", "Shyft / Veriscope", "VerifyVASP"],
  ],
  ["Regulatory Reporting", "post", ["Ledgible", "Regnology", "TaxBit"]],
  [
    "Surveillance",
    "post",
    ["Eventus Validus", "Nasdaq Market Surveillance", "Solidus Labs"],
  ],
  ["Attestation & Audit", "post", ["Hacken", "LedgerLens"]],
  [
    "Token-Level Rules",
    "asset",
    [
      "Bitbond",
      "Brickken",
      "Securitize",
      "Tokeny (ERC-3643 / T-REX)",
      "Vertalo",
    ],
  ],
];

const MERGE = [
  {
    title: "Threat Intelligence & Identity",
    labels: ["Onchain Threat Intelligence", "KYC & KYB Verification"],
  },
  {
    title: "Firewalls & Custody Controls",
    labels: ["Transaction Firewalls", "Custody & Response Controls"],
  },
  {
    title: "Reporting, Surveillance & Audit",
    labels: ["Regulatory Reporting", "Surveillance", "Attestation & Audit"],
  },
] as const;

export type Provider = { name: string; icon: string };
export type Group = { label: string; items: Provider[] };
export type Canvas = {
  n: string;
  stage: string;
  tag: string;
  label: string;
  countLabel: string;
  merged: boolean;
  items: Provider[];
  groups: Group[];
  rows: Provider[][];
  cols: number;
};

function colsFor(n: number) {
  if (n <= 3) return n;
  if (n <= 6) return n % 2 === 0 ? n / 2 : 3;
  return 5;
}

function rowsFor(items: Provider[], cols: number) {
  const rows: Provider[][] = [];
  for (let i = 0; i < items.length; i += cols) {
    rows.push(items.slice(i, i + cols));
  }
  return rows;
}

function providers(names: string[]): Provider[] {
  return names.map((name) => ({ name, icon: LOGOS[name] ?? "" }));
}

function buildCategories(): Canvas[] {
  return RAW.map(([label, key, names]) => {
    const items = providers(names);
    const cols = colsFor(items.length);
    return {
      ...STAGES[key],
      label,
      countLabel: `${items.length} ${items.length === 1 ? "Provider" : "Providers"}`,
      merged: false,
      items,
      groups: [],
      cols,
      rows: rowsFor(items, cols),
    };
  });
}

export function buildCanvases(): Canvas[] {
  const cats = buildCategories();

  const byLabel = Object.fromEntries(cats.map((c) => [c.label, c]));
  const mergeByLabel = new Map<string, (typeof MERGE)[number]>();
  MERGE.forEach((d) => d.labels.forEach((l) => mergeByLabel.set(l, d)));

  const canvases: Canvas[] = [];
  const emitted = new Set<string>();

  for (const c of cats) {
    const def = mergeByLabel.get(c.label);
    if (!def) {
      canvases.push({
        n: c.n,
        stage: c.stage,
        tag: c.tag,
        label: c.label,
        countLabel: c.countLabel,
        merged: false,
        items: c.items,
        groups: [],
        rows: c.rows,
        cols: c.cols,
      });
      continue;
    }
    if (emitted.has(def.title)) continue;
    emitted.add(def.title);
    const groups = def.labels.map((label) => ({
      label,
      items: byLabel[label].items,
    }));
    const items = groups.flatMap((g) => g.items);
    canvases.push({
      n: c.n,
      stage: c.stage,
      tag: c.tag,
      label: def.title,
      countLabel: `${items.length} Providers`,
      merged: true,
      items,
      groups,
      rows: [],
      cols: groups.length >= 3 ? 5 : 4,
    });
  }

  return canvases;
}

export const categories = buildCategories();
export const canvases = buildCanvases();
