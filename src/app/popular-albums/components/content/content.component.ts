import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { MusicAPIService } from 'src/app/popular-albums/services/music-api.service';
import {
  FormattedResponseItem,
  Liked
} from 'src/app/popular-albums/models/formatted-response';
import { StateService } from 'src/app/popular-albums/services/state.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public albums: (FormattedResponseItem & Liked)[] = [];
  public searchValue = '';
  public numberOfLikes = 0;
  public isLoading = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private musicService: MusicAPIService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((event) => {
      this.fetchAlbums(event['genre']);
    });
    this.subscriptions.push(
      this.stateService.searchValueChange.subscribe((data) => {
        this.searchValue = data;
      })
    );
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
    this.updateStorage();
    this.sendLikes();
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  private fetchAlbums(tag: string): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.musicService.getListOfAlbumsByTag(tag).subscribe((items) => {
        const likedAlbums = localStorage.getItem('likedAlbums');
        const likedAlbumNames = likedAlbums ? JSON.parse(likedAlbums) : [];
        this.numberOfLikes = likedAlbumNames.length;

        this.albums = items.map((item) => ({
          ...item,
          isLiked: false
        }));
        this.isLoading = false;
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

    localStorage.setItem('likedAlbums', JSON.stringify(likedAlbumNames));
    this.numberOfLikes = likedAlbumNames.length;
  }

  private sendLikes() {
    this.stateService.likesCountChange.next(this.numberOfLikes);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
