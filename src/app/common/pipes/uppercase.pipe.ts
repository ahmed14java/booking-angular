import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const transformedValue = value.toUpperCase();
    return transformedValue;
  }

}
