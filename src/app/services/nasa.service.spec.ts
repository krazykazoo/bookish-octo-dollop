import { TestBed } from '@angular/core/testing';

import { NasaService } from './nasa.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import Rover from '../models/rover';
import { environment } from 'src/environments/environment';
import ApiResponse from '../models/api-response';
import Photo from '../models/photo';

describe('NasaService', () => {
  let service: NasaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(NasaService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPhotosByDate', () => {
    it('should emit to loading subject', () => {
      let index = 0;
      const expected = [false, true, false];
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);

      service.getLoading().subscribe((value) => {
        expect(value).toEqual(expected[index++]);
      });
    });

    it('should use curiosity url for rover with name curiosity', () => {
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);
    });

    it('should use opportunity url for rover with name opportunity', () => {
      const rover = new Rover();
      rover.name = 'Opportunity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverOpportunityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);
    });


    it('should use spirit url for rover with name spirit', () => {
      const rover = new Rover();
      rover.name = 'Spirit';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverSpiritUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);
    });


    it('should call with page 2 for first more call', () => {
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'more');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=2`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);
    });


    it('should emit false to more pages with result based on length of response', () => {
      let index = 0;
      const expected = [false, true, false];
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);

      service.getMorePagesStatus().subscribe((value) => {
        expect(value).toEqual(expected[index++]);
      });
    });


    it('should emit true to more pages with result based on length of response', () => {
      let index = 0;
      const expected = [true];
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [
        new Photo(), new Photo(), new Photo(), new Photo(), new Photo(),
        new Photo(), new Photo(), new Photo(), new Photo(), new Photo(),
        new Photo(), new Photo(), new Photo(), new Photo(), new Photo(),
        new Photo(), new Photo(), new Photo(), new Photo(), new Photo(),
        new Photo(), new Photo(), new Photo(), new Photo(), new Photo(),
      ];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);

      service.getMorePagesStatus().subscribe((value) => {
        expect(value).toEqual(expected[index++]);
      });
    });

    it('should emit photos from response if page is 1', () => {
      let index = 0;
      const expected = [[new Photo()]];
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);

      service.getPhotos().subscribe((value) => {
        expect(value).toEqual(expected[index++]);
      });
    });

    it('should emit photos from response merged with deconstructed photos already in subject', () => {
      let index = 0;
      const expected = [[new Photo(), new Photo()]];
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'more');

      let request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=2`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);

      service.getPhotosByDate('date', 'more');

      request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=3`);
      expect(request.request.method).toEqual('GET');
      request.flush(response);

      service.getPhotos().subscribe((value) => {
        expect(value).toEqual(expected[index++]);
      });
    });

    it('should emit to loading subject even on error', () => {
      let index = 0;
      const expected = [false, true, false];
      const rover = new Rover();
      rover.name = 'Curiosity';
      service.setRover(rover);
      const response = new ApiResponse();
      response.photos = [new Photo()];

      service.getPhotosByDate('date', 'search');

      const request = http.expectOne(`${environment.marsRoverCuriosityUrl}?earth_date=date&api_key=${environment.apiKey}&page=1`);
      expect(request.request.method).toEqual('GET');
      request.error(new ErrorEvent('404'));

      service.getLoading().subscribe((value) => {
        expect(value).toEqual(expected[index++]);
      });
    });
  });

  describe('getPhotos', () => {
    it('should return photos subject as observable', () => {
      const observable = service.getPhotos();

      expect(observable).toBeTruthy();
      expect(observable).toBeInstanceOf(Observable);
    });
  });

  describe('getLoading', () => {
    it('should return loading subject as observable', () => {
      const observable = service.getLoading();

      expect(observable).toBeTruthy();
      expect(observable).toBeInstanceOf(Observable);
    });
  });

  describe('getMorePagesStatus', () => {
    it('should return morePages subject as observable', () => {
      const observable = service.getMorePagesStatus();

      expect(observable).toBeTruthy();
      expect(observable).toBeInstanceOf(Observable);
    });
  });

  describe('setRover/getRover', () => {
    it('should update the rover field', () => {
      const rover = new Rover();

      service.setRover(rover);
      expect(service.getRover()).toEqual(rover);
    });
  });
});
