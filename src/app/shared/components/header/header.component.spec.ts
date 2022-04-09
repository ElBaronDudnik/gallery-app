import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { RouterLinkStubDirective } from '../../testing-helpers/router.stubs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let linkDebugElements: DebugElement[];
  let links: RouterLinkStubDirective[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        RouterLinkStubDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    linkDebugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );
    links = linkDebugElements.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight the corresponding link after click', () => {
    linkDebugElements[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(links[0].checked).toBeFalsy();
    expect(links[1].checked).toBe(true);
  });

  it('should navigate to photos', () => {
    const photosLinkDebugEl = linkDebugElements[0];
    const photosLink = links[0];

    photosLinkDebugEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(photosLink.navigatedTo).toBe('/photos');
  });

  it('should navigate to favorites', () => {
    const favoritesLinkDebugEl = linkDebugElements[1];
    const favoritesLink = links[1];

    favoritesLinkDebugEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(favoritesLink.navigatedTo).toBe('/favorites');
  });
});

