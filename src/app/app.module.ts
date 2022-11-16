import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GenresModule } from './genres/genres.module';
import { PopularAlbumsModule } from './popular-albums/popular-albums.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GenresModule,
    PopularAlbumsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
