import { Book } from '../models/book.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';

export interface State extends EntityState<Book> {
  booksLoaded: boolean;
  setSelectedBook: Book;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState = adapter.getInitialState({
  booksLoaded: false,
  setSelectedBook: {}
});

export const bookReducer = createReducer(
  initialState,
  on(BookActions.booksLoaded, (state, { books }) => {
    return adapter.addMany(books, {...state, booksLoaded: true});
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

export const { selectAll, selectIds } = adapter.getSelectors();

