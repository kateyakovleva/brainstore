import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'wrapShortWords', standalone: true})
export class WrapShortWordsPipe implements PipeTransform {
  transform(text: string | undefined): string {
    if (!text) return '';

    const words = text.split(' ');
    let result = '';

    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i];
      const isLastWord = i === words.length - 1;

      if (isLastWord) {
        result += currentWord;
        continue;
      }

      const nextWord = words[i + 1];
      const isNextWordShort = nextWord.length <= 3;
      const isNextWordNotLast = i + 1 < words.length - 1;

      result += currentWord + (isNextWordShort && isNextWordNotLast ? '&nbsp;' : ' ');
    }

    return result;
  }
}
