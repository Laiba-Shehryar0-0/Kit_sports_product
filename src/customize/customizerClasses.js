/** Shared Tailwind class strings for the customizer/editor "chrome" — used by both
 *  Customize.jsx and KitCanvasEditor.jsx, mirroring how they used to share Customize.css. */

export const customizerCls = 'h-[calc(100vh-72px)] mt-[72px] bg-surface-800 flex flex-col overflow-hidden';

export const topbarCls = 'relative flex items-center justify-between px-6 h-[60px] bg-surface-900 border-b border-line flex-shrink-0 gap-4 max-[560px]:flex-wrap max-[560px]:h-auto max-[560px]:py-3 max-[560px]:px-4';
export const topbarLeftCls = 'flex items-center gap-4 flex-1 max-[560px]:flex-initial';
export const topbarRightCls = 'flex items-center gap-4 flex-1 justify-end max-[560px]:flex-initial';
export const topbarCenterCls = 'absolute top-1/2 left-[calc(50%-142px)] -translate-x-1/2 -translate-y-1/2 max-[1100px]:left-[calc(50%-126px)] max-[900px]:static max-[900px]:transform-none';

export function iconBtnCls(active) {
  const base = 'flex items-center justify-center w-[34px] h-[34px] bg-transparent border-none rounded-sm cursor-pointer transition-[all_180ms_ease] disabled:opacity-30 disabled:cursor-not-allowed';
  return active
    ? `${base} text-onsurface-100 bg-onsurface-600 hover:bg-onsurface-500`
    : `${base} text-onsurface-500 hover:text-onsurface-100 hover:bg-surface-500`;
}

export const exportBtnCls = 'inline-flex items-center gap-2 py-[9px] px-5 text-[12px]';

export const sideToggleCls = 'flex rounded-md overflow-hidden border border-line';
export function sideBtnCls(active) {
  const base = 'py-2 px-[18px] text-[11px] font-bold tracking-[1.5px] uppercase border-none cursor-pointer transition-[all_180ms_ease]';
  return active ? `${base} bg-red text-light-100` : `${base} bg-surface-700 text-onsurface-500 hover:bg-surface-500 hover:text-onsurface-200`;
}

export function bodyCls(railHidden) {
  const cols = railHidden ? 'grid-cols-[1fr_340px]' : 'grid-cols-[56px_1fr_340px]';
  return `grid ${cols} flex-1 min-h-0 max-[1100px]:grid-cols-[48px_1fr_300px] max-[900px]:grid-cols-1`;
}

export const railCls = 'flex flex-col items-center gap-2 py-4 bg-surface-900 border-r border-line max-[900px]:flex-row max-[900px]:justify-center max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-line';

export const canvasCls = "flex flex-col items-center justify-center gap-4 p-6 bg-[radial-gradient(circle_at_50%_0%,rgba(245,166,35,0.06),transparent_55%),var(--color-surface-800)] min-h-0 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 max-[900px]:p-5";

export const canvasCardCls = 'relative w-full max-w-[520px] aspect-[4/3.1] bg-[linear-gradient(160deg,var(--color-canvas-light)_0%,var(--color-canvas-light-dark)_100%)] rounded-lg shadow-[0_18px_30px_-12px_rgba(0,0,0,0.6)] flex items-center justify-center';

const previewWrapCursor = {
  select: 'cursor-default',
  pan: 'cursor-grab active:cursor-grabbing',
  draw: 'cursor-crosshair',
  text: 'cursor-text',
  layers: 'cursor-default',
};
export function previewWrapCls(tool) {
  return `w-full h-full flex items-center justify-center overflow-hidden [touch-action:none] ${previewWrapCursor[tool] || ''}`;
}

export function previewKitCls(noTransition) {
  return `w-[62%] max-w-[300px] aspect-[5/6] [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.25))] ${noTransition ? 'transition-none' : 'transition-[transform_150ms_ease]'}`;
}
export const previewKitImgCls = 'w-full h-full object-contain block rounded-md';

export const zoomCls = "absolute bottom-4 right-4 flex items-center gap-2 bg-[rgba(20,20,20,0.85)] rounded-full py-[6px] px-[10px] text-light-200 text-[11px] font-bold [backdrop-filter:blur(4px)]";
export const zoomBtnCls = 'flex items-center justify-center w-[22px] h-[22px] rounded-full border-none bg-[rgba(255,255,255,0.1)] text-light-100 cursor-pointer transition-[background_150ms_ease] hover:bg-gold hover:text-bg-800';
export const zoomSpanCls = 'min-w-[34px] text-center';

export const infoBarCls = 'flex items-center gap-5 bg-surface-700 border border-line rounded-md py-3 px-5 text-[12px] text-onsurface-500 flex-nowrap whitespace-nowrap max-w-full w-fit overflow-x-auto';
export const colorSwatchCls = 'inline-block w-[18px] h-[18px] border border-line-strong rounded-full [cursor:help]';

export const toastCls = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-transparent text-onsurface-100 font-bold text-[13px] tracking-[0.5px] py-3 px-6 rounded-full shadow-none z-[100] animate-[toastPop_220ms_ease]';

export const sidebarCls = 'bg-surface-700 border-l border-line flex flex-col min-h-0 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:border-line max-[900px]:max-h-[420px]';

export const tabsCls = 'flex border-b border-line flex-shrink-0';
export function tabCls(active) {
  const base = 'flex flex-col items-center gap-[5px] py-3 px-2 font-body text-[12px] font-semibold tracking-[0.2px] normal-case bg-transparent border-none cursor-pointer transition-[color_150ms_ease,background_150ms_ease] flex-1 border-b-2 hover:text-onsurface-100 hover:bg-surface-600';
  return active ? `${base} text-onsurface-100 border-b-onsurface-100 bg-surface-600` : `${base} text-onsurface-600 border-b-transparent`;
}

export const panelCls = 'overflow-y-auto flex-1 min-h-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0';

/* ============================================================
   PANELS — shared
   ============================================================ */
export const panelBoxCls = 'p-5 flex flex-col';

/** Mirrors .panel__section + :first-child / :last-child / --no-border / (--no-border + &) */
export function sectionCls({ first = false, last = false, noBorder = false, afterNoBorder = false } = {}) {
  const pt = first ? 'pt-0' : afterNoBorder ? 'pt-2' : 'pt-5';
  const pb = noBorder ? 'pb-2' : 'pb-5';
  const border = (last || noBorder) ? '' : 'border-b border-line';
  return `flex flex-col gap-3 ${pt} ${pb} ${border}`.replace(/\s+/g, ' ').trim();
}

export const labelCls = 'font-body text-[12px] font-semibold tracking-[0.2px] normal-case text-onsurface-600';

export const kitGridCls = 'grid grid-cols-2 gap-3';
export function kitBtnCls(active) {
  const base = 'flex flex-col items-center gap-[6px] py-3 px-2 bg-surface-700 border-[1.5px] font-body text-[11px] font-semibold tracking-[0.2px] normal-case cursor-pointer rounded-lg transition-[all_200ms_ease]';
  return active
    ? `${base} border-red text-onsurface-100 bg-surface-600`
    : `${base} border-line text-onsurface-400 hover:border-onsurface-400 hover:text-onsurface-100 hover:bg-surface-600 hover:-translate-y-0.5`;
}
export const kitThumbCls = 'w-[42px] h-[42px] object-contain';

export const sportGridCls = 'grid grid-cols-3 gap-2';
export const sportBtnCls = 'py-4 px-2 bg-surface-600 border-[1.5px] border-line text-onsurface-500 font-body text-[12px] font-semibold tracking-[0.2px] cursor-pointer rounded-lg transition-[all_200ms_ease] hover:border-onsurface-100 hover:text-onsurface-100 hover:bg-surface-500 hover:-translate-y-0.5';
export const sportBackCls = 'inline-flex items-center gap-1 bg-transparent border-none text-onsurface-100 font-body text-[12px] font-semibold cursor-pointer pb-2 hover:text-onsurface-100';

export const pillRowCls = 'flex flex-wrap gap-2';
export function pillCls(active) {
  const base = 'py-2 px-4 border-[1.5px] font-body text-[12px] font-semibold tracking-[0.2px] normal-case cursor-pointer rounded-full transition-[all_200ms_ease]';
  return active
    ? `${base} bg-gold border-gold text-bg-800`
    : `${base} bg-surface-600 border-line text-onsurface-500 hover:border-onsurface-400 hover:text-onsurface-100`;
}

export const sizeGridCls = 'flex gap-2 flex-wrap';
export function sizeBtnCls(active) {
  const base = 'min-w-[44px] py-2 px-3 border-[1.5px] text-[12px] font-bold tracking-[1px] cursor-pointer rounded-md transition-[all_200ms_ease]';
  return active
    ? `${base} bg-red border-red text-onsurface-100`
    : `${base} bg-surface-600 border-line text-onsurface-400 hover:border-onsurface-400 hover:text-onsurface-100 hover:bg-surface-500`;
}

export const templateGridCls = 'grid grid-cols-4 gap-2';
export function templateBtnCls(active) {
  const base = 'flex flex-col items-center gap-2 p-2 border-[1.5px] font-body text-[10px] font-semibold tracking-[0.1px] normal-case cursor-pointer rounded-lg transition-[all_200ms_ease]';
  return active
    ? `${base} border-onsurface-100 text-onsurface-100 bg-[rgba(255,255,255,0.08)]`
    : `${base} bg-surface-600 border-line text-onsurface-500 hover:border-onsurface-400 hover:text-onsurface-100 hover:bg-surface-500`;
}
export const templateThumbCls = 'w-9 h-[42px] rounded-[3px] overflow-hidden';

export const moreBtnCls = 'block ml-auto mr-0 mt-1 bg-transparent border-none text-onsurface-100 font-body text-[11px] font-semibold cursor-pointer py-1 px-2 hover:text-gold';

export const customSizeRowCls = 'flex gap-2';
export const customSizeInputCls = 'flex-1';

export const unitDropdownCls = 'relative flex-shrink-0';
export const unitDropdownBtnCls = 'flex items-center gap-2 bg-surface-600 border border-line text-onsurface-100 py-[10px] px-3 text-[0.9rem] font-body outline-none rounded-sm cursor-pointer whitespace-nowrap hover:border-onsurface-400';
export const unitDropdownListCls = 'absolute bottom-[calc(100%+4px)] right-0 min-w-full bg-surface-600 border border-line rounded-sm overflow-hidden z-20 shadow-[0_8px_40px_rgba(0,0,0,0.6)]';
export function unitDropdownItemCls(active) {
  const base = 'block w-full py-[9px] px-3 bg-transparent border-none text-[0.9rem] font-body text-left cursor-pointer';
  return active ? `${base} text-gold font-bold hover:text-bg-800` : `${base} text-onsurface-100 hover:bg-light-100 hover:text-bg-800`;
}

export const segmentedCls = 'grid grid-cols-2 gap-2';
export function segmentCls(active) {
  const base = 'py-[9px] px-3 border-[1.5px] font-body text-[12px] font-semibold tracking-[0.2px] normal-case cursor-pointer rounded-md transition-[all_200ms_ease]';
  return active
    ? `${base} bg-red border-red text-onsurface-100`
    : `${base} bg-surface-600 border-line text-onsurface-500 hover:border-onsurface-400 hover:text-onsurface-100`;
}

export const hintCls = 'font-body text-[11px] text-onsurface-600 mt-[-4px] mb-3 leading-[1.4]';

export const colorPreviewCls = 'flex items-center gap-3 p-3 bg-surface-600 border-[1.5px] border-line rounded-lg';
export const colorPreviewSwatchCls = 'w-10 h-10 rounded-full border-2 border-line-strong flex-shrink-0';
export const colorPreviewTitleCls = 'font-body text-[12px] font-semibold text-onsurface-100';
export const colorPreviewHexCls = 'font-body text-[11px] text-onsurface-600 tracking-[0.5px] mt-[2px]';

export const paletteCls = 'flex flex-wrap gap-2';
export function swatchCls(active) {
  const base = 'w-7 h-7 rounded-full cursor-pointer transition-[transform_150ms_ease,box-shadow_150ms_ease] border-2 border-transparent hover:scale-[1.15]';
  return active ? `${base} border-gold shadow-[0_0_0_3px_rgba(245,166,35,0.3)] scale-110` : base;
}

export const sliderRowCls = 'flex items-center gap-3';
export const sliderRowLabeledCls = 'grid grid-cols-[52px_1fr_34px]';
export const sliderLabelCls = 'text-[11px] text-onsurface-500 font-semibold';
export const sliderCls = "appearance-none w-full h-1 rounded-full bg-surface-400 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-bg-800 [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_var(--color-gold)] [&::-moz-range-thumb]:w-[15px] [&::-moz-range-thumb]:h-[15px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-bg-800";
export const sliderValueCls = 'text-[11px] text-onsurface-400 font-bold text-right [font-variant-numeric:tabular-nums]';

export const fontGridCls = 'grid grid-cols-2 gap-2';
export function fontBtnCls(active) {
  const base = 'flex items-baseline gap-[6px] p-3 border-[1.5px] text-[16px] cursor-pointer rounded-md transition-[all_200ms_ease]';
  return active
    ? `${base} border-onsurface-100 bg-[rgba(255,255,255,0.08)] text-onsurface-100 [&_span]:text-onsurface-100`
    : `${base} bg-surface-600 border-line text-onsurface-100 hover:border-onsurface-400 hover:bg-surface-500`;
}
export const fontBtnSpanCls = 'font-body text-[11px] text-onsurface-600 normal-case tracking-[0.2px]';

export const posRowCls = 'flex gap-4';
export const posColCls = 'flex flex-col gap-2';
export const posColLabelCls = 'font-body text-[11px] font-bold tracking-[0.6px] uppercase text-onsurface-600';
export const posGridCls = 'grid grid-cols-3 gap-[6px] w-[132px]';
export const posBtnCls = 'w-10 h-10 flex items-center justify-center bg-surface-600 border-[1.5px] border-line text-onsurface-500 text-[14px] cursor-pointer rounded-md transition-[all_180ms_ease] hover:border-onsurface-400 hover:text-onsurface-100';
export function posBtnActiveCls(active) {
  return active ? `${posBtnCls} bg-gold border-gold text-bg-800` : posBtnCls;
}

export const drawStudioLinkCls = 'w-full justify-center normal-case font-semibold tracking-[0.2px]';
export const drawStudioLinkHintCls = 'mt-3 whitespace-nowrap';

export function dropzoneCls(over) {
  const base = 'flex flex-col items-center justify-center gap-2 py-8 px-4 border-[1.5px] border-dashed rounded-md text-center cursor-pointer transition-[all_200ms_ease] bg-surface-600';
  return over
    ? `${base} border-gold bg-[rgba(245,166,35,0.06)] text-onsurface-200`
    : `${base} border-line-strong text-onsurface-500 hover:border-gold hover:bg-[rgba(245,166,35,0.06)] hover:text-onsurface-200`;
}
export const dropzonePreviewCls = 'w-16 h-16 object-contain rounded-sm';
export const linkBtnCls = 'self-start bg-transparent border-none text-red-light text-[11px] font-semibold cursor-pointer p-0 underline';

export function badgeBtnCls(active) {
  const base = 'flex items-center gap-2 py-2 px-[14px] border-[1.5px] text-[11px] font-semibold cursor-pointer rounded-full transition-[all_200ms_ease]';
  return active
    ? `${base} bg-gold border-gold text-bg-800`
    : `${base} bg-surface-600 border-line text-onsurface-400 hover:border-onsurface-400 hover:text-onsurface-100`;
}
export const badgeThumbCls = 'w-5 h-5 object-contain bg-light-100 rounded-[4px] p-[2px] flex-shrink-0';

export const layerListCls = 'flex flex-col gap-[6px]';
export function layerRowCls(dragging) {
  const base = 'flex items-center gap-2 py-[9px] px-3 bg-surface-600 border border-line rounded-md cursor-grab transition-[border-color_150ms_ease,opacity_150ms_ease] hover:border-line-strong';
  return dragging ? `${base} opacity-40` : base;
}
export const layerGripCls = 'text-onsurface-700 flex flex-shrink-0';
export function layerNameCls(hidden) {
  return `flex-1 text-[12px] font-semibold ${hidden ? 'text-onsurface-700 line-through' : 'text-onsurface-200'}`;
}
export const layerEyeCls = 'flex items-center justify-center bg-transparent border-none text-onsurface-500 cursor-pointer p-[2px] hover:text-gold';

export const stateBoxCls = 'flex flex-col gap-2 bg-surface-600 border border-line rounded-md p-4';
export const stateRowCls = 'flex items-center justify-between text-[11.5px]';
export const stateRowLabelCls = 'text-onsurface-600 font-semibold';
export const stateValueCls = "flex items-center gap-[6px] text-onsurface-200 font-bold [font-family:'Courier_New',monospace]";
export const stateSwatchCls = 'w-[10px] h-[10px] rounded-full border border-[rgba(255,255,255,0.2)] inline-block';

export const inputCls = 'bg-surface-600 border border-line text-onsurface-100 py-[10px] px-4 text-[0.9rem] outline-none w-full transition-[border-color_150ms_ease] rounded-sm placeholder:text-onsurface-600';
export const inputHexCls = "[font-family:'Courier_New',monospace] tracking-[1px]";

/* Color spectrum picker */
export const colorPickerCls = 'flex flex-col gap-3';
export const colorPickerSvCls = 'relative w-full h-[130px] rounded-sm border border-line cursor-crosshair [touch-action:none] overflow-hidden';
export const colorPickerSvHandleCls = 'absolute w-4 h-4 rounded-full border-2 border-light-100 shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_1px_4px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2 pointer-events-none';
export const colorPickerHueCls = 'relative w-full h-[14px] rounded-full border border-line cursor-pointer [touch-action:none] bg-[linear-gradient(to_right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)]';
export const colorPickerHueHandleCls = 'absolute top-1/2 w-[18px] h-[18px] rounded-full border-2 border-light-100 shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_1px_4px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2 pointer-events-none';
export const colorPickerHexRowCls = 'flex items-center gap-3';
export const colorPickerSwatchCls = 'w-9 h-9 rounded-sm border border-line flex-shrink-0';

/* DrawStudio-specific (draw__*) */
export const drawHiddenPreviewCls = 'absolute w-0 h-0 overflow-hidden pointer-events-none';
export const drawBackLinkCls = 'inline-flex items-center gap-[6px] bg-transparent border-none p-0 cursor-pointer text-onsurface-300 font-body text-[13px] font-bold no-underline transition-[color_150ms_ease] hover:text-gold';
export const drawTitleCls = 'font-body font-bold text-[14px] tracking-[0.5px] text-onsurface-200';
export const drawToastCls = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold text-[13px] tracking-[0.5px] text-center pointer-events-none z-[3] animate-[drawToastPop_220ms_ease]';
export const drawLoadingCls = 'absolute inset-0 flex items-center justify-center bg-canvas-light rounded-lg text-onsurface-700 font-body text-[13px] z-[2]';
export const drawHintCls = 'mt-3 text-[12px] text-onsurface-600 text-center whitespace-nowrap';
export const drawLayerListCls = 'flex flex-col gap-2';
export function drawLayerRowCls(active) {
  const base = 'flex items-center justify-between gap-2 py-2 px-3 bg-surface-600 border-[1.5px] border-line rounded-sm text-onsurface-400 text-[12px] cursor-pointer transition-[all_180ms_ease] hover:border-onsurface-400 hover:text-onsurface-100';
  return active ? `${base} border-onsurface-100 text-onsurface-100 bg-surface-500` : base;
}
export const drawLayerRowSpanCls = 'overflow-hidden text-ellipsis whitespace-nowrap';
export const drawLayerRowActionsCls = 'flex items-center gap-2 flex-shrink-0';
export const drawLayerRowBtnCls = 'flex items-center justify-center bg-transparent border-none text-inherit cursor-pointer flex-shrink-0 hover:text-red-light [&>svg]:w-4 [&>svg]:h-4';
export const drawShapeGridCls = 'grid grid-cols-3 gap-2';
export const drawShapeBtnCls = 'flex flex-col items-center gap-[6px] py-3 px-2 bg-surface-600 border-[1.5px] border-line text-onsurface-500 font-body text-[9.5px] font-semibold tracking-[0.2px] text-center cursor-pointer rounded-lg transition-[all_180ms_ease] hover:border-onsurface-100 hover:text-onsurface-100 hover:bg-surface-500 hover:-translate-y-0.5 [&:hover_.draw-shape-icon]:text-onsurface-100';
export const drawShapeIconCls = 'draw-shape-icon w-7 h-7 text-onsurface-400';
export const drawShapeBtnSpanCls = 'overflow-hidden text-ellipsis whitespace-nowrap max-w-full';
