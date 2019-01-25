import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.css']
})
export class AppSpinnerComponent implements OnInit, OnDestroy {

  @Input() delay = 250; // This is our delay before showing the spinner

  public show$ = new BehaviorSubject(false);
  private timeout: any;

  constructor() { }

  ngOnInit() {

    // Show the spinner after the delay period has expired
    this.timeout = setTimeout(() => {
      this.show$.next(true);
    }, this.delay);

  }

  ngOnDestroy() {

    // Clear the timeout if its still going when the spinner is destroyed
    clearTimeout(this.timeout);
    this.show$.next(false);

  }

}
