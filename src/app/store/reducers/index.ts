import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromBook from '../../shared/store/book.reducer';
export interface State {
}

export const reducers: ActionReducerMap<State> = {
  books: fromBook.bookReducer,
};

export const metaReducers: MetaReducer<State>[] = [];
