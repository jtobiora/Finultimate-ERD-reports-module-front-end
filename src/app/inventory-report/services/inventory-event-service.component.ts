import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class InventoryEventService {

  listeners: any;
  eventsSubject: any;
  events;

  constructor() {
    this.listeners = {};

    // A Subject on the other hand can act as both — a data producer and a data consumer.
    //  A subject can be sub­scribed to, just like an observable.
    // A subject can subscribe to other observables.
    //  All subscribers to a subject share the same execution of the subject.
    //  i.e. when a subject produces data, all of its subscribers will receive
    // the same data. This behavior is dif­fer­ent from observ­ables, where each sub­scrip­tion
    // causes an inde­pen­dent exe­cu­tion of the observable.
    this.eventsSubject = new Rx.Subject();

    this.events = Rx.Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}) => {
        if (this.listeners[name]) {
          for (let listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener) {
  if (!this.listeners[name]) {
  this.listeners[name] = [];
}

this.listeners[name].push(listener);
}

  broadcast(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}
