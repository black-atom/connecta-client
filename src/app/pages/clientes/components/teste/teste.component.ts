import { Endereco } from './../../../../models/cliente.interface';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  enderecos = [
    {
      rua: 'Vitor Lima',
      numero: 21
    },
    {
      rua: 'Rafael Neves',
      numero: 21
    },
    {
      rua: 'Alexandre dos Santos',
      numero: 21
    }
  ];

  address;

  form: FormGroup = new FormGroup({
    endereco: new FormGroup({
      rua: new FormControl(''),
      numero: new FormControl('')
    })
  });

  constructor() { }

  ngOnInit() {
    this.form.get('endereco').valueChanges.subscribe(endereco => console.log("endereco"));
  }

  mudanca(endereco) {
    console.log(endereco);
  }

}
