import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Unhandled render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface-800 text-onsurface-100 text-center px-6">
        <span className="text-[4rem]">⚠️</span>
        <h1 className="font-heading text-[2rem] font-bold">Something went wrong</h1>
        <p className="text-onsurface-500 max-w-[420px]">
          An unexpected error occurred. Try reloading the page. If the problem persists, please contact support.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-red py-3 px-8 text-[13px]"
        >
          Reload
        </button>
      </div>
    );
  }
}
