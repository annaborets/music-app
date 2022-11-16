import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateService } from 'src/app/popular-albums/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public numberOfLikes = 0;
  public searchValue = '';

  private subscription: Subscription = Subscription.EMPTY;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.subscription = this.stateService.likesCountChange.subscribe(
      (likes) => {
        this.numberOfLikes = likes;
      }
    );
  }

  public onKey(event: any) {
    this.searchValue = event.target.value;
    this.sendData();
  }

  private sendData() {
    this.stateService.searchValueChange.next(this.searchValue);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
