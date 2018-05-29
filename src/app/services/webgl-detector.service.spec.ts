import { TestBed, inject } from '@angular/core/testing';

import { WebglDetectorService } from './webgl-detector.service';

describe('WebglDetectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebglDetectorService]
    });
  });

  it('should be created', inject([WebglDetectorService], (service: WebglDetectorService) => {
    expect(service).toBeTruthy();
  }));
});
