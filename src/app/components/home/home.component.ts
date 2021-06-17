import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/book.model';
import { State } from './../../store/reducers/index';
import { getAllBooks } from './../../shared/store/book.selectors';
import { bookActionTypes } from './.././../shared/store/book.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books$!: Observable<Book[]>;

  constructor(private bookService: BookService, private store: Store<State>) { }

  ngOnInit(): void {
    this.books$ = this.store.select(getAllBooks);
    this.books$.subscribe( books => {
      if (books === null || books.length === 0){
        this.store.dispatch(bookActionTypes.loadBooks());
      }
    });
  }

  deleteBook(bookId: string): void {
    this.store.dispatch(bookActionTypes.deleteBooks({bookId}));
  }

  editBook(payload: Book): void {
  }
}
