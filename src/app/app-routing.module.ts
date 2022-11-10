import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresPageComponent } from './components/home-page/genres-page/genres-page.component';
import { AlbumsPageComponent } from './components/popular-albums-page/albums-page/albums-page.component';

const routes: Routes = [
  { path: 'albums/:genre', component: AlbumsPageComponent },
  { path: '', component: GenresPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
