import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, map, catchError, Observable } from 'rxjs';

import { Response } from '../models/response';
import {
  FormattedResponse,
  FormattedResponseItem,
} from '../models/formattedResponse';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly API_KEY_LASTFM = '22e5dcb7293a23da484afeacce80c247';

  constructor(private http: HttpClient) {}

  public getList(queryParameter: string): Observable<FormattedResponseItem[]> {
    return this.http
      .get<Response>(this.getUrl(queryParameter))
      .pipe(
        map(this.formatResponse),
        catchError(this.handleError<FormattedResponse>('getList', []))
      );
  }

  private getUrl(queryParameter: string): string {
    return `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${queryParameter}&api_key=${this.API_KEY_LASTFM}&format=json`;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private formatResponse(response: Response): FormattedResponseItem[] {
    const result = response.albums.album.map((item) => {
      return {
        name: item.name,
        artist: item.artist.name,
        image: item.image[2]['#text'],
      };
    });

    return result;
  }
}
