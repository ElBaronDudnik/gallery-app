import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';


@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {
  @Output() loadMore = new EventEmitter();
  private sub!: Subscription;
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const containerElement = this.elementRef.nativeElement.parentElement.parentElement;
    this.sub = fromEvent(window, 'scroll')
      .pipe(
        filter(() =>
          Math.floor(containerElement.clientHeight - window.innerHeight - window.scrollY) < 5),
        throttleTime(500),
      )
      .subscribe(() => this.loadMore.emit());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
