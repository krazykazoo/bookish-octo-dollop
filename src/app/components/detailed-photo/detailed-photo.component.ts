import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Photo from 'src/app/models/photo';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-detailed-photo',
  templateUrl: './detailed-photo.component.html',
  styleUrls: ['./detailed-photo.component.scss']
})
export class DetailedPhotoComponent implements OnInit {

  photos: Photo[];
  photo: Photo;
  id: number;
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly nasaService: NasaService) { }

  ngOnInit(): void {
    this.nasaService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
      this.filterPhotos();
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.filterPhotos();
    });
  }

  filterPhotos() {
    let filteredPhotos = this.photos.filter(photo => photo.id == this.id);
    console.log(this.photos)
    if (filteredPhotos.length === 1) {
      this.photo = filteredPhotos[0];
    }
    else {
      //error state
    }
    console.log(this.photo);
  }

}