import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    this.loader.next(true);
  }

  hide(): void {
    this.loader.next(false);
  }

  getLoaderState(): Observable<boolean> {
    return this.loader.asObservable();
  }
}
