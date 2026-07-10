import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas, PencilBrush, Textbox, FabricImage } from 'fabric';
import { KIT_TYPES, COLOR_PALETTE, FONTS, getKitPath, DRAWN_LOGO_KEY } from '../customize/kitShapes';
import { IconSelect, IconDraw, IconText, IconUndo, IconRedo, IconExport, IconLayers, IconEye, IconEyeOff, IconTrash, IconChevronLeft } from '../customize/icons';
import ColorPicker from '../customize/ColorPicker';
import '../pages/Customize.css';
import './DrawStudio.css';

const TABS = [
  { id: 'kit',    label: 'Kit',    icon: <IconSelect /> },
  { id: 'colors', label: 'Colors', icon: <IconDraw /> },
  { id: 'text',   label: 'Text',   icon: <IconText /> },
  { id: 'layers', label: 'Layers', icon: <IconLayers /> },
];

/** Reads a resolved hex value from the site's CSS custom properties (theme.css), so canvas
 *  content — which fabric renders as raw pixels, not DOM — stays in sync with the theme. */
function themeColor(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  return val || fallback;
}

/** Builds a light garment-outline reference image (from the same path data the SVG studio uses) as a data URL. */
function kitOutlineDataUrl(kitTypeId) {
  const kit = getKitPath(kitTypeId);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${kit.viewBox}">
    <path d="${kit.body}" fill="none" stroke="#d8d8d8" stroke-width="3"/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function DrawStudio() {
  const navigate = useNavigate();
  const canvasElRef = useRef(null);
  const fabricRef = useRef(null);
  const loadingRef = useRef(false);

  const [activeTab, setActiveTab] = useState('kit');
  const [activeTool, setActiveTool] = useState('draw');
  const [brushColor, setBrushColor] = useState(() => themeColor('red', '#8B0000'));
  const [brushSize, setBrushSize] = useState(6);
  const [kitType, setKitType] = useState('jersey');
  const [selectedObj, setSelectedObj] = useState(null);
  const [objectsTick, setObjectsTick] = useState(0);
  const [toast, setToast] = useState('');

  // Fabric's canvas is imperative (not React-rendered state), so undo/redo is a manual
  // JSON-snapshot stack rather than the declarative useHistoryState hook the SVG studio uses.
  const historyRef = useRef({ past: [], future: [] });
  const [historyTick, setHistoryTick] = useState(0);

  const restoreFromJSON = useCallback((json) => {
    const canvas = fabricRef.current;
    loadingRef.current = true;
    canvas.loadFromJSON(json).then(() => {
      canvas.requestRenderAll();
      loadingRef.current = false;
      setObjectsTick(t => t + 1);
    });
  }, []);

  /** Records a history snapshot — call after any change that doesn't already fire a
   *  canvas event (e.g. programmatic .set() calls from the color/font panels). */
  const pushHistorySnapshot = useCallback(() => {
    const canvas = fabricRef.current;
    if (!canvas || loadingRef.current) return;
    const h = historyRef.current;
    h.past.push(JSON.stringify(canvas.toJSON()));
    h.future = [];
    setHistoryTick(t => t + 1);
  }, []);

  const handleUndo = useCallback(() => {
    const h = historyRef.current;
    const canvas = fabricRef.current;
    if (!canvas || h.past.length === 0) return;
    const current = JSON.stringify(canvas.toJSON());
    const previous = h.past.pop();
    h.future.push(current);
    restoreFromJSON(JSON.parse(previous));
    setHistoryTick(t => t + 1);
  }, [restoreFromJSON]);

  const handleRedo = useCallback(() => {
    const h = historyRef.current;
    const canvas = fabricRef.current;
    if (!canvas || h.future.length === 0) return;
    const current = JSON.stringify(canvas.toJSON());
    const next = h.future.pop();
    h.past.push(current);
    restoreFromJSON(JSON.parse(next));
    setHistoryTick(t => t + 1);
  }, [restoreFromJSON]);

  /* ── Set up the fabric canvas once ─────────────────────────── */
  useEffect(() => {
    const canvas = new Canvas(canvasElRef.current, {
      width: 520,
      height: 620,
      backgroundColor: themeColor('canvas-light', '#f7f7f5'),
      preserveObjectStacking: true,
    });
    fabricRef.current = canvas;

    const pushHistory = () => {
      pushHistorySnapshot();
      setObjectsTick(t => t + 1);
    };

    canvas.on('object:added', pushHistory);
    canvas.on('object:removed', pushHistory);
    canvas.on('object:modified', pushHistory);
    canvas.on('path:created', pushHistory);
    canvas.on('selection:created', (e) => setSelectedObj(e.selected?.[0] || null));
    canvas.on('selection:updated', (e) => setSelectedObj(e.selected?.[0] || null));
    canvas.on('selection:cleared', () => setSelectedObj(null));

    return () => canvas.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canUndo = historyRef.current.past.length > 0;
  const canRedo = historyRef.current.future.length > 0;
  // historyTick forces a re-render so the two lines above reflect the latest ref state
  // eslint-disable-next-line no-unused-expressions
  historyTick;

  /* ── Load the chosen garment outline as a background reference ── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    FabricImage.fromURL(kitOutlineDataUrl(kitType)).then(img => {
      img.set({ selectable: false, evented: false });
      const scale = Math.min((canvas.width * 0.7) / img.width, (canvas.height * 0.7) / img.height);
      img.scale(scale);
      img.set({
        left: (canvas.width - img.width * scale) / 2,
        top: (canvas.height - img.height * scale) / 2,
      });
      canvas.backgroundImage = img;
      canvas.requestRenderAll();
    });
  }, [kitType]);

  /* ── Keep drawing mode + brush in sync with tool/color/size ───── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.isDrawingMode = activeTool === 'draw';
    if (activeTool === 'draw') {
      const brush = new PencilBrush(canvas);
      brush.color = brushColor;
      brush.width = brushSize;
      canvas.freeDrawingBrush = brush;
    }
  }, [activeTool, brushColor, brushSize]);

  const applyToSelection = (fill) => {
    const canvas = fabricRef.current;
    if (!canvas || !selectedObj) return;
    selectedObj.set({ fill });
    canvas.requestRenderAll();
    pushHistorySnapshot();
  };

  const addText = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const text = new Textbox('Your Text', {
      left: canvas.width / 2 - 60,
      top: canvas.height / 2 - 15,
      fontFamily: FONTS[0].id,
      fontSize: 28,
      fill: brushColor,
      width: 160,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setActiveTool('select');
    canvas.requestRenderAll();
  };

  const deleteSelected = () => {
    const canvas = fabricRef.current;
    if (!canvas || !selectedObj) return;
    canvas.remove(selectedObj);
    setSelectedObj(null);
    canvas.requestRenderAll();
  };

  const layers = fabricRef.current
    ? fabricRef.current.getObjects()
    : [];
  // objectsTick forces this component to re-render when the canvas's object list changes
  // eslint-disable-next-line no-unused-expressions
  objectsTick;

  const selectLayer = (obj) => {
    const canvas = fabricRef.current;
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
  };

  const toggleVisible = (obj) => {
    obj.visible = !obj.visible;
    fabricRef.current.requestRenderAll();
    setObjectsTick(t => t + 1);
  };

  const exportPNG = () => {
    const canvas = fabricRef.current;
    const url = canvas.toDataURL({ format: 'png', multiplier: 2 });
    const a = document.createElement('a');
    a.href = url;
    a.download = `kit-drawing-${Date.now()}.png`;
    a.click();
    setToast('Exported PNG');
  };

  const useAsLogo = () => {
    const canvas = fabricRef.current;
    const url = canvas.toDataURL({ format: 'png', multiplier: 2 });
    try { localStorage.setItem(DRAWN_LOGO_KEY, url); } catch { /* storage unavailable */ }
    navigate('/customize');
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="customizer draw">
      <div className="customizer__topbar">
        <div className="customizer__topbar-left">
          <Link to="/customize" className="draw__back-link">
            <IconChevronLeft /> Back to Studio
          </Link>
        </div>
        <div className="customizer__topbar-center">
          <span className="draw__title">Free Draw</span>
        </div>
        <div className="customizer__topbar-right">
          <button className="customizer__iconbtn" onClick={handleUndo} disabled={!canUndo} title="Undo"><IconUndo /></button>
          <button className="customizer__iconbtn" onClick={handleRedo} disabled={!canRedo} title="Redo"><IconRedo /></button>
          <button onClick={exportPNG} className="btn btn-grey customizer__export-btn">
            <IconExport /> Export PNG
          </button>
          <button onClick={useAsLogo} className="btn btn-darkred customizer__export-btn">
            Use as Logo
          </button>
        </div>
      </div>

      <div className="customizer__body">
        <div className="customizer__rail">
          <button
            className={`customizer__iconbtn${activeTool === 'select' ? ' customizer__iconbtn--active' : ''}`}
            onClick={() => setActiveTool('select')}
            title="Select — move & resize objects"
          ><IconSelect /></button>
          <button
            className={`customizer__iconbtn${activeTool === 'draw' ? ' customizer__iconbtn--active' : ''}`}
            onClick={() => setActiveTool('draw')}
            title="Draw — freehand pencil"
          ><IconDraw /></button>
          <button className="customizer__iconbtn" onClick={addText} title="Add text"><IconText /></button>
          <button className="customizer__iconbtn" onClick={deleteSelected} disabled={!selectedObj} title="Delete selected"><IconTrash /></button>
        </div>

        <main className="customizer__canvas">
          <div className="draw__canvas-card">
            <canvas ref={canvasElRef} />
          </div>
          <p className="draw__hint">Draw freehand, or add text — then export it as a PNG or send it straight to your kit as a logo.</p>
        </main>

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
              <div className="panel">
                <div className="panel__section">
                  <h3 className="panel__label">Garment Outline</h3>
                  <p className="panel__hint">Pick a shape to draw on top of — it's just a guide, it won't be exported.</p>
                  <div className="panel__kit-grid">
                    {KIT_TYPES.map(k => (
                      <button
                        key={k.id}
                        onClick={() => setKitType(k.id)}
                        className={`panel__kit-btn${kitType === k.id ? ' panel__kit-btn--active' : ''}`}
                      >
                        <span>{k.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="panel">
                <div className="panel__section">
                  <h3 className="panel__label">Brush Color</h3>
                  <div className="panel__palette">
                    {COLOR_PALETTE.map(c => (
                      <button
                        key={c.hex}
                        onClick={() => setBrushColor(c.hex)}
                        className={`panel__swatch${brushColor === c.hex ? ' panel__swatch--active' : ''}`}
                        style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid var(--swatch-outline)' : 'none' }}
                        title={c.name}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                  <ColorPicker value={brushColor} onChange={setBrushColor} />
                </div>

                <div className="panel__section">
                  <h3 className="panel__label">Brush Size</h3>
                  <div className="panel__slider-row">
                    <input
                      type="range" min="1" max="40" value={brushSize}
                      onChange={e => setBrushSize(Number(e.target.value))}
                      className="panel__slider"
                    />
                    <span className="panel__slider-value">{brushSize}px</span>
                  </div>
                </div>

                {selectedObj && (
                  <div className="panel__section">
                    <h3 className="panel__label">Selected Object Color</h3>
                    <div className="panel__palette">
                      {COLOR_PALETTE.map(c => (
                        <button
                          key={c.hex}
                          onClick={() => applyToSelection(c.hex)}
                          className="panel__swatch"
                          style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid var(--swatch-outline)' : 'none' }}
                          title={c.name}
                          aria-label={c.name}
                        />
                      ))}
                    </div>
                    <ColorPicker value={selectedObj.fill || '#000000'} onChange={applyToSelection} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'text' && (
              <div className="panel">
                <div className="panel__section">
                  <button className="btn btn-grey" onClick={addText}>+ Add Text</button>
                </div>
                {selectedObj && selectedObj.type === 'textbox' && (
                  <div className="panel__section">
                    <h3 className="panel__label">Font Style</h3>
                    <div className="panel__font-grid">
                      {FONTS.slice(0, 4).map(f => (
                        <button
                          key={f.id}
                          onClick={() => { selectedObj.set({ fontFamily: f.id }); fabricRef.current.requestRenderAll(); pushHistorySnapshot(); }}
                          className={`panel__font-btn${selectedObj.fontFamily === f.id ? ' panel__font-btn--active' : ''}`}
                          style={{ fontFamily: f.id }}
                        >
                          Aa <span>{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'layers' && (
              <div className="panel">
                <div className="panel__section">
                  <h3 className="panel__label">Layers</h3>
                  {layers.length === 0 && <p className="panel__hint">Nothing drawn yet — pick the Draw tool and start sketching.</p>}
                  <div className="draw__layer-list">
                    {layers.slice().reverse().map((obj, i) => (
                      <div
                        key={i}
                        className={`draw__layer-row${selectedObj === obj ? ' draw__layer-row--active' : ''}`}
                        onClick={() => selectLayer(obj)}
                      >
                        <span>{obj.type === 'textbox' ? `“${obj.text}”` : obj.type === 'path' ? 'Drawing' : obj.type}</span>
                        <button onClick={(e) => { e.stopPropagation(); toggleVisible(obj); }} title="Toggle visibility">
                          {obj.visible === false ? <IconEyeOff /> : <IconEye />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {toast && <div className="customizer__toast">{toast}</div>}
    </div>
  );
}
