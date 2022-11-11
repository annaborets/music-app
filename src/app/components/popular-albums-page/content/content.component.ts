import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MusicService } from 'src/app/services/music.service';
import { LocalService } from 'src/app/services/local.service';
import { FormattedResponseItem, Liked } from 'src/app/models/formattedResponse';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy, AfterContentInit {
  public albums: (FormattedResponseItem & Liked)[] = [];
  public inputValue = '';
  public numberOfLikes = 0;
  public isLoading = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private _snackBar: MatSnackBar,
    private localService: LocalService
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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public likeAlbum(item: FormattedResponseItem & Liked) {
    this.albums.map((album) => {
      if (album === item) {
        item.isLiked = !item.isLiked;
        if (item.isLiked) {
          this.openSnackBar(`${item.artist}: ${item.name}`, 'Like');
        }
      }
    });
    this.likesCounter();
    this.updateStorage();
    this.sendLikes();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private fetchAlbums(queryParameter: string): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.musicService.getList(queryParameter).subscribe((items) => {
        const likedAlbums = this.localService.getData('likedAlbums');
        const likedAlbumNames = likedAlbums ? JSON.parse(likedAlbums) : [];

        this.albums = items.map((item) => ({
          ...item,
          isLiked: likedAlbumNames.includes(item.name) ? true : false,
        }));
        this.isLoading = false;
        this.likesCounter();
        this.sendLikes();
      })
    );
  }

  private updateStorage() {
    const likedAlbumNames = this.albums.reduce<string[]>((acc, item) => {
      if (item.isLiked) {
        return [...acc, item.name];
      }

      return acc;
    }, []);

    this.localService.saveData('likedAlbums', JSON.stringify(likedAlbumNames));
  }

  private likesCounter() {
    let counter = 0;
    this.albums.map((album) => {
      if (album.isLiked === true) {
        counter++;
      }
    });
    this.numberOfLikes = counter;
  }

  private sendLikes() {
    this.stateService.send_likes.next(this.numberOfLikes);
  }
}
