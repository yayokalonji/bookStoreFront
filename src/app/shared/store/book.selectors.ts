import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, selectAllBook } from './book.reducer';

export const bookFeatureSelector = createFeatureSelector<State>('books');

export const getAllBooks = createSelector(bookFeatureSelector, selectAllBook);

export const getBook = createSelector(
  bookFeatureSelector,
  (state) => state.setSelectedBook
);

export const areBooksLoaded = createSelector(
  bookFeatureSelector,
  (state) => state.booksLoaded
);
