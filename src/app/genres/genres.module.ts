import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';

import { GenresPageComponent } from './pages/genres-page/genres-page.component';

@NgModule({
  declarations: [GenresPageComponent],
  imports: [CommonModule, MatIconModule, AppRoutingModule]
})
export class GenresModule {}
