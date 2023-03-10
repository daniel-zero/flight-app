import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FlightService } from '../infrastructure/flight.service';
import { ticketsActions, ticketsApiAction } from './tickets.actions';

@Injectable({ providedIn: 'root' })
export class TicketsEffects {
  private readonly flightService = inject(FlightService);
  private readonly actions$ = inject(Actions);

  loadFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketsActions.loadFlights),
      switchMap(({ from, to }) => this.flightService.find(from, to)),
      map((flights) => ticketsApiAction.flightsLoaded({ flights })),
      catchError(() =>
        of(
          ticketsApiAction.flightsLoadedError({ error: 'Something went wrong' })
        )
      )
    );
  });

  handleError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ticketsApiAction.flightsLoadedError),
        tap((errResp) => {
          console.error('Error loading flights', errResp);
        })
      );
    },
    { dispatch: false }
  );
}
