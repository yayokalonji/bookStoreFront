import { Book } from '../models/book.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';

export interface State extends EntityState<Book> {
  setSelectedBook: Book;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: book => book.id
});

export const initialState = adapter.getInitialState({
  selectId: null,
  setSelectedBook: {}
});

export const bookReducer = createReducer(
  initialState,
  on(BookActions.booksLoaded, (state, { books }) => {
    return adapter.addMany(books, state);
  }),

  on(BookActions.createBook, (state, { book }) => {
    return adapter.addOne(book, state);
  }),

  on(BookActions.deleteBooks, (state, { bookId }) => {
    return adapter.removeOne(bookId, state);
  }),

  on(BookActions.updateBooks, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),

 on(BookActions.SetSelectedBook, (state, { book }) => {
    return {...state, setSelectedBook: book };
  })
);

export const { selectAll, selectIds, selectEntities, selectTotal } = adapter.getSelectors();

