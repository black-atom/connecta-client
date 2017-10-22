import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rgCnpjCpf'
})
export class CnpjCpfPipe implements PipeTransform {

  transform(value:string){
    if(value){
         value = value.toString();
         // CPF pipe
         if(value.length === 11){
             return value.substring(0,3).concat(".")
             .concat(value.substring(3,6))
             .concat(".")
             .concat(value.substring(6,9))
             .concat("-")
             .concat(value.substring(9,11))
         }
         else if(value.length === 14) {
          // CNPJ pipe
          return value.substring(0,2).concat(".")
            .concat(value.substring(2,5))
            .concat(".")
            .concat(value.substring(5,8))
            .concat("/")
            .concat(value.substring(8,12))
            .concat("-")
            .concat(value.substring(12,14))
      } 
       // RG pipe
      else if(value.length === 9) {
        return value.substring(0,2).concat(".")
            .concat(value.substring(2,5))
            .concat(".")
            .concat(value.substring(5,8))
            .concat("-")
            .concat(value.substring(8,9))
    }  
     }
     return value;
 }
}