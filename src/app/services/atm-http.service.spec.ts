/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtmHttpService } from './atm-http.service';

describe('Service: AtmHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtmHttpService]
    });
  });

  it('should ...', inject([AtmHttpService], (service: AtmHttpService) => {
    expect(service).toBeTruthy();
  }));
});
