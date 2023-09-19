import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryErrorResetBoundary,
  QueryKey,
  useQuery,
} from '@tanstack/react-query';
import { Loading } from '../Loading/Loading';

export const ReactQuerySuspense = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              에러 발생!
              <button onClick={() => resetErrorBoundary()}>새로고침</button>
            </div>
          )}
        >
          <Suspense fallback={<Loading></Loading>}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
