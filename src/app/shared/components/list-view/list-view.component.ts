import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Photo } from '../../../core/models/photo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  @Input() data!: Observable<Photo[]>;
  @Input() isLoading!: boolean | null;
  @Output() clickByPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();

  photoById(index: number, photo: Photo): string {
    return photo.id;
  }
}
