import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.fetchBooks().subscribe(books => {
      this.books = books;
    });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(book => {
      console.log(book);
    });
    this.bookService.fetchBooks().subscribe(books => {
      this.books = books;
    });
  }

  editBook(payload: Book): void {
    this.bookService.updateBook(payload).subscribe(book => {
      console.log(book);
    });
  }
}
