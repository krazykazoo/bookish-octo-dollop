import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Photo from '../models/photo';
import ApiResponse from '../models/api-response';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  $photos: BehaviorSubject<Photo[]> = new BehaviorSubject([]);

  constructor(private readonly http: HttpClient) { }


  getPhotosFromCuriosityByDate(date: string) : void {
    this.http.get<ApiResponse>(`${environment.marsRoverCuriosityUrl}?earth_date=${date}&api_key=${environment.apiKey}`).subscribe((response: ApiResponse) => {
      this.$photos.next(response.photos);
    });
  }

  getPhotos() : Observable<Photo[]> {
    return this.$photos.asObservable();
  }
}
