import { useState, ChangeEvent } from 'react';

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = target as HTMLInputElement | HTMLTextAreaElement;
    setValue(value);
  };

  const inputProps = {
    value,
    setValue: setValue,
    onChange: handleChange,
  };

  return inputProps;
}
