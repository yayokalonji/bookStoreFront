import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../shared/models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.url}`);
  }

  addBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.url}`, payload);
  }

  updateBook(payload: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.url}`, payload);
  }

  deleteBook(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.url}${id}`);
  }
}
