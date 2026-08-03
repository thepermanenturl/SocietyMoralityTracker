import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error in SocietyMoralityTracker:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="p-3 bg-rose-950 border border-rose-800 rounded-2xl text-rose-400 font-bold">
            ⚠️ Morality Engine Encountered a Component Exception
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            {this.state.error?.message || "An unexpected error occurred. Static components are preserved."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Recover & Reload UI
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
