import { TestBed } from '@angular/core/testing';

import { PersonaReferenciaService } from './persona-referencia.service';

describe('PersonaReferenciaService', () => {
  let service: PersonaReferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaReferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
