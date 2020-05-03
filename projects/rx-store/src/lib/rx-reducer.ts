import { BehaviorSubject } from 'rxjs';
import { Reducers } from './typing';

export class RxReducer extends BehaviorSubject<Reducers> {
  constructor(reducers: Reducers) {
    super(reducers);
  }
}
