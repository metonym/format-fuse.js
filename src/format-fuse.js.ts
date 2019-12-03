import { FuseResultWithMatches } from 'fuse.js';
import set from 'set-value';
import strind from 'strind';

function formatFuseJs<T>(results: FuseResults<T>): FormattedResults<T> {
  const matched: FormattedResults<T> = [];

  results.forEach(({ item, matches }, index) => {
    matched.push(item);
    matches.forEach(({ indices, key, value }: IFuzzyResult) => {
      const output = strind(value, indices, data => ({ text: data.chars, matches: data.matches }));
      const formattedResult = output.matched as IFormattedResult[];
      const match = matched[index] as IFormatted;

      if (key.split('.').length > 1) {
        set(match, key, formattedResult);
      } else {
        match[key] = formattedResult;
      }
    });
  });

  return matched;
}

type FuseResults<T> = ReadonlyArray<FuseResultWithMatches<T>>;
type FormattedResults<T> = Array<T | IFormatted>;

interface IFormattedResult {
  text: string;
  matches: boolean;
}

interface IFormatted {
  [key: string]: IFormattedResult[];
}

interface IFuzzyResult {
  arrayIndex: number;
  indices: Array<[number, number]>;
  key: string;
  value: string;
}

export default formatFuseJs;
