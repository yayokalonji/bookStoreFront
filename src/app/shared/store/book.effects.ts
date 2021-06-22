import { Injectable } from '@angular/core';
import { bookActionTypes } from './book.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from 'src/app/services/book.service';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class BookEffects {
  constructor(private bookService: BookService, private actions$: Actions) {}

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
        concatMap((action) => this.bookService.addBook(action.book))
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
