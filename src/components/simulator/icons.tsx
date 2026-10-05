import type { ReactNode } from "react";
import type { Heating, Housing, SimulatorWork } from "@/lib/simulator/options";

const s = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" className="size-6">
    {children}
  </svg>
);

export const heatingIcons: Record<Heating, ReactNode> = {
  electricite: (
    <Svg>
      <path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z" {...s} />
    </Svg>
  ),
  gaz: (
    <Svg>
      <path d="M12 3c3 4 6 6.5 6 10.5a6 6 0 0 1-12 0C6 10 9 9 9 5.5c1.5 1 2.5 2.5 3 4 .5-2 0-4.5 0-6.5Z" {...s} />
    </Svg>
  ),
  fioul: (
    <Svg>
      <path d="M12 3s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11Z" {...s} />
      <path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" {...s} />
    </Svg>
  ),
  autre: (
    <Svg>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </Svg>
  ),
};

export const housingIcons: Record<Housing, ReactNode> = {
  maison: (
    <Svg>
      <path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5" {...s} />
    </Svg>
  ),
  appartement: (
    <Svg>
      <path d="M5 21V4h10v17M15 9h4v12M3 21h18M8 7.5h1M11 7.5h1M8 11h1M11 11h1M8 14.5h1M11 14.5h1" {...s} />
    </Svg>
  ),
};

export const workIcons: Record<SimulatorWork, ReactNode> = {
  pac_air_eau: (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2" {...s} />
      <circle cx="10" cy="12" r="4" {...s} />
      <path d="M10 8v8M6 12h8M17 9h1.5M17 12h1.5M17 15h1.5" {...s} />
    </Svg>
  ),
  pac_ballon: (
    <Svg>
      <rect x="2.5" y="7" width="11" height="10" rx="1.5" {...s} />
      <circle cx="8" cy="12" r="2.8" {...s} />
      <rect x="16" y="3.5" width="5.5" height="17" rx="2.75" {...s} />
    </Svg>
  ),
  ballon_thermo: (
    <Svg>
      <rect x="7" y="2.5" width="10" height="19" rx="5" {...s} />
      <path d="M10 9.5c1-1 3-1 4 0M10 13c1-1 3-1 4 0" {...s} />
    </Svg>
  ),
  isolation_combles: (
    <Svg>
      <path d="M2.5 13 12 5l9.5 8" {...s} />
      <path d="M6 12.5c1.2-1 2.3-1 3.5 0s2.3 1 3.5 0 2.3-1 3.5 0" {...s} />
      <path d="M5 13v7h14v-7" {...s} />
    </Svg>
  ),
  isolation_exterieure: (
    <Svg>
      <path d="M6 3v18M10 3v18" {...s} />
      <path d="M14 5h6M14 9h6M14 13h6M14 17h6" {...s} />
    </Svg>
  ),
  ssc: (
    <Svg>
      <circle cx="7" cy="7" r="2.5" {...s} />
      <path d="M7 1.8v1M7 11.2v1M1.8 7h1M11.2 7h1" {...s} />
      <path d="m8 21 3-8h10l-3 8H8ZM13 13l-2 8M17 13l-2 8M10 17h10" {...s} />
    </Svg>
  ),
};
