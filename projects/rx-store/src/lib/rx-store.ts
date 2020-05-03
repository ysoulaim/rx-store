import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { StoreState } from './rx-state';
import { RxReducer } from './rx-reducer';
import { RxAction } from './rx-action';

import type { State } from './typing';
import type { Reducers } from './typing';
import type { Action } from './typing';

export class RxStore<T extends State> extends Observable<T> {
  rxState$: StoreState<T>;
  rxAction$: RxAction;
  rxReducer$: RxReducer;

  constructor(reducers: Reducers = {}) {
    super();

    this.rxAction$ = new RxAction();
    this.rxReducer$ = new RxReducer(reducers);
    this.rxState$ = new StoreState(this.rxAction$, this.rxReducer$);
  }

  dispatch(action: Action) {
    this.rxAction$.next(action);
  }

  select(propToSelect: string | ((state: T) => any)) {
    if (typeof propToSelect === 'string') {
      return this.rxState$.pipe(pluck(propToSelect));
    } else {
      return this.rxState$.pipe(map(propToSelect));
    }
  }
}
