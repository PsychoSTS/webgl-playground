import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // Update event emiting the time since the last frame
  public update: EventEmitter<number>;

  constructor() {
    this.update = new EventEmitter();
  }

  start() {
    this.updateEvent();
  }

  updateEvent() {
    requestAnimationFrame(() => this.updateEvent());
    this.update.emit(0);
  }
}
