import { Component, OnInit } from '@angular/core';

import { Subscription, tap } from 'rxjs';

import { MusicService } from 'src/app/services/music.service';
import { Genres } from 'src/app/models/genres';
import { FormattedResponseItem } from 'src/app/models/formattedResponse';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
})
export class GenresPageComponent implements OnInit {
  public genres = [
    Genres.ELECTRO,
    Genres.HIPHOP,
    Genres.INDIE,
    Genres.POP,
    Genres.ROCK,
    Genres.RnB,
  ];

  constructor() {}

  ngOnInit(): void {}
}
