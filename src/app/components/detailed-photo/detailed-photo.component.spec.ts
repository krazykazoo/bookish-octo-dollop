import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import Photo from 'src/app/models/photo';
import { NasaService } from 'src/app/services/nasa.service';

import { DetailedPhotoComponent } from './detailed-photo.component';

class MockNasaService {
  getPhotos(): Observable<Photo[]> {
    return of([]);
  }
}

describe('DetailedPhotoComponent', () => {
  let component: DetailedPhotoComponent;
  let fixture: ComponentFixture<DetailedPhotoComponent>;
  let nasaService: NasaService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPhotoComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: NasaService, useClass: MockNasaService},
        {provide: ActivatedRoute, useValue: {
          params: of({id: 1})
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nasaService = TestBed.inject(NasaService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to nasa service getPhotos, set photos on component, and call filterPhotos', () => {
      const componentSpy = spyOn(component, 'filterPhotos');
      const nasaSpy = spyOn(nasaService, 'getPhotos').and.returnValue(of([new Photo()]));

      component.ngOnInit();

      expect(nasaSpy).toHaveBeenCalled();
      expect(componentSpy).toHaveBeenCalled();
      expect(component.photos.length).toEqual(1);
    });
  });

  describe('filterPhotos', () => {
    it('should filter photos by id and set photo if filtered to one value', () => {
      const photo = new Photo();
      photo.id = 1;
      component.photos = [photo];

      component.filterPhotos();

      expect(component.photo).toEqual(photo);
    });

    it('should filter photos by id and set photo to undefined if multiple values remain', () => {
      const photo1 = new Photo();
      photo1.id = 1;
      const photo2 = new Photo();
      photo2.id = 1;
      component.photos = [photo1, photo2];

      component.filterPhotos();

      expect(component.photo).toBeUndefined();
    });
  });

  describe('goBack', () => {
    it('should call router to navigate to blank route', () => {
      const routerSpy = spyOn(router, 'navigate');

      component.goBack();

      expect(routerSpy).toHaveBeenCalledWith(['']);
    });
  });
});
