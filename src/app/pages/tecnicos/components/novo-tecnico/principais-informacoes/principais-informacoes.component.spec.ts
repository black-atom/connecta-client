import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaisInformacoesComponent } from './principais-informacoes.component';

describe('PrincipaisInformacoesComponent', () => {
  let component: PrincipaisInformacoesComponent;
  let fixture: ComponentFixture<PrincipaisInformacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipaisInformacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipaisInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
