import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-card-tecnico-detail',
  templateUrl: './card-tecnico-detail.component.html',
  styleUrls: ['./card-tecnico-detail.component.scss']
})
export class CardTecnicoDetailComponent implements OnInit {

  @Input()
  tecnicoDetail;

  constructor() { }

  ngOnInit() {
  }

}
