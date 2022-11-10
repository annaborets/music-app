import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterContentInit {
  private subscription: Subscription = Subscription.EMPTY;
  public numberOfLikes = 0;
  inputValue = '';
  constructor(private stateService: StateService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterContentInit() {
    this.subscription = this.stateService.send_likes.subscribe((likes) => {
      console.log(likes);
      this.numberOfLikes = likes;
    });
  }

  onKey(event: any) {
    this.inputValue = event.target.value;
    this.sendData();
  }

  sendData() {
    this.stateService.send_data.next(this.inputValue);
  }
}
