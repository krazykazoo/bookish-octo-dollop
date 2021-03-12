import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedPhotoComponent } from './components/detailed-photo/detailed-photo.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'photo/:id', component: DetailedPhotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
