import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import Rover from 'src/app/models/rover';
import { NasaService } from 'src/app/services/nasa.service';

import { HomeComponent } from './home.component';

class MockNasaService {
  getLoading(): Observable<boolean>  {
    return of();
  }

  getMorePagesStatus(): Observable<boolean>  {
    return of();
  }

  getRover(): Rover {
    return undefined;
  }

  setRover(): void {}

  getPhotosByDate(): void {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let nasaService: NasaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: NasaService, useClass: MockNasaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nasaService = TestBed.inject(NasaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the rover list and selected rover', () => {
      component.ngOnInit();
      expect(component.rovers.length).toEqual(3);
      expect(component.rovers[0].name).toEqual('Curiosity');
      expect(component.rovers[1].name).toEqual('Opportunity');
      expect(component.rovers[2].name).toEqual('Spirit');

      expect(component.rover.name).toEqual('Curiosity');
    });

    it('should subscribe to nasa service loading', () => {
      const loadingSpy = spyOn(nasaService, 'getLoading').and.returnValue(of(true));

      component.ngOnInit();

      expect(loadingSpy).toHaveBeenCalledTimes(1);
      expect(component.loading).toBeTrue();
    });

    it('should subscribe to nasa service morePages status', () => {
      const getMorePagesStatusSpy = spyOn(nasaService, 'getMorePagesStatus').and.returnValue(of(true));

      component.ngOnInit();

      expect(getMorePagesStatusSpy).toHaveBeenCalledTimes(1);
      expect(component.morePages).toBeTrue();
    });

    it('should set rover on component if nasa service has rover defined', () => {
      const rover = new Rover();
      spyOn(nasaService, 'getRover').and.returnValue(rover);

      component.ngOnInit();

      expect(component.rover).toEqual(rover);
    });


    it('should set rover on nasa service if nasa service has rover undefined', () => {
      const rover = new Rover();
      rover.name = 'Curiosity';

      const nasaSpy = spyOn(nasaService, 'setRover');
      spyOn(nasaService, 'getRover').and.returnValue(undefined);

      component.ngOnInit();

      expect(nasaSpy).toHaveBeenCalledWith(rover);
    });
  });

  describe('getPhotos', () => {
    it('should call nasa service to getPhotosByDate with search mode', () => {
      const nasaSpy = spyOn(nasaService, 'getPhotosByDate');

      component.getPhotos();

      expect(nasaSpy).toHaveBeenCalledWith(component.date, 'search');
    });
  });


  describe('loadMorePhotos', () => {
    it('should call nasa service to getPhotosByDate with more mode', () => {
      const nasaSpy = spyOn(nasaService, 'getPhotosByDate');

      component.loadMorePhotos();

      expect(nasaSpy).toHaveBeenCalledWith(component.date, 'more');
    });
  });


  describe('roverSelect', () => {
    it('should set rover value and call nasa service with value of rover from rover list', () => {
      const event = {
        target: {
          value: 'Opportunity'
        }
      };
      const nasaSpy = spyOn(nasaService, 'setRover');
      component.roverSelect(event);

      expect(component.rover.name).toEqual('Opportunity');
      expect(nasaSpy).toHaveBeenCalledWith(component.rover);
    });
  });
});
