import { capitalize, snakeCase } from 'lodash';

export const useFromNameToText: (name: string) => string = name => {
  const text = capitalize(snakeCase(name));

  return text;
};
