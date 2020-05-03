import { NgModule, ModuleWithProviders } from '@angular/core';

import { RxStore } from './rx-store';
import type { Reducers } from './typing';

@NgModule({})
export class RxStoreModule {
  static forRoot(reducers: Reducers): ModuleWithProviders {
    return {
      ngModule: RxStoreModule,
      providers: [
        { provide: RxStore, useValue: new RxStore(reducers) }
      ]
    };
  }
}
