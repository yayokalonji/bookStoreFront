import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState, selectAll } from './book.reducer';

export const bookFeatureSelector = createFeatureSelector<BookState>('books');

export const getAllBooks = createSelector(bookFeatureSelector, selectAll);

export const areBooksLoaded = createSelector(
  bookFeatureSelector,
  (state) => state.booksLoaded
);
