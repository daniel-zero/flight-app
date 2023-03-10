import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ticketsActions } from '../+state/tickets.actions';
import { ticketsFeature } from '../+state/tickets.reducers';

@Injectable({ providedIn: 'root' })
export class FlightSearchFacade {
  private readonly store = inject(Store);

  public readonly flights$ = this.store.select(ticketsFeature.selectFlights);

  public loadFlights(from: string, to: string): void {
    this.store.dispatch(ticketsActions.loadFlights({ from, to }));
  }
}
