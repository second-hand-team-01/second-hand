import { renderHook } from '@testing-library/react-hooks';
import { FetchProps, customFetch } from '@services/apis/apis';
import useData from './useData';

jest.mock('@services/apis/apis', () => ({
  customFetch: jest.fn(),
}));

test('useData를 호출하면 정상적으로 data를 리턴해야 한다.', async () => {
  const fakeData = { data: { test: 'test' } };

  (customFetch as jest.Mock).mockResolvedValue(fakeData);

  const fetchProps: FetchProps<null> = {
    method: 'GET',
    path: '/path',
  };

  const { result, waitForNextUpdate } = renderHook(() => useData(fetchProps));
  await waitForNextUpdate();
  expect(result.current).toEqual(fakeData);
});
