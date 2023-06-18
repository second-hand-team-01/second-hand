import { removeEmptyKeyValues } from './common';
test('object property 중 value가 null 혹은 undefined인 경우 해당 property를 삭제한다.', () => {
  const objWithEmptyValue = {
    a: 'a',
    b: 'b',
    c: undefined,
    d: null,
  };
  const expectedResult = {
    a: 'a',
    b: 'b',
  };
  expect(JSON.stringify(removeEmptyKeyValues(objWithEmptyValue))).toEqual(
    JSON.stringify(expectedResult)
  );
});
