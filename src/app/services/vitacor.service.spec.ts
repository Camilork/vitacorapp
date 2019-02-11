import { TestBed, inject } from '@angular/core/testing';

import { VitacorService } from './vitacor.service';

describe('VitacorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VitacorService]
    });
  });

  it('should be created', inject([VitacorService], (service: VitacorService) => {
    expect(service).toBeTruthy();
  }));
});
