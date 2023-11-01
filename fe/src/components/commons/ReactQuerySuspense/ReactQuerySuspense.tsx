import React, {
  ReactNode,
  ErrorInfo,
  ReactElement,
  FC,
  Component,
  Suspense,
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
        error: this.state.error as Error,
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
              button="새로고침"
            >
              {error.message || '에러가 발생했습니다. 다시 시도해주세요'}
            </Error>
          )}
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
