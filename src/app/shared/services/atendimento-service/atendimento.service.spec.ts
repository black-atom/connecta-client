import { TestBed, inject } from '@angular/core/testing';

import { AtendimentoServiceService } from './atendimento-service.service';

describe('AtendimentoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtendimentoServiceService]
    });
  });

  it('should be created', inject([AtendimentoServiceService], (service: AtendimentoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
