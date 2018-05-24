import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoTecnicosComponent } from './monitoramento-tecnicos.component';

describe('MonitoramentoTecnicosComponent', () => {
  let component: MonitoramentoTecnicosComponent;
  let fixture: ComponentFixture<MonitoramentoTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
