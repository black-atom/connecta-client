import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, args?: any) {
    let valor = value.split(' ')[args];
    return valor;
  }
}
