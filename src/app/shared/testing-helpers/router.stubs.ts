import { Directive, Injectable, Input, HostListener } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras): any { }
  navigateByUrl(url: string): string { return url; }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
  exportAs: 'routerLinkActive'
})
export class RouterLinkStubDirective {
  @Input() routerLink: any;
  @Input() checked!: boolean;
  @Input() routerLinkActive!: { isActive: boolean};
  @Input() routerLinkActiveOptions: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.routerLink;
    this.checked = true;
  }
}
