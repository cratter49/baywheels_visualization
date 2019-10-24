// Built using example: https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way

import { useState } from 'react';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};