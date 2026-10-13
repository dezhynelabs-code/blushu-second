import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-[#202A26]">Something went wrong</h2>
          <p className="text-sm text-[#69736E] max-w-md">
            {this.state.error?.message || 'An unexpected issue occurred while loading this section.'}
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#087F68] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
            <a
              href="/"
              className="px-5 py-2.5 bg-white border border-[#E3ECE7] text-[#202A26] text-xs font-bold rounded-xl flex items-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
