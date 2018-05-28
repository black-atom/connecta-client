import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { categoriaProdutos } from './../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit {

  public formProduto: FormGroup;
  public categoriaProdutos = categoriaProdutos;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    return this.formProduto = this.fb.group({
      descricao: ['', Validators.required],
      modelo: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      pecas: this.fb.array([]),
      valor: ['', Validators.required]
    });
  }

  pecaForm() {
    return this.fb.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }


  cadastrarProduto(produto) {
    console.log(produto);
  }
}
