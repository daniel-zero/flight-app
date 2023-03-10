import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ticketsFeature } from './+state/tickets.reducers';
import { TicketsEffects } from './+state/tickets.effects';

function toProviders(envProviders: EnvironmentProviders): Provider[] {
  return envProviders as unknown as Provider[];
}

export function provideDomain(): EnvironmentProviders {
  return makeEnvironmentProviders([
    toProviders(provideState(ticketsFeature)),
    toProviders(provideEffects()),
    toProviders(provideEffects(TicketsEffects)),
  ]);
}
