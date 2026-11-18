import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Erreur de rendu de l’application', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas px-6 py-16">
        <div className="max-w-lg text-center space-y-4">
          <p className="font-mono text-xs font-medium text-ocean">
            Une erreur est survenue
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink">
            La page n’a pas pu s’afficher
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            Merci de rechargez la page. Si le problème persiste, contactez le restaurant
            au +269 773 00 31.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex px-5 py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover transition-colors cursor-pointer"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }
}
