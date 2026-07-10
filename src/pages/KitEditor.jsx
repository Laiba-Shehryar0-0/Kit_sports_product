import KitCanvasEditor from '../customize/KitCanvasEditor';

/** "Edit your kit" — draws directly on the kit surface; the point is the finished, edited kit, not a logo. */
export default function KitEditor() {
  return <KitCanvasEditor mode="kit" />;
}
