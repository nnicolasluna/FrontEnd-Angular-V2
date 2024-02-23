import { TestBed } from '@angular/core/testing';

import { MetodoGenericoService } from './metodo-generico.service';

describe('MetodoGenericoService', () => {
  let service: MetodoGenericoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoGenericoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
