import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Photo from '../models/photo';
import ApiResponse from '../models/api-response';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Rover from '../models/rover';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private $photos: BehaviorSubject<Photo[]> = new BehaviorSubject([]);
  private $loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private $morePages: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private page = 1;
  private rover: Rover = undefined;

  constructor(private readonly http: HttpClient) { }


  getPhotosByDate(date: string, mode: string): void {
    this.$loading.next(true);
    if (mode === 'search') {
      this.$photos.next([]);
      this.page = 1;
    }
    else if (mode === 'more') {
      this.page++;
    }
    let url;
    if (this.rover.name === 'Curiosity') {
      url = environment.marsRoverCuriosityUrl;
    }
    else if (this.rover.name === 'Opportunity') {
      url = environment.marsRoverOpportunityUrl;
    }
    else if (this.rover.name === 'Spirit') {
      url = environment.marsRoverSpiritUrl;
    }
    const urlWithParams = `${url}?earth_date=${date}&api_key=${environment.apiKey}&page=${this.page}`;
    this.http.get<ApiResponse>(urlWithParams).subscribe((response: ApiResponse) => {
      if (this.page === 1) {
        this.$morePages.next(true);
        this.$photos.next(response.photos);
      }
      else {
        this.$photos.next([...this.$photos.value, ...response.photos]);
      }
      if (response.photos.length < 25) {
        this.$morePages.next(false);
      }
      this.$loading.next(false);
    }, (error) => {
      console.log(error);
      this.$loading.next(false);
    });
  }

  getPhotos(): Observable<Photo[]> {
    return this.$photos.asObservable();
  }

  getLoading(): Observable<boolean>  {
    return this.$loading.asObservable();
  }

  getMorePagesStatus(): Observable<boolean>  {
    return this.$morePages.asObservable();
  }

  setRover(rover: Rover): void {
    this.rover = rover;
  }

  getRover(): Rover {
    return this.rover;
  }
}
