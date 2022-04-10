import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appInfiniteScroll (loadMore)="onLoadMore()">Test data</div>`
})
class TestComponent {
  onLoadMore() {}
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugEl: DebugElement;
  let directive: InfiniteScrollDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, InfiniteScrollDirective ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    debugEl = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
    directive = debugEl.injector.get(InfiniteScrollDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
