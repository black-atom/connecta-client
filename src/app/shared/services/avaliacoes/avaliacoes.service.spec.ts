import { TestBed, inject } from '@angular/core/testing';

import { AvaliacoesService } from './avaliacoes.service';

describe('AvaliacoesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvaliacoesService]
    });
  });

  it('should be created', inject([AvaliacoesService], (service: AvaliacoesService) => {
    expect(service).toBeTruthy();
  }));
});
