import { useSearchParams } from 'react-router-dom';
import KitCanvasEditor from '../customize/KitCanvasEditor';

/** "Edit your kit" — draws directly on the kit surface; the point is the finished, edited kit, not a logo. */
export default function KitEditor() {
  const [searchParams] = useSearchParams();
  const side = searchParams.get('side') === 'back' ? 'back' : 'front';
  return <KitCanvasEditor mode="kit" initialSide={side} />;
}
