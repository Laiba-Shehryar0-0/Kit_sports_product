import { useMemo } from 'react';
import { getKitPath, BADGE_PRESETS } from './kitShapes';

/**
 * Pure SVG 2D kit preview — no canvas/Fabric.js dependency.
 * Renders a colored, patterned kit with logo, name & number overlays.
 */
export default function KitPreview({
  kitType      = 'jersey',
  bodyColor    = '#CC0000',
  sleeveColor  = '#000000',
  numberColor  = '#FFFFFF',
  collarColor  = '#000000',
  opacity      = { body: 100, sleeves: 100, number: 100, collar: 100 },
  template     = 'solid',
  playerName   = '',
  playerNumber = '',
  font         = 'Bebas Neue',
  nameSize     = 14,
  numberSize   = 46,
  textPosition = { x: 0.5, y: 0.5 },
  logoDataUrl  = null,
  logoPreset   = null,
  logoScale    = 80,
  logoOpacity  = 100,
  logoPosition = { x: 0.28, y: 0.22 },
  side         = 'front',
  layers       = { body: true, sleeves: true, number: true, name: true, logo: true },
}) {
  const kit = useMemo(() => getKitPath(kitType), [kitType]);
  const gradId  = `grad-${side}-${kitType}`;
  const shineId = `shine-${side}-${kitType}`;
  const clipId  = `clip-${side}-${kitType}`;

  const showName   = side === 'back'  && layers.name   && playerName;
  const showNumber = layers.number && playerNumber;
  const showLogo   = side === 'front' && layers.logo && (logoDataUrl || logoPreset);

  const namePos   = textPosition;
  const numberPos = textPosition;
  const logoPos   = logoPosition;

  const nameXY   = { x: namePos.x * kit.w,   y: side === 'back' ? namePos.y * kit.h - numberSize * 0.55 : namePos.y * kit.h };
  const numberXY = { x: numberPos.x * kit.w, y: numberPos.y * kit.h + (side === 'front' ? 0 : numberSize * 0.3) };
  const logoXY   = { x: logoPos.x * kit.w,   y: logoPos.y * kit.h };
  const logoSize = 18 + (logoScale / 100) * 42;

  return (
    <svg viewBox={kit.viewBox} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={gradId} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%"   stopColor={bodyColor} stopOpacity="1" />
          <stop offset="100%" stopColor={lightenDarken(bodyColor, -30)} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={shineId} x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id={`drop-${kitType}`}>
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor={bodyColor} floodOpacity="0.3" />
        </filter>
        <clipPath id={clipId}>
          <path d={kit.body || kit.dome} />
        </clipPath>
        <clipPath id={`logo-clip-${side}-${kitType}`}>
          <circle cx={logoXY.x} cy={logoXY.y} r={logoSize / 2} />
        </clipPath>
      </defs>

      <KitBody
        kit={kit} kitType={kitType} template={template}
        bodyColor={bodyColor} sleeveColor={sleeveColor} collarColor={collarColor}
        opacity={opacity} layers={layers}
        gradId={gradId} shineId={shineId} clipId={clipId} dropId={`drop-${kitType}`}
      />

      {showLogo && (
        <g opacity={logoOpacity / 100}>
          {logoDataUrl ? (
            <image
              href={logoDataUrl}
              x={logoXY.x - logoSize / 2}
              y={logoXY.y - logoSize / 2}
              width={logoSize}
              height={logoSize}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#logo-clip-${side}-${kitType})`}
            />
          ) : (
            <image
              href={BADGE_PRESETS.find(b => b.id === logoPreset)?.image}
              x={logoXY.x - logoSize / 2}
              y={logoXY.y - logoSize / 2}
              width={logoSize}
              height={logoSize}
              preserveAspectRatio="xMidYMid meet"
            />
          )}
        </g>
      )}

      {showName && (
        <text
          x={nameXY.x} y={nameXY.y}
          textAnchor="middle"
          fontFamily={`'${font}', sans-serif`}
          fontSize={numberSize * (nameSize / 46)}
          fill={numberColor}
          opacity={(opacity.number ?? 100) / 100}
          letterSpacing="3"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        >
          {playerName.toUpperCase()}
        </text>
      )}

      {showNumber && (
        <text
          x={numberXY.x} y={numberXY.y}
          textAnchor="middle"
          fontFamily={`'${font}', sans-serif`}
          fontSize={side === 'front' ? numberSize * 0.6 : numberSize}
          fill={numberColor}
          opacity={((opacity.number ?? 100) / 100) * (side === 'front' ? 0.9 : 1)}
          letterSpacing="2"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
        >
          {playerNumber}
        </text>
      )}
    </svg>
  );
}

function TemplateOverlay({ template, accent, clipId, w, h, active, opacity = 1 }) {
  if (!active || template === 'solid') return null;

  if (template === 'striped') {
    const patId = `striped-${clipId}`;
    const cycle = w * 0.065;
    const stripeW = cycle * 0.42;
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <defs>
          <pattern id={patId} width={cycle} height={h} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={stripeW} height={h} fill={accent} opacity="0.8" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={`url(#${patId})`} />
      </g>
    );
  }

  if (template === 'diagonal') {
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <path d={`M 0,${h} L ${w},0 L ${w},${h} Z`} fill={accent} opacity="0.5" />
      </g>
    );
  }

  if (template === 'two-tone') {
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <rect x="0" y="0" width={w * 0.22} height={h} fill={accent} opacity="0.85" />
        <rect x={w * 0.78} y="0" width={w * 0.22} height={h} fill={accent} opacity="0.85" />
      </g>
    );
  }

  if (template === 'hoops') {
    const patId = `hoops-${clipId}`;
    const cycle = h * 0.065;
    const stripeH = cycle * 0.42;
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <defs>
          <pattern id={patId} width={w} height={cycle} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={w} height={stripeH} fill={accent} opacity="0.8" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={`url(#${patId})`} />
      </g>
    );
  }

  if (template === 'halves') {
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <rect x={w * 0.5} y="0" width={w * 0.5} height={h} fill={accent} opacity="0.85" />
      </g>
    );
  }

  if (template === 'chevron') {
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <path
          d={`M ${w * 0.5},${h * 0.22} L ${w * 0.82},${h * 0.75} L ${w * 0.64},${h * 0.75} L ${w * 0.5},${h * 0.48} L ${w * 0.36},${h * 0.75} L ${w * 0.18},${h * 0.75} Z`}
          fill={accent} opacity="0.65"
        />
      </g>
    );
  }

  if (template === 'sash') {
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <path
          d={`M ${w * -0.05},${h * 0.18} L ${w * 0.18},${h * -0.02} L ${w * 1.05},${h * 0.85} L ${w * 0.82},${h * 1.02} Z`}
          fill={accent} opacity="0.75"
        />
      </g>
    );
  }

  if (template === 'fade') {
    const gradId = `fade-${clipId}`;
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={`url(#${gradId})`} />
      </g>
    );
  }

  if (template === 'fade-left') {
    const gradId = `fade-left-${clipId}`;
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={`url(#${gradId})`} />
      </g>
    );
  }

  if (template === 'dots') {
    const patId = `dots-${clipId}`;
    const size = w * 0.14;
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <defs>
          <pattern id={patId} width={size} height={size} patternUnits="userSpaceOnUse">
            <circle cx={size / 2} cy={size / 2} r={size * 0.15} fill={accent} opacity="0.85" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={`url(#${patId})`} />
      </g>
    );
  }

  if (template === 'sleeves') {
    return (
      <g clipPath={`url(#${clipId})`} opacity={opacity}>
        <path
          d={`M 0,${h * 0.08} L ${w * 0.30},${h * 0.01} L ${w * 0.35},${h * 0.22} L ${w * 0.17},${h * 0.35} L 0,${h * 0.30} Z`}
          fill={accent} opacity="0.9"
        />
        <path
          d={`M ${w},${h * 0.08} L ${w * 0.70},${h * 0.01} L ${w * 0.65},${h * 0.22} L ${w * 0.83},${h * 0.35} L ${w},${h * 0.30} Z`}
          fill={accent} opacity="0.9"
        />
      </g>
    );
  }

  return null;
}

function KitBody({ kit, kitType, template, bodyColor, sleeveColor, collarColor, opacity, layers, gradId, shineId, clipId, dropId }) {
  const bodyOp = layers.body ? (opacity.body ?? 100) / 100 : 0.12;
  const sleevesActive = layers.sleeves;

  if (kitType === 'jersey' || kitType === 'polo' || kitType === 'jumper') {
    return (
      <>
        <path d={kit.body} fill={`url(#${gradId})`} filter={`url(#${dropId})`} opacity={bodyOp} />
        <TemplateOverlay template={template} accent={sleeveColor} clipId={clipId} w={kit.w} h={kit.h} active={sleevesActive} opacity={(opacity.sleeves ?? 100) / 100} />
        <path d={kit.body} fill={`url(#${shineId})`} opacity={bodyOp} />

        {kitType === 'jumper' && kit.hem && (
          <path d={kit.hem} fill={sleeveColor} opacity={sleevesActive ? 0.9 : 0.3} />
        )}

        {kit.collar && (
          <path d={kit.collar} fill={collarColor} opacity={(opacity.collar ?? 100) / 100} />
        )}

        {kitType === 'polo' && kit.placket && (
          <>
            <path d={kit.placket} stroke={collarColor} strokeWidth="2" opacity={(opacity.collar ?? 100) / 100} />
            {kit.buttons?.map(([bx, by], i) => (
              <circle key={i} cx={bx} cy={by} r="2.4" fill="#fff" opacity="0.9" />
            ))}
          </>
        )}
      </>
    );
  }

  if (kitType === 'shorts') {
    return (
      <>
        <path d={kit.body} fill={`url(#${gradId})`} filter={`url(#${dropId})`} opacity={bodyOp} />
        <TemplateOverlay template={template} accent={sleeveColor} clipId={clipId} w={kit.w} h={kit.h} active={sleevesActive} opacity={(opacity.sleeves ?? 100) / 100} />
        {kit.waistband && <path d={kit.waistband} fill={collarColor} opacity={(opacity.collar ?? 100) / 100} />}
        <path d={kit.body} fill={`url(#${shineId})`} opacity={bodyOp} />
      </>
    );
  }

  if (kitType === 'socks') {
    return (
      <>
        <path d={kit.body} fill={`url(#${gradId})`} filter={`url(#${dropId})`} opacity={bodyOp} />
        <TemplateOverlay template={template} accent={sleeveColor} clipId={clipId} w={kit.w} h={kit.h} active={sleevesActive} opacity={(opacity.sleeves ?? 100) / 100} />
        {kit.cuff && <path d={kit.cuff} fill={collarColor} opacity={(opacity.collar ?? 100) / 100} />}
        <path d={kit.body} fill={`url(#${shineId})`} opacity={bodyOp} />
      </>
    );
  }

  if (kitType === 'cap') {
    return (
      <>
        <path d={kit.dome} fill={`url(#${gradId})`} filter={`url(#${dropId})`} opacity={bodyOp} />
        <TemplateOverlay template={template} accent={sleeveColor} clipId={clipId} w={kit.w} h={kit.h} active={sleevesActive} opacity={(opacity.sleeves ?? 100) / 100} />
        {kit.brim && <path d={kit.brim} fill={lightenDarken(bodyColor, -40)} opacity={bodyOp} />}
        {kit.band && <path d={kit.band} fill={collarColor} opacity={(opacity.collar ?? 100) / 100} />}
        {kit.button && <path d={kit.button} fill={collarColor} opacity={(opacity.collar ?? 100) / 100} />}
        <path d={kit.dome} fill={`url(#${shineId})`} opacity={bodyOp} />
      </>
    );
  }

  return null;
}

function lightenDarken(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
