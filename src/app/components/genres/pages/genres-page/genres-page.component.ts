import { Component } from '@angular/core';

import { Genres } from 'src/app/components/genres/models/genres';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss']
})
export class GenresPageComponent {
  public genres = [
    Genres.ELECTRO,
    Genres.HIPHOP,
    Genres.INDIE,
    Genres.POP,
    Genres.ROCK,
    Genres.RnB
  ];
}
