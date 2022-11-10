import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  send_data = new Subject<any>();
  send_likes = new Subject<any>();

  constructor() {}
}
