import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSpace',
})
export class ToSpacePipe implements PipeTransform {
  transform(str: string, ...args: string[]): string {
    let strToReturn: string = str;
    for (let i = 0; i < args.length; i++) {
      strToReturn = strToReturn.replace(args[i], ' ');
    }
    return strToReturn;
  }
}
