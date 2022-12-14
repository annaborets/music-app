import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresPageComponent } from './genres/pages/genres-page/genres-page.component';
import { AlbumsPageComponent } from './popular-albums/pages/albums/albums-page.component';

const routes: Routes = [
  { path: 'albums/:genre', component: AlbumsPageComponent },
  { path: '', component: GenresPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
