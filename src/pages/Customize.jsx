import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import KitPreview from '../customize/KitPreview';
import useHistoryState from '../hooks/useHistoryState';
import {
  KIT_TYPES, SPORTS, SIZES, SIZE_UNITS, COLOR_PALETTE, APPLY_TARGETS,
  FONTS, DESIGN_TEMPLATES, BADGE_PRESETS, POSITIONS,
  DESIGN_STORAGE_KEY, SAVED_DESIGNS_KEY, loadStoredDesign,
} from '../customize/kitShapes';
import {
  IconSelect, IconDraw, IconText, IconUndo, IconRedo, IconSave, IconExport,
  IconLayers, IconEye, IconEyeOff, IconGrip, IconUpload, IconPlus, IconMinus, IconPan,
  IconKit, IconPalette, IconTag, IconChevronLeft,
} from '../customize/icons';
import ColorPicker from '../customize/ColorPicker';
import cricketShirtImg from '../assets/cricket-shirt.png';
import cricketTrousersImg from '../assets/cricket-trousers.png';
import cricketSweaterImg from '../assets/cricket-sweater.png';
import cricketCapImg from '../assets/cricket-cap.png';
import footballJerseyImg from '../assets/football-jersey.png';
import footballShortsImg from '../assets/football-shorts.png';
import goalkeeperKitImg from '../assets/goalkeeper-kit.png';
import basketballJerseyImg from '../assets/Basketball-Jersey.png';
import basketballShortsImg from '../assets/basketball-shorts.png';
import basketballShoesImg from '../assets/basketball-shoes.png';
import trainingTShirtImg from '../assets/training-T-shit.png';
import trainingShortsImg from '../assets/training-shorts.png';
import trainingVestImg from '../assets/Training-vest.png';
import tracksuitImg from '../assets/tracksuit.png';
import warmupSuitImg from '../assets/Warm-up-suit.png';
import trainingBibImg from '../assets/Training-bib.png';
import boxingKitImg from '../assets/boxing-kit.png';
import hockeyKitImg from '../assets/hockey-kit.png';
import cyclingKitImg from '../assets/cycling-kit.png';
import rugbyKitImg from '../assets/rudby-kit.png';
import './Customize.css';

/** Sport → specific product catalog, each mapped to a KIT_TYPES id so the SVG preview knows what to render */
const SPORT_KIT_GROUPS = [
  {
    id: 'cricket', label: 'Cricket',
    items: [
      { id: 'cricket-shirt',    label: 'Cricket Shirt',    image: cricketShirtImg,    kitType: 'polo' },
      { id: 'cricket-trousers', label: 'Cricket Trousers', image: cricketTrousersImg, kitType: 'shorts' },
      { id: 'cricket-sweater',  label: 'Cricket Sweater',  image: cricketSweaterImg,  kitType: 'jumper' },
      { id: 'cricket-cap',      label: 'Cricket Cap',      image: cricketCapImg,      kitType: 'cap' },
    ],
  },
  {
    id: 'football', label: 'Football',
    items: [
      { id: 'football-jersey', label: 'Football Jersey', image: footballJerseyImg, kitType: 'jersey' },
      { id: 'football-shorts', label: 'Football Shorts', image: footballShortsImg, kitType: 'shorts' },
      { id: 'goalkeeper-kit',  label: 'Goalkeeper Kit',  image: goalkeeperKitImg,  kitType: 'jersey' },
      { id: 'training-bib',    label: 'Training Bib',    image: trainingBibImg,    kitType: 'jersey' },
    ],
  },
  {
    id: 'basketball', label: 'Basketball',
    items: [
      { id: 'basketball-jersey', label: 'Basketball Jersey', image: basketballJerseyImg, kitType: 'jersey' },
      { id: 'basketball-shorts', label: 'Basketball Shorts', image: basketballShortsImg, kitType: 'shorts' },
      { id: 'basketball-shoes',  label: 'Basketball Shoes',  image: basketballShoesImg,  kitType: 'socks' },
      { id: 'warmup-suit',       label: 'Warm-up Suit',      image: warmupSuitImg,       kitType: 'jumper' },
    ],
  },
  {
    id: 'training', label: 'Training',
    items: [
      { id: 'training-tshirt', label: 'Training T-Shirt', image: trainingTShirtImg, kitType: 'jersey' },
      { id: 'training-shorts', label: 'Training Shorts',  image: trainingShortsImg, kitType: 'shorts' },
      { id: 'training-vest',   label: 'Training Vest',    image: trainingVestImg,   kitType: 'jersey' },
      { id: 'tracksuit',       label: 'Tracksuit',        image: tracksuitImg,      kitType: 'jumper' },
    ],
  },
  {
    id: 'others', label: 'Others',
    items: [
      { id: 'boxing-kit',  label: 'Boxing Kit',  image: boxingKitImg,  kitType: 'shorts' },
      { id: 'hockey-kit',  label: 'Hockey Kit',  image: hockeyKitImg,  kitType: 'jersey' },
      { id: 'cycling-kit', label: 'Cycling Kit', image: cyclingKitImg, kitType: 'jersey' },
      { id: 'rugby-kit',   label: 'Rugby Kit',   image: rugbyKitImg,   kitType: 'jersey' },
    ],
  },
];

const TABS = [
  { id: 'kit',    label: 'Kit',    icon: <IconKit /> },
  { id: 'colors', label: 'Colors', icon: <IconPalette /> },
  { id: 'text',   label: 'Text',   icon: <IconText /> },
  { id: 'draw',   label: 'Draw',   icon: <IconDraw /> },
  { id: 'assets', label: 'Assets', icon: <IconTag /> },
  { id: 'layers', label: 'Layers', icon: <IconLayers /> },
];

const TARGET_COLOR_KEY = { body: 'bodyColor', sleeves: 'sleeveColor', number: 'numberColor', collar: 'collarColor' };

const DEFAULT_LAYER_ORDER = [
  { id: 'number',  label: 'Squad Number' },
  { id: 'name',    label: 'Player Name' },
  { id: 'logo',    label: 'Club Logo' },
  { id: 'sleeves', label: 'Sleeve Color' },
  { id: 'body',    label: 'Body Base' },
];

export default function Customize() {
  const [design, setDesign, { undo, redo, canUndo, canRedo }] = useHistoryState(loadStoredDesign);
  const [activeTab, setActiveTab] = useState('kit');
  const [activeTool, setActiveTool] = useState('select');
  const [applyTarget, setApplyTarget] = useState('body');
  const [side, setSide] = useState('front');
  const [railHidden, setRailHidden] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState('');
  const [dragLayerId, setDragLayerId] = useState(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const panState = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const navigate = useNavigate();

  const selectTool = useCallback((tool, tab) => {
    setActiveTool(tool);
    if (tab) setActiveTab(tab);
  }, []);

  const handlePreviewPointerDown = useCallback((e) => {
    if (activeTool !== 'pan') return;
    panState.current = { dragging: true, startX: e.clientX, startY: e.clientY, originX: panOffset.x, originY: panOffset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [activeTool, panOffset]);

  const handlePreviewPointerMove = useCallback((e) => {
    if (!panState.current.dragging) return;
    const dx = e.clientX - panState.current.startX;
    const dy = e.clientY - panState.current.startY;
    setPanOffset({ x: panState.current.originX + dx, y: panState.current.originY + dy });
  }, []);

  const handlePreviewPointerUp = useCallback((e) => {
    panState.current.dragging = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }, []);

  const resetView = useCallback(() => {
    setPanOffset({ x: 0, y: 0 });
    setZoom(100);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    try { localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(design)); } catch { /* storage unavailable */ }
  }, [design]);

  const patch = useCallback((partial) => {
    setDesign(prev => ({ ...prev, ...partial }));
  }, [setDesign]);

  const patchOpacity = useCallback((target, value) => {
    setDesign(prev => ({ ...prev, opacity: { ...prev.opacity, [target]: value } }));
  }, [setDesign]);

  const toggleLayer = useCallback((id) => {
    setDesign(prev => ({ ...prev, layers: { ...prev.layers, [id]: !prev.layers[id] } }));
  }, [setDesign]);

  const reorderLayers = useCallback((fromId, toId) => {
    if (fromId === toId) return;
    setDesign(prev => {
      const order = [...prev.layerOrder];
      const fromIdx = order.indexOf(fromId);
      const toIdx = order.indexOf(toId);
      order.splice(fromIdx, 1);
      order.splice(toIdx, 0, fromId);
      return { ...prev, layerOrder: order };
    });
  }, [setDesign]);

  const handleSave = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVED_DESIGNS_KEY) || '[]');
      saved.push({ ...design, id: Date.now(), kitTypeLabel: design.kitProduct || KIT_TYPES.find(k => k.id === design.kitType)?.label });
      localStorage.setItem(SAVED_DESIGNS_KEY, JSON.stringify(saved));
    } catch { /* storage unavailable — ignore */ }
    setToast('Design saved');
  }, [design]);

  const handleExport = useCallback(() => {
    const svgEl = previewRef.current?.querySelector('svg');
    if (!svgEl) return;
    const data = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kit-design-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('Exported SVG');
  }, []);

  const handleLogoFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patch({ logoDataUrl: reader.result, logoPreset: null });
    reader.readAsDataURL(file);
  }, [patch]);

  const handlePlaceOrder = useCallback(() => {
    try { localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(design)); } catch { /* storage unavailable */ }
    navigate('/checkout');
  }, [design, navigate]);

  const kitLabel = design.kitProduct || KIT_TYPES.find(k => k.id === design.kitType)?.label || 'Jersey';

  return (
    <div className="customizer">
      {/* ── Top toolbar ─────────────────────────────────────── */}
      <div className="customizer__topbar">
        <div className="customizer__topbar-left">
          <ToolBtn onClick={() => setRailHidden(v => !v)} title={railHidden ? 'Show tools' : 'Hide tools'}>
            <IconChevronLeft style={{ transform: railHidden ? 'rotate(180deg)' : 'none' }} />
          </ToolBtn>
        </div>

        <div className="customizer__topbar-center">
          <div className="customizer__side-toggle">
            <button onClick={() => setSide('front')} className={`customizer__side-btn${side === 'front' ? ' customizer__side-btn--active' : ''}`}>Front</button>
            <button onClick={() => setSide('back')} className={`customizer__side-btn${side === 'back' ? ' customizer__side-btn--active' : ''}`}>Back</button>
          </div>
        </div>

        <div className="customizer__topbar-right">
          <ToolBtn onClick={undo} disabled={!canUndo} title="Undo"><IconUndo /></ToolBtn>
          <ToolBtn onClick={redo} disabled={!canRedo} title="Redo"><IconRedo /></ToolBtn>
          <ToolBtn onClick={handleSave} title="Save"><IconSave /></ToolBtn>
          <button onClick={handleExport} className="btn btn-grey customizer__export-btn">
            <IconExport /> Export
          </button>
          <button onClick={handlePlaceOrder} className="btn btn-darkred customizer__export-btn">
            Place Order
          </button>
        </div>
      </div>

      <div className={`customizer__body${railHidden ? ' customizer__body--rail-hidden' : ''}`}>
        {/* ── Left icon rail ──────────────────────────────────── */}
        {!railHidden && (
          <div className="customizer__rail">
            <ToolBtn active={activeTool === 'select'} onClick={() => selectTool('select', 'kit')} title="Select"><IconSelect /></ToolBtn>
            <ToolBtn active={activeTool === 'pan'} onClick={() => selectTool('pan')} title="Pan"><IconPan /></ToolBtn>
            <ToolBtn onClick={() => navigate('/kit-editor')} title="Draw"><IconDraw /></ToolBtn>
            <ToolBtn active={activeTool === 'text'} onClick={() => selectTool('text', 'text')} title="Text"><IconText /></ToolBtn>
            <ToolBtn active={activeTool === 'layers'} onClick={() => selectTool('layers', 'layers')} title="Layers"><IconLayers /></ToolBtn>
          </div>
        )}

        {/* ── Canvas ──────────────────────────────────────────── */}
        <main className="customizer__canvas">
          <div className="customizer__canvas-card">
            <div
              className={`customizer__preview-wrap customizer__preview-wrap--${activeTool}`}
              ref={previewRef}
              onPointerDown={handlePreviewPointerDown}
              onPointerMove={handlePreviewPointerMove}
              onPointerUp={handlePreviewPointerUp}
              onDoubleClick={resetView}
            >
              <div
                className="customizer__preview-kit"
                style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom / 100})` }}
              >
                <KitPreview
                  kitType={design.kitType}
                  bodyColor={design.bodyColor}
                  sleeveColor={design.sleeveColor}
                  numberColor={design.numberColor}
                  collarColor={design.collarColor}
                  opacity={design.opacity}
                  template={design.template}
                  playerName={design.playerName}
                  playerNumber={design.playerNumber}
                  font={design.font}
                  nameSize={design.nameSize}
                  numberSize={design.numberSize}
                  textPosition={design.textPosition}
                  logoDataUrl={design.logoDataUrl}
                  logoPreset={design.logoPreset}
                  logoScale={design.logoScale}
                  logoOpacity={design.logoOpacity}
                  logoPosition={design.logoPosition}
                  side={side}
                  layers={design.layers}
                />
              </div>
            </div>

            <div className="customizer__zoom">
              <button onClick={() => setZoom(z => Math.max(50, z - 10))} aria-label="Zoom out"><IconMinus /></button>
              <span>{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(150, z + 10))} aria-label="Zoom in"><IconPlus /></button>
            </div>
          </div>

          <div className="customizer__info-bar">
            <span><strong>Kit:</strong> {kitLabel}</span>
            <span><strong>Sport:</strong> {SPORTS.find(s => s.id === design.sport)?.label}</span>
            <span><strong>Template:</strong> {DESIGN_TEMPLATES.find(t => t.id === design.template)?.name}</span>
            <span><strong>Size:</strong> {design.size === 'Custom' && design.customSize ? `${design.customSize} ${design.customSizeUnit}` : design.size}</span>
            <span className="customizer__color-swatch" style={{ background: design.bodyColor }} title={`Body: ${design.bodyColor}`} />
            <span className="customizer__color-swatch" style={{ background: design.sleeveColor }} title={`Sleeves: ${design.sleeveColor}`} />
          </div>
        </main>

        {/* ── Right panel ─────────────────────────────────────── */}
        <aside className="customizer__sidebar">
          <div className="customizer__tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`customizer__tab${activeTab === tab.id ? ' customizer__tab--active' : ''}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="customizer__panel">
            {activeTab === 'kit' && (
              <KitPanel design={design} patch={patch} />
            )}

            {activeTab === 'colors' && (
              <ColorsPanel
                design={design} applyTarget={applyTarget} setApplyTarget={setApplyTarget}
                onColor={(hex) => patch({ [TARGET_COLOR_KEY[applyTarget]]: hex })}
                onOpacity={(v) => patchOpacity(applyTarget, v)}
              />
            )}

            {activeTab === 'text' && (
              <TextPanel design={design} patch={patch} />
            )}

            {activeTab === 'draw' && <DrawPanel />}

            {activeTab === 'assets' && (
              <AssetsPanel
                design={design} patch={patch}
                fileInputRef={fileInputRef}
                onFile={handleLogoFile}
              />
            )}

            {activeTab === 'layers' && (
              <LayersPanel
                design={design}
                toggleLayer={toggleLayer}
                reorderLayers={reorderLayers}
                dragLayerId={dragLayerId}
                setDragLayerId={setDragLayerId}
              />
            )}
          </div>
        </aside>
      </div>

      {toast && <div className="customizer__toast">{toast}</div>}
    </div>
  );
}

/* ── Small reusable toolbar button ─────────────────────────── */
function ToolBtn({ active, disabled, onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`customizer__iconbtn${active ? ' customizer__iconbtn--active' : ''}`}
    >
      {children}
    </button>
  );
}

/* ── Kit Panel (Kit Type / Sport / Templates) ──────────────── */
/* ── Custom dropdown for size units — avoids the browser's native blue option highlight ── */
function UnitDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SIZE_UNITS.find(u => u.id === value);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  return (
    <div className="panel__unit-dropdown" ref={ref}>
      <button type="button" className="panel__unit-dropdown-btn" onClick={() => setOpen(v => !v)}>
        {current?.label}
        <IconChevronLeft style={{ transform: 'rotate(-90deg)', width: 12, height: 12 }} />
      </button>
      {open && (
        <ul className="panel__unit-dropdown-list">
          {SIZE_UNITS.map(u => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => { onChange(u.id); setOpen(false); }}
                className={`panel__unit-dropdown-item${u.id === value ? ' panel__unit-dropdown-item--active' : ''}`}
              >
                {u.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KitPanel({ design, patch }) {
  const [expandedSport, setExpandedSport] = useState(null);
  const activeGroup = SPORT_KIT_GROUPS.find(g => g.id === expandedSport);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const visibleTemplates = showAllTemplates ? DESIGN_TEMPLATES : DESIGN_TEMPLATES.slice(0, 4);

  return (
    <div className="panel">
      <div className="panel__section panel__section--no-border">
        <h3 className="panel__label">Kit Type</h3>

        {!activeGroup ? (
          <div className="panel__sport-grid">
            {SPORT_KIT_GROUPS.map(g => (
              <button
                key={g.id}
                onClick={() => setExpandedSport(g.id)}
                className="panel__sport-btn"
              >
                {g.label}
              </button>
            ))}
          </div>
        ) : (
          <>
            <button className="panel__sport-back" onClick={() => setExpandedSport(null)}>
              ← {activeGroup.label}
            </button>
            <div className="panel__kit-grid">
              {activeGroup.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => patch({ kitType: item.kitType, kitProduct: item.label })}
                  className={`panel__kit-btn${design.kitProduct === item.label ? ' panel__kit-btn--active' : ''}`}
                >
                  <img src={item.image} alt={item.label} className="panel__kit-thumb" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="panel__section panel__section--no-border">
        <h3 className="panel__label">Templates</h3>
        <div className="panel__template-grid">
          {visibleTemplates.map(t => (
            <button
              key={t.id}
              onClick={() => patch({ template: t.id })}
              className={`panel__template-btn${design.template === t.id ? ' panel__template-btn--active' : ''}`}
            >
              <TemplateThumb id={t.id} base={design.bodyColor} accent={design.sleeveColor} />
              <span>{t.name}</span>
            </button>
          ))}
        </div>
        {DESIGN_TEMPLATES.length > 4 && (
          <button className="panel__more-btn" onClick={() => setShowAllTemplates(v => !v)}>
            {showAllTemplates ? 'Show less' : 'More'}
          </button>
        )}
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Size</h3>
        <div className="panel__size-grid">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => patch({ size: s })}
              className={`panel__size-btn${design.size === s ? ' panel__size-btn--active' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
        {design.size === 'Custom' && (
          <>
            <div className="panel__custom-size-row">
              <input
                type="text"
                className="panel__input"
                placeholder="e.g. 44 chest, or your own measurement"
                value={design.customSize}
                onChange={e => patch({ customSize: e.target.value })}
              />
              <UnitDropdown value={design.customSizeUnit} onChange={u => patch({ customSizeUnit: u })} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TemplateThumb({ id, base = '#CC0000', accent = '#1a1a1a' }) {
  const acc = accent;
  return (
    <svg viewBox="0 0 60 70" className="panel__template-thumb">
      <defs>
        <linearGradient id="thumb-fade-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={acc} stopOpacity="0" />
          <stop offset="100%" stopColor={acc} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="thumb-fade-left-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={acc} stopOpacity="0.85" />
          <stop offset="100%" stopColor={acc} stopOpacity="0" />
        </linearGradient>
        <pattern id="thumb-striped" width="6.5" height="60" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="2.7" height="60" fill={acc} opacity="0.8" />
        </pattern>
        <pattern id="thumb-hoops" width="50" height="6.5" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="50" height="2.7" fill={acc} opacity="0.8" />
        </pattern>
      </defs>
      <clipPath id="thumb-clip"><rect x="5" y="5" width="50" height="60" rx="4" /></clipPath>
      <rect x="5" y="5" width="50" height="60" rx="4" fill={base} />
      <g clipPath="url(#thumb-clip)">
        {id === 'two-tone' && <><rect x="5" y="5" width="13" height="60" fill={acc} opacity="0.85" /><rect x="42" y="5" width="13" height="60" fill={acc} opacity="0.85" /></>}
        {id === 'striped' && <rect x="5" y="5" width="50" height="60" fill="url(#thumb-striped)" />}
        {id === 'diagonal' && <path d="M 5,65 L 55,5 L 55,65 Z" fill={acc} opacity="0.55" />}
        {id === 'hoops' && <rect x="5" y="5" width="50" height="60" fill="url(#thumb-hoops)" />}
        {id === 'halves' && <rect x="30" y="5" width="25" height="60" fill={acc} opacity="0.85" />}
        {id === 'chevron' && <path d="M 30,20 L 45,50 L 37,50 L 30,36 L 23,50 L 15,50 Z" fill={acc} opacity="0.65" />}
        {id === 'sash' && <path d="M 3,20 L 15,4 L 57,50 L 45,66 Z" fill={acc} opacity="0.75" />}
        {id === 'fade' && <rect x="5" y="5" width="50" height="60" fill="url(#thumb-fade-grad)" />}
        {id === 'fade-left' && <rect x="5" y="5" width="50" height="60" fill="url(#thumb-fade-left-grad)" />}
        {id === 'dots' && [[16,20],[30,14],[44,20],[16,34],[30,28],[44,34],[16,48],[30,42],[44,48],[30,56]].map(([cx,cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill={acc} opacity="0.85" />
        ))}
        {id === 'sleeves' && <>
          <path d="M 5,9.8 L 20,5.6 L 22.5,18.2 L 13.5,26 L 5,23 Z" fill={acc} opacity="0.9" />
          <path d="M 55,9.8 L 40,5.6 L 37.5,18.2 L 46.5,26 L 55,23 Z" fill={acc} opacity="0.9" />
        </>}
      </g>
    </svg>
  );
}

/* ── Colors Panel (Kit Colors) ──────────────────────────────── */
function ColorsPanel({ design, applyTarget, setApplyTarget, onColor, onOpacity }) {
  const currentHex = design[TARGET_COLOR_KEY[applyTarget]];
  const currentOpacity = design.opacity[applyTarget] ?? 100;
  const targetLabel = APPLY_TARGETS.find(t => t.id === applyTarget)?.label;
  const presetName = COLOR_PALETTE.find(c => c.hex.toLowerCase() === currentHex?.toLowerCase())?.name || 'Custom';

  return (
    <div className="panel">
      <div className="panel__section">
        <h3 className="panel__label">Apply To</h3>
        <div className="panel__segmented">
          {APPLY_TARGETS.map(t => (
            <button
              key={t.id}
              onClick={() => setApplyTarget(t.id)}
              className={`panel__segment${applyTarget === t.id ? ' panel__segment--active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel__section">
        <div className="panel__color-preview">
          <span className="panel__color-preview-swatch" style={{ background: currentHex }} />
          <div>
            <div className="panel__color-preview-title">{targetLabel} — {presetName}</div>
            <div className="panel__color-preview-hex">{currentHex?.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Preset Colors</h3>
        <div className="panel__palette">
          {COLOR_PALETTE.map(c => (
            <button
              key={c.hex}
              onClick={() => onColor(c.hex)}
              className={`panel__swatch${currentHex?.toLowerCase() === c.hex.toLowerCase() ? ' panel__swatch--active' : ''}`}
              style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid var(--swatch-outline)' : 'none' }}
              title={c.name}
              aria-label={c.name}
            />
          ))}
        </div>
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Custom Color</h3>
        <ColorPicker value={currentHex} onChange={onColor} />
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Opacity</h3>
        <div className="panel__slider-row">
          <input
            type="range" min="0" max="100" value={currentOpacity}
            onChange={e => onOpacity(Number(e.target.value))}
            className="panel__slider"
          />
          <span className="panel__slider-value">{currentOpacity}%</span>
        </div>
      </div>
    </div>
  );
}

/* ── Text Panel ─────────────────────────────────────────────── */
function TextPanel({ design, patch }) {
  const [showAllFonts, setShowAllFonts] = useState(false);
  const visibleFonts = showAllFonts ? FONTS : FONTS.slice(0, 4);

  return (
    <div className="panel">
      <div className="panel__section">
        <h3 className="panel__label">Player Name</h3>
        <input
          type="text" className="panel__input" placeholder="e.g. RASHFORD" maxLength={18}
          value={design.playerName} onChange={e => patch({ playerName: e.target.value })}
        />
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Squad Number</h3>
        <input
          type="text" className="panel__input" placeholder="e.g. 7" maxLength={3}
          value={design.playerNumber} onChange={e => patch({ playerNumber: e.target.value.replace(/\D/g, '') })}
        />
      </div>

      <div className="panel__section panel__section--no-border">
        <h3 className="panel__label">Font Style</h3>
        <div className="panel__font-grid">
          {visibleFonts.map(f => (
            <button
              key={f.id}
              onClick={() => patch({ font: f.id })}
              className={`panel__font-btn${design.font === f.id ? ' panel__font-btn--active' : ''}`}
              style={{ fontFamily: f.id }}
            >
              Aa <span>{f.label}</span>
            </button>
          ))}
        </div>
        {FONTS.length > 4 && (
          <button className="panel__more-btn" onClick={() => setShowAllFonts(v => !v)}>
            {showAllFonts ? 'Show less' : 'More'}
          </button>
        )}
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Text Size</h3>
        <SliderRow label="Name" value={design.nameSize} min={8} max={30} onChange={v => patch({ nameSize: v })} />
        <SliderRow label="Number" value={design.numberSize} min={20} max={80} onChange={v => patch({ numberSize: v })} />
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Text Position</h3>
        <PositionGrid value={design.textPosition} onChange={v => patch({ textPosition: v })} />
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, onChange }) {
  return (
    <div className="panel__slider-row panel__slider-row--labeled">
      <span className="panel__slider-label">{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="panel__slider" />
      <span className="panel__slider-value">{value}</span>
    </div>
  );
}

const POSITION_STEP = 0.035;
const POSITION_BOUNDS = { xMin: 0.15, xMax: 0.85, yMin: 0.12, yMax: 0.88 };

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function PositionGrid({ value, onChange }) {
  return (
    <div className="panel__pos-grid">
      {POSITIONS.map(p => {
        const dx = p.col - 1;
        const dy = p.row - 1;
        const isCenter = dx === 0 && dy === 0;
        return (
          <button
            key={p.id}
            onClick={() => {
              if (isCenter) { onChange({ x: 0.5, y: 0.5 }); return; }
              onChange({
                x: clamp(value.x + dx * POSITION_STEP, POSITION_BOUNDS.xMin, POSITION_BOUNDS.xMax),
                y: clamp(value.y + dy * POSITION_STEP, POSITION_BOUNDS.yMin, POSITION_BOUNDS.yMax),
              });
            }}
            className="panel__pos-btn"
            title={isCenter ? 'Center' : `Nudge ${p.id}`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Draw Panel — launches the full Fabric.js kit editor ───────── */
function DrawPanel() {
  return (
    <div className="panel">
      <div className="panel__section">
        <Link to="/kit-editor" className="btn btn-grey panel__draw-studio-link">
          Open kit editor →
        </Link>
      </div>
    </div>
  );
}

/* ── Assets Panel ───────────────────────────────────────────── */
function AssetsPanel({ design, patch, fileInputRef, onFile }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="panel">
      <div className="panel__section">
        <h3 className="panel__label">Upload Logo / Badge</h3>
        <div
          className={`panel__dropzone${dragOver ? ' panel__dropzone--over' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); onFile(e.dataTransfer.files?.[0]); }}
        >
          {design.logoDataUrl ? (
            <img src={design.logoDataUrl} alt="Uploaded logo" className="panel__dropzone-preview" />
          ) : (
            <>
              <IconUpload />
              <p>Click to upload or drag &amp; drop</p>
              <span>PNG, SVG, JPG · Max 5MB</span>
            </>
          )}
          <input
            ref={fileInputRef} type="file" accept=".png,.svg,.jpg,.jpeg" hidden
            onChange={e => onFile(e.target.files?.[0])}
          />
        </div>
        {design.logoDataUrl && (
          <button className="panel__link-btn" onClick={() => patch({ logoDataUrl: null })}>Remove logo</button>
        )}
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Badge Presets</h3>
        <div className="panel__pill-row">
          {BADGE_PRESETS.map(b => (
            <button
              key={b.id}
              onClick={() => patch({ logoPreset: b.id, logoDataUrl: null })}
              className={`panel__badge-btn${design.logoPreset === b.id && !design.logoDataUrl ? ' panel__badge-btn--active' : ''}`}
              title={b.label}
            >
              <img src={b.image} alt={b.label} className="panel__badge-thumb" />
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Logo Size</h3>
        <SliderRow label="Scale" value={design.logoScale} min={30} max={150} onChange={v => patch({ logoScale: v })} />
        <SliderRow label="Opacity" value={design.logoOpacity} min={0} max={100} onChange={v => patch({ logoOpacity: v })} />
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Logo Position</h3>
        <PositionGrid value={design.logoPosition} onChange={v => patch({ logoPosition: v })} />
      </div>
    </div>
  );
}

/* ── Layers Panel ───────────────────────────────────────────── */
function LayersPanel({ design, toggleLayer, reorderLayers, dragLayerId, setDragLayerId }) {
  return (
    <div className="panel">
      <div className="panel__section">
        <h3 className="panel__label">Layer Stack</h3>
        <div className="panel__layer-list">
          {design.layerOrder.map(id => {
            const meta = DEFAULT_LAYER_ORDER.find(l => l.id === id);
            const visible = design.layers[id];
            return (
              <div
                key={id}
                className={`panel__layer-row${dragLayerId === id ? ' panel__layer-row--dragging' : ''}`}
                draggable
                onDragStart={() => setDragLayerId(id)}
                onDragOver={e => e.preventDefault()}
                onDrop={() => { reorderLayers(dragLayerId, id); setDragLayerId(null); }}
                onDragEnd={() => setDragLayerId(null)}
              >
                <span className="panel__layer-grip"><IconGrip /></span>
                <span className={`panel__layer-name${visible ? '' : ' panel__layer-name--hidden'}`}>{meta?.label}</span>
                <button className="panel__layer-eye" onClick={() => toggleLayer(id)} aria-label={`Toggle ${meta?.label}`}>
                  {visible ? <IconEye /> : <IconEyeOff />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel__section">
        <h3 className="panel__label">Design State</h3>
        <div className="panel__state-box">
          <StateRow label="Kit" value={design.kitProduct || KIT_TYPES.find(k => k.id === design.kitType)?.label} />
          <StateRow label="Sport" value={SPORTS.find(s => s.id === design.sport)?.label} />
          <StateRow label="Template" value={DESIGN_TEMPLATES.find(t => t.id === design.template)?.name} />
          <StateRow label="Body" value={design.bodyColor} swatch={design.bodyColor} />
          <StateRow label="Sleeves" value={design.sleeveColor} swatch={design.sleeveColor} />
          <StateRow label="Number" value={design.numberColor} swatch={design.numberColor} />
        </div>
      </div>
    </div>
  );
}

function StateRow({ label, value, swatch }) {
  return (
    <div className="panel__state-row">
      <span>{label}</span>
      <span className="panel__state-value">
        {swatch && <i className="panel__state-swatch" style={{ background: swatch }} />}
        {value}
      </span>
    </div>
  );
}
