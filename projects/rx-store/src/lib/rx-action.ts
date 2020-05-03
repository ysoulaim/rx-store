import { BehaviorSubject } from 'rxjs';
import { Action } from './typing';

export class RxAction extends BehaviorSubject<Action> {
  constructor() {
    super({ type: null });
  }
}
