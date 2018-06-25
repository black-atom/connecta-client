import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associar-map',
  templateUrl: './associar-map.component.html',
  styleUrls: ['./associar-map.component.scss']
})
export class AssociarMapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
