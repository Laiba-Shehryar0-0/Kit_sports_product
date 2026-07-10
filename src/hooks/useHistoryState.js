import { useState, useCallback } from 'react';

/** Generic undo/redo history stack for a piece of state. */
export default function useHistoryState(initial) {
  const [state, setState] = useState(() => ({
    past: [],
    present: typeof initial === 'function' ? initial() : initial,
    future: [],
  }));

  const set = useCallback((updater) => {
    setState(s => {
      const next = typeof updater === 'function' ? updater(s.present) : updater;
      if (next === s.present) return s;
      return { past: [...s.past, s.present], present: next, future: [] };
    });
  }, []);

  const undo = useCallback(() => {
    setState(s => {
      if (s.past.length === 0) return s;
      const previous = s.past[s.past.length - 1];
      return { past: s.past.slice(0, -1), present: previous, future: [s.present, ...s.future] };
    });
  }, []);

  const redo = useCallback(() => {
    setState(s => {
      if (s.future.length === 0) return s;
      const [next, ...rest] = s.future;
      return { past: [...s.past, s.present], present: next, future: rest };
    });
  }, []);

  return [state.present, set, { undo, redo, canUndo: state.past.length > 0, canRedo: state.future.length > 0 }];
}
