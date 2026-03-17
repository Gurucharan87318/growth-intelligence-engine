"use client";

import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallbackTitle?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          <p className="font-semibold">
            {this.props.fallbackTitle ?? "This section failed to load."}
          </p>
          <p className="mt-2">
            Refresh the page to retry. Other dashboard sections remain available.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
