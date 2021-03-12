import { Component, OnInit } from '@angular/core';
import Photo from 'src/app/models/photo';
import { NasaService } from '../../services/nasa.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date: string = '2015-06-03';

  constructor(private readonly nasaService: NasaService) { }

  ngOnInit(): void {
  }

  getPhotos() {
    this.nasaService.getPhotosFromCuriosityByDate(this.date);
  }

}
