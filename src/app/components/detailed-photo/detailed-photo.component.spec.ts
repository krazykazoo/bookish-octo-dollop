import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPhotoComponent } from './detailed-photo.component';

describe('DetailedPhotoComponent', () => {
  let component: DetailedPhotoComponent;
  let fixture: ComponentFixture<DetailedPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
