import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import Photo from 'src/app/models/photo';
import { NasaService } from 'src/app/services/nasa.service';

import { PhotosComponent } from './photos.component';


class MockNasaService {
  getPhotos(): Observable<Photo[]>  {
    return of([]);
  }
}


describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let nasaService: NasaService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: NasaService, useClass: MockNasaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nasaService = TestBed.inject(NasaService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to getPhotos and set photos', () => {
      const nasaSpy = spyOn(nasaService, 'getPhotos').and.returnValue(of([new Photo()]));

      component.ngOnInit();

      expect(nasaSpy).toHaveBeenCalled();
      expect(component.photos.length).toEqual(1);
    });
  });

  describe('goToPhoto', () => {
    it('should call router to navigate to photo/id', () => {
      const routerSpy = spyOn(router, 'navigate');

      component.goToPhoto('1');

      expect(routerSpy).toHaveBeenCalledWith(['photo/1']);
    });
  });
});
