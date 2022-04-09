import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {
  @Output() loadMore = new EventEmitter();
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    console.log(this.elementRef.nativeElement.clientHeight);
    fromEvent(window, 'scroll')
      .pipe(
        filter(() => Math.floor(element.clientHeight - window.innerHeight - window.scrollY) < 1),
        debounceTime(500)
      )
      .subscribe(() => this.loadMore.emit());
  }
}