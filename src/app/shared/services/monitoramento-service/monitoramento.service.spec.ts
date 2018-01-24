import { TestBed, inject } from '@angular/core/testing';

import { MonitoramentoService } from './monitoramento.service';

describe('MonitoramentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitoramentoService]
    });
  });

  it('should be created', inject([MonitoramentoService], (service: MonitoramentoService) => {
    expect(service).toBeTruthy();
  }));
});
