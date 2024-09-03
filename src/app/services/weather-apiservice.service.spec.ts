import { TestBed } from '@angular/core/testing';

import { WeatherAPIServiceService } from './weather-apiservice.service';

describe('WeatherAPIServiceService', () => {
  let service: WeatherAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
