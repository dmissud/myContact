import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSimple'
})
export class DateSimplePipe implements PipeTransform {

  transform(value: Date, ...args: any[]): string {
    return value.toLocaleDateString();
  }

}
