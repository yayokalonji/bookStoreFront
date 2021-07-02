import { Injectable } from '@angular/core';
import { bookActionTypes } from './book.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../../services/book.service';
import { concatMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {
  constructor(private bookService: BookService, private actions$: Actions, private router: Router) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.loadBooks),
      concatMap(() => this.bookService.fetchBooks()),
      map((books) => bookActionTypes.booksLoaded({ books }))
    )
  );

  createBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookActionTypes.createBook),
        concatMap((action) => this.bookService.addBook(action.book)),
        tap(() => window.location.reload())
      ),
    { dispatch: false }
  );

  deleteBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookActionTypes.deleteBooks),
        concatMap((action) => this.bookService.deleteBook(action.bookId))
      ),
    { dispatch: false }
  );

  updateBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookActionTypes.updateBooks),
        concatMap((action) =>
          this.bookService.updateBook(action.update.changes)
        )
      ),
    { dispatch: false }
  );
}
