import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  SearchValueChange = new Subject<string>();
  likesCountChange = new Subject<number>();
}
