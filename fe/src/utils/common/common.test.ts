import {
  removeEmptyKeyValues,
  getType,
  Type,
  convertDateToTimeStamp,
  timeInfo,
  timestampSuffix,
} from './common';
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

describe('timestamp check', () => {
  const { sec, min, hour, day, week, month, year } = timeInfo;
  test('10초 전 테스트', () => {
    const secDiff = new Date(new Date().getTime() - sec.ms * 10);

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      10 + sec.text + timestampSuffix
    );
  });

  test('1분 전 테스트', () => {
    const secDiff = new Date(new Date().getTime() - min.ms);

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      1 + min.text + timestampSuffix
    );
  });

  test('4시간 전 테스트', () => {
    const secDiff = new Date(new Date().getTime() - hour.ms * 4);

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      4 + hour.text + timestampSuffix
    );
  });

  test('1일 전 테스트', () => {
    const secDiff = new Date(new Date().getTime() - (day.ms * 1 + hour.ms * 3));

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      1 + day.text + timestampSuffix
    );
  });

  test('1주 전 테스트', () => {
    const secDiff = new Date(
      new Date().getTime() - (week.ms * 1 + day.ms * 1 + hour.ms * 3)
    );

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      1 + week.text + timestampSuffix
    );
  });

  test('1달 전 테스트', () => {
    const secDiff = new Date(
      new Date().getTime() - (day.ms * 40 + hour.ms * 3)
    );

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      1 + month.text + timestampSuffix
    );
  });

  test('1년 전 테스트', () => {
    const secDiff = new Date(
      new Date().getTime() - (day.ms * 380 + hour.ms * 3)
    );

    expect(convertDateToTimeStamp(secDiff)).toEqual(
      1 + year.text + timestampSuffix
    );
  });
});
