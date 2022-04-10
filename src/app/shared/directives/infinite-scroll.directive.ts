import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {
  @Output() loadMore = new EventEmitter();
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    fromEvent(window, 'scroll')
      .pipe(
        filter(() =>
          Math.floor(element.clientHeight - window.innerHeight - window.scrollY) < 5),
        throttleTime(500),
      )
      .subscribe(() => this.loadMore.emit());
  }
}
