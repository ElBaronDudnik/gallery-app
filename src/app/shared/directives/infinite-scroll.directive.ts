import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

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
        debounceTime(500),
        tap(console.log),
      )
      .subscribe(() => this.loadMore.emit());
  }
}
