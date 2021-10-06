import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSpace',
})
export class ToSpacePipe implements PipeTransform {
  transform(str: string | undefined, ...args: string[]): string {
    let strToReturn: string | undefined = str;
    if (strToReturn === undefined) return '';
    for (let i = 0; i < args.length; i++) {
      strToReturn = strToReturn.replace(args[i], ' ');
    }
    return strToReturn;
  }
}
