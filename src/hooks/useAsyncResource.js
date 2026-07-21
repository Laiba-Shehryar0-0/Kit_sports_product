import { useEffect, useState, useCallback } from 'react';

/** Runs an async fetcher on mount (and whenever deps change), exposing { data, loading, error, reload }. */
export default function useAsyncResource(fetchFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const load = useCallback(() => {
    let cancelled = false;
    setState(prev => ({ ...prev, loading: true, error: null }));
    fetchFn()
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(error => { if (!cancelled) setState({ data: null, loading: false, error }); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => load(), [load]);

  return { ...state, reload: load };
}
