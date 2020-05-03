import { BehaviorSubject } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

import { RxAction } from './rx-action';
import { RxReducer } from './rx-reducer';
import type { State } from './typing';


export class StoreState<T extends State> extends BehaviorSubject<T> {
  rxAction$: RxAction;
  rxReducer$: RxReducer;

  get state() {
    return this.value;
  }

  constructor(rxReducer$, rxAction$) {
    super({} as T);

    this.rxAction$ = rxAction$;
    this.rxReducer$ = rxReducer$;

    this.rxAction$.pipe(
      withLatestFrom(this.rxReducer$),
      map(([action, reducers]) => {
        const nextState = Object.entries(reducers).reduce((acc, [prop, reducer]) => ({
          ...acc,
          [prop]: reducer(acc[prop], action)
        }), this.state);

        this.next(nextState);
      })
    );
  }
}
