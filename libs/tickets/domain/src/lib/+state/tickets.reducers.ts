import { Flight } from '../entities/flight';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ticketsActions, ticketsApiAction } from './tickets.actions';

export interface TicketsState {
  flights: Flight[];
  loading: boolean;
  hide: number[];
}

export const initialState: TicketsState = {
  flights: [],
  hide: [],
  loading: false,
};

export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    initialState,
    on(ticketsActions.loadFlights, (state) => ({
      ...state,
      loading: true,
    })),
    on(ticketsApiAction.flightsLoaded, (state, { flights }) => ({
      ...state,
      flights,
      loading: false,
    })),
    on(ticketsApiAction.flightsLoadedError, (state) => ({
      ...state,
      loading: false,
    }))
  ),
  extraSelectors: ({ selectFlights, selectHide }) => ({
    selectFilteredFlights: createSelector(
      selectFlights,
      selectHide,
      (flights, hide) => flights.filter((f) => !hide.includes(f.id))
    ),
  }),
});
