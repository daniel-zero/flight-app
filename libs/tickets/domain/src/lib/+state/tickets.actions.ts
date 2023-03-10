import { createActionGroup, props } from '@ngrx/store';
import { Flight } from '../entities/flight';

export const ticketsActions = createActionGroup({
  source: 'tickets',
  events: {
    'Load flights': props<{ from: string; to: string }>(),
  },
});

export const ticketsApiAction = createActionGroup({
  source: 'tickets API',
  events: {
    'Flights loaded': props<{ flights: Flight[] }>(),
    'Flights loaded error': props<{ error: string }>(),
  },
});
