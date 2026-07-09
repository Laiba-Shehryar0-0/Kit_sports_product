/**
 * Minimal line-icon set for the kit customizer chrome.
 * All icons: 24x24 viewBox, stroke = currentColor.
 */
const base = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

export const IconSelect = (p) => (
  <svg {...base} {...p}><path d="M5 3 L5 19 L9.5 15.2 L12.3 20.5 L15 19 L12.2 13.8 L18 13.5 Z" /></svg>
);

export const IconDraw = (p) => (
  <svg {...base} {...p}>
    <path d="M13.5 4.5 L19.5 10.5 L9 21 L4 21 L4 16 Z" />
    <path d="M12 6 L18 12" />
  </svg>
);

export const IconText = (p) => (
  <svg {...base} {...p}>
    <path d="M4 5 L20 5" /><path d="M12 5 L12 19" /><path d="M8 19 L16 19" />
  </svg>
);

export const IconUndo = (p) => (
  <svg {...base} {...p}>
    <path d="M8 7 L4 11 L8 15" /><path d="M4 11 L14 11 Q20 11 20 16.5 Q20 20 15.5 20 L11 20" />
  </svg>
);

export const IconRedo = (p) => (
  <svg {...base} {...p}>
    <path d="M16 7 L20 11 L16 15" /><path d="M20 11 L10 11 Q4 11 4 16.5 Q4 20 8.5 20 L13 20" />
  </svg>
);

export const IconSave = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4 H16 L19 7 V20 H5 Z" />
    <path d="M8 4 V9 H15 V4" /><path d="M8 14 H16 V20 H8 Z" />
  </svg>
);

export const IconExport = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 V15" /><path d="M7 10 L12 15 L17 10" />
    <path d="M4 18 V20 H20 V18" />
  </svg>
);

export const IconLayers = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 L21 8 L12 13 L3 8 Z" />
    <path d="M3 12 L12 17 L21 12" /><path d="M3 16 L12 21 L21 16" />
  </svg>
);

export const IconEye = (p) => (
  <svg {...base} {...p}>
    <path d="M2 12 Q7 4 12 4 Q17 4 22 12 Q17 20 12 20 Q7 20 2 12 Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconEyeOff = (p) => (
  <svg {...base} {...p}>
    <path d="M3 3 L21 21" />
    <path d="M9.9 5.1 Q10.9 4.8 12 4.8 Q17 4.8 22 12 Q20.4 14.6 18.3 16.4" />
    <path d="M6.1 7.1 Q3.8 8.9 2 12 Q7 19.2 12 19.2 Q13.6 19.2 15.1 18.6" />
    <path d="M9.6 9.6 A3 3 0 0 0 14.3 14.3" />
  </svg>
);

export const IconGrip = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="6" r="1.2" fill="currentColor" /><circle cx="15" cy="6" r="1.2" fill="currentColor" />
    <circle cx="9" cy="12" r="1.2" fill="currentColor" /><circle cx="15" cy="12" r="1.2" fill="currentColor" />
    <circle cx="9" cy="18" r="1.2" fill="currentColor" /><circle cx="15" cy="18" r="1.2" fill="currentColor" />
  </svg>
);

export const IconUpload = (p) => (
  <svg {...base} {...p}>
    <path d="M12 16 V4" /><path d="M7 9 L12 4 L17 9" />
    <path d="M4 16 V19 Q4 20 5 20 H19 Q20 20 20 19 V16" />
  </svg>
);

export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M12 5 V19" /><path d="M5 12 H19" /></svg>
);

export const IconMinus = (p) => (
  <svg {...base} {...p}><path d="M5 12 H19" /></svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M4 12.5 L9.5 18 L20 6" /></svg>
);

export const IconTrash = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7 H20" /><path d="M8 7 V4 H16 V7" />
    <path d="M6 7 L7 20 H17 L18 7" />
  </svg>
);

export const IconChevronLeft = (p) => (
  <svg {...base} {...p}><path d="M15 4 L7 12 L15 20" /></svg>
);

export const IconLock = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11 V8 Q8 3 12 3 Q16 3 16 8 V11" />
    <circle cx="12" cy="16" r="1.4" fill="currentColor" />
  </svg>
);

export const IconTruck = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="7" width="13" height="10" rx="1" />
    <path d="M15 10 H19 L22 13.5 V17 H15 Z" />
    <circle cx="7" cy="19" r="1.8" /><circle cx="18" cy="19" r="1.8" />
  </svg>
);

export const IconCard = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10 H21" /><path d="M6 15 H10" />
  </svg>
);

export const IconBank = (p) => (
  <svg {...base} {...p}>
    <path d="M3 10 L12 4 L21 10" /><path d="M4 10 H20 V20 H4 Z" />
    <path d="M4 20 H20" /><path d="M8 13 V17" /><path d="M12 13 V17" /><path d="M16 13 V17" />
  </svg>
);

export const IconCash = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M5 9 V9" /><path d="M19 15 V15" />
  </svg>
);

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 L19 6 V11 Q19 17 12 21 Q5 17 5 11 V6 Z" />
    <path d="M9 12 L11.2 14.2 L15.5 9.5" />
  </svg>
);

export const IconKit = (p) => (
  <svg {...base} {...p}>
    <path d="M9 3 L4 6 L6 10 L8 9 V21 H16 V9 L18 10 L20 6 L15 3 Q13.5 5 12 5 Q10.5 5 9 3 Z" />
  </svg>
);

export const IconPalette = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 Q4 3 4 11 Q4 19 11 19 H13 Q14.5 19 14.5 17.5 Q14.5 16.5 13.5 16 Q12.5 15.5 12.5 14.5 Q12.5 13 14 13 H17 Q20 13 20 10 Q20 3 12 3 Z" />
    <circle cx="8" cy="9.5" r="1" fill="currentColor" />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
    <circle cx="16" cy="9.5" r="1" fill="currentColor" />
  </svg>
);

export const IconTag = (p) => (
  <svg {...base} {...p}>
    <path d="M4 4 H13 Q14 4 14.7 4.7 L20 10 Q21 11 20 12 L12 20 Q11 21 10 20 L4.7 14.7 Q4 14 4 13 Z" />
    <circle cx="9" cy="9" r="1.3" fill="currentColor" />
  </svg>
);

export const IconPan = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 V13" /><path d="M9 6 L12 3 L15 6" />
    <path d="M12 21 Q6 21 6 15 L6 13 Q6 11 8 11 Q10 11 10 13 V14" />
    <path d="M10 14 V9 Q10 7 12 7 Q14 7 14 9 V14" />
    <path d="M14 14 V10 Q14 8 16 8 Q18 8 18 10 V15" />
    <path d="M18 15 V13 Q18 11.5 19.5 11.5 Q21 11.5 21 13 V16 Q21 21 15 21 Z" />
  </svg>
);
