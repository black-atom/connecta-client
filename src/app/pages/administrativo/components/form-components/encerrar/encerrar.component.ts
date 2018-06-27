import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encerramento',
  templateUrl: './encerrar.component.html',
  styleUrls: ['./encerrar.component.scss']
})
export class EncerramentoComponent implements OnInit {

  public showCard: boolean;

  ngOnInit(): void {
    this.showCard = false;
  }

  collapseCard(): void {
    this.showCard === true ? this.showCard = false : this.showCard = true;
    console.log(this.showCard);
  }

}
