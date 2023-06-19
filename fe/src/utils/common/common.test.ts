import { removeEmptyKeyValues, getType, Type } from './common';
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

describe('type check', () => {
  test('Array를 넣으면 Array로 타입이 나와야한다.', () => {
    const arr = [1];

    expect(getType(arr)).toEqual(Type.Array);
  });

  test('String을 넣으면 String로 타입이 나와야한다.', () => {
    const str = '1';
    expect(getType(str)).toEqual(Type.String);
  });

  test('Number을 넣으면 Number로 타입이 나와야한다.', () => {
    const num = 1;

    expect(getType(num)).toEqual(Type.Number);
  });

  test('FormData을 넣으면 FormData로 타입이 나와야한다.', () => {
    const formData = new FormData();

    expect(getType(formData)).toEqual(Type.FormData);
  });

  test('Literal Object을 넣으면 Literal Object로 타입이 나와야한다.', () => {
    const obj = { a: 'a' };

    expect(getType(obj)).toEqual(Type.LiteralObject);
  });
});
