import React, {
  ReactNode,
  ErrorInfo,
  ReactElement,
  FC,
  Component,
} from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Loading, Error } from '@commons/index';

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackRender: ({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => ReactElement;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return this.props.fallbackRender({
        error: this.state.error!,
        resetErrorBoundary: () =>
          this.setState({ error: null, errorInfo: null }),
      });
    }
    return this.props.children;
  }
}

interface ReactQuerySuspenseProps {
  children: ReactNode;
}

export const ReactQuerySuspense: FC<ReactQuerySuspenseProps> = ({
  children,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Error
              onClick={() => {
                resetErrorBoundary();
                reset();
              }}
            >
              {error.message || '에러가 발생했습니다. 다시 시도해주세요'}
            </Error>
          )}
        >
          <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
