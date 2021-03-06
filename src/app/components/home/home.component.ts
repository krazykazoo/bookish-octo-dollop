import { Component, OnInit } from '@angular/core';
import Photo from 'src/app/models/photo';
import Rover from 'src/app/models/rover';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date = '2015-04-09';
  loading = false;
  morePages = false;

  rovers: Rover[];
  rover: Rover;
  constructor(private readonly nasaService: NasaService) { }

  ngOnInit(): void {
    this.rovers = [new Rover(), new Rover(), new Rover()];
    this.rovers[0].name = 'Curiosity';
    this.rovers[1].name = 'Opportunity';
    this.rovers[2].name = 'Spirit';
    this.rover = this.rovers[0];
    this.nasaService.getLoading().subscribe((loading) => {
      this.loading = loading;
    });
    this.nasaService.getMorePagesStatus().subscribe((morePages) => {
      this.morePages = morePages;
    });

    const serviceRover = this.nasaService.getRover();
    if (serviceRover !== undefined) {
      this.rover = serviceRover;
    }
    else {
      this.nasaService.setRover(this.rover);
    }


  }

  getPhotos(): void {
    this.nasaService.getPhotosByDate(this.date, 'search');
  }

  loadMorePhotos(): void {
    this.nasaService.getPhotosByDate(this.date, 'more');
  }

  roverSelect(event): void {
    this.rover = this.rovers.filter(rover => rover.name === event.target.value)[0];
    this.nasaService.setRover(this.rover);
  }
}
