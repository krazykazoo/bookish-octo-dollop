import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Photo from 'src/app/models/photo';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private readonly router: Router, private readonly nasaService: NasaService) { }

  ngOnInit(): void {
    this.nasaService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
    });
  }


  goToPhoto(id: string): void {
    this.router.navigate([`photo/${id}`]);
  }
}
