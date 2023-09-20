import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toBoolean'
})
export class ToBooleanPipe implements PipeTransform {

  transform(value: string): string {
    // @ts-ignore
    if (value === true ||value === '1') {
      return 'SI';
    } else {
      return 'NO';
    }
  }

}
