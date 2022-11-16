import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AlbumsPageComponent } from './pages/albums/albums-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AlbumsPageComponent,
    HeaderComponent,
    ContentComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatButtonModule
  ]
})
export class PopularAlbumsModule {}
