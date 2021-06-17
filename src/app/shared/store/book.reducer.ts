import { Book } from '../models/book.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { bookActionTypes } from './book.actions';

export interface BookState extends EntityState<Book> {
  booksLoaded: boolean;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState = adapter.getInitialState({ booksLoaded: false });

export const bookReducer = createReducer(
  initialState,

  on(bookActionTypes.booksLoaded, (state, action) => {
    return adapter.addMany(action.books, { ...state, booksLoaded: true });
  }),

  on(bookActionTypes.createBook, (state, action) => {
    return adapter.addOne(action.book, state);
  }),

  on(bookActionTypes.deleteBooks, (state, action) => {
    return adapter.removeOne(action.bookId, state);
  }),

  on(bookActionTypes.updateBooks, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
