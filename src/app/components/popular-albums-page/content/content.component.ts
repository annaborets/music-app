import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MusicService } from 'src/app/services/music.service';
import { FormattedResponseItem, Liked } from 'src/app/models/formattedResponse';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy, AfterContentInit {
  private subscriptions: Subscription[] = [];
  public albums: (FormattedResponseItem & Liked)[] = [];
  public inputValue = '';
  public numberOfLikes = 0;
  public durationInSeconds = 5;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((event) => {
      this.fetchAlbums(event['genre']);
    });
  }

  ngAfterContentInit(): void {
    this.subscriptions.push(
      this.stateService.send_data.subscribe((data) => {
        this.inputValue = data;
        console.log(this.inputValue);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  fetchAlbums(queryParameter: string): void {
    this.subscriptions.push(
      this.musicService.getList(queryParameter).subscribe((items) => {
        this.albums = items.map((item) => ({ ...item, isLiked: false }));
        console.log(this.albums);
      })
    );
  }

  likeAlbum(item: FormattedResponseItem & Liked) {
    this.albums.map((album) => {
      if (album === item) {
        item.isLiked = !item.isLiked;
        if (item.isLiked) {
          this.openSnackBar(`${item.artist}: ${item.name}`, 'Like');
        }
      }
    });
    this.likesCounter();
    this.sendLikes();
  }

  likesCounter() {
    let counter = 0;
    this.albums.map((album) => {
      if (album.isLiked === true) {
        counter++;
      }
    });
    this.numberOfLikes = counter;
  }

  sendLikes() {
    this.stateService.send_likes.next(this.numberOfLikes);
  }
}
