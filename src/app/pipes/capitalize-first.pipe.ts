import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(str: string): string {
    const strArr: string[] = str.split(' ');
    if (strArr.length > 1) {
      for (let i = 0; i < strArr.length; i++) {
        strArr[i] =
          strArr[i].charAt(0).toUpperCase() +
          strArr[i].slice(1, strArr[i].length).toLowerCase();
      }
      return strArr.join(' ');
    } else {
      str =
        str.charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase();
      return str;
    }
  }
}
