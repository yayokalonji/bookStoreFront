import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { bookActionTypes } from 'src/app/shared/store/book.actions';
import { State } from 'src/app/store/reducers';
import { getBook } from './../../shared/store/book.selectors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy, OnChanges {
  bookForm!: FormGroup;
  editBook = false;
  book$!: Observable<Book>;
  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadChangeGetBook();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  createForm(): void {
    this.bookForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChangeGetBook();
  }

  onSubmit(): void {
    if (this.editBook) {
      const update: Update<Book> = {
        id: this.bookForm.value.id,
        changes: {
          ...this.bookForm.value,
        },
      };
      this.formSubscription.add(
        this.store.dispatch(bookActionTypes.updateBooks({ update }))
      );
    } else if (this.bookForm.valid) {
      this.formSubscription.add(
        this.store.dispatch(bookActionTypes.createBook({ book: this.bookForm.value }))
      );
    }
    this.clearForm();
  }

  clearForm(): void {
    this.editBook = false;
    this.bookForm.reset();
  }

  loadChangeGetBook(): void{
    this.book$ = this.store.pipe(select(getBook));
    if (this.book$){
      this.formSubscription.add(
        this.book$.subscribe((book) => {
          if (book) {
            this.bookForm.patchValue({
              id: book.id,
              name: book.name,
              price: book.price,
              category: book.category,
              author: book.author,
            });
            this.editBook = true;
          } else {
            this.editBook = false;
          }
        })
      );
    }
  }
}
