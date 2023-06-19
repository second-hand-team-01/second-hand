export const removeEmptyKeyValues = (object: object) => {
  const copiedObject = { ...object };
  Object.entries(copiedObject).forEach((set) => {
    const [key, value] = set;
    if (value === undefined || value === null) delete copiedObject[key];
  });
  return copiedObject;
};

export enum Type {
  LiteralObject = 'Literal Object',
  FormData = 'FormData',
  Array = 'Array',
  String = 'String',
  Number = 'Number',
  Unknown = 'Unknown',
}

export const getType = (obj: unknown): Type => {
  const toString = Object.prototype.toString.call(obj);
  switch (toString) {
    case '[object Object]':
      return Type.LiteralObject;
    case '[object String]':
      return Type.String;
    case '[object Number]':
      return Type.Number;
    case '[object Array]':
      return Type.Array;
    case '[object FormData]':
      return Type.FormData;
    default:
      return Type.Unknown;
  }
};
