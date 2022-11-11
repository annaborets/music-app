import { Component, AfterContentInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, AfterContentInit {
  public numberOfLikes = 0;
  public inputValue = '';

  private subscription: Subscription = Subscription.EMPTY;

  constructor(private stateService: StateService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterContentInit() {
    this.subscription = this.stateService.send_likes.subscribe((likes) => {
      this.numberOfLikes = likes;
    });
  }

  public onKey(event: any) {
    this.inputValue = event.target.value;
    this.sendData();
  }

  private sendData() {
    this.stateService.send_data.next(this.inputValue);
  }
}
