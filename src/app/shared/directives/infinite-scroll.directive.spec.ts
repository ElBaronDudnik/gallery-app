import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appInfiniteScroll (loadMore)="onLoadMore()">Test data</div>`
})
class TestComponent {
  onLoadMore(): boolean {
    return true;
  }
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugEl: DebugElement;
  let directive: InfiniteScrollDirective;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, InfiniteScrollDirective ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    debugEl = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
    directive = debugEl.injector.get(InfiniteScrollDirective);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  xit('should emit loadMore event when scroll to the bottom of the page', fakeAsync(() => {
    const spy = spyOn(component, 'onLoadMore');
    window.dispatchEvent(new Event('scroll'));
    // window.scrollBy(0, window.innerHeight);
    tick(100);
    fixture.detectChanges();

    expect(component.onLoadMore).toHaveBeenCalled();
  }));
});
