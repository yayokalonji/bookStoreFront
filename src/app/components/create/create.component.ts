import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../../shared/models/book.model';
import { bookActionTypes } from '../../shared/store/book.actions';
import { State } from '../../shared/store/book.reducer';
import { getBook } from './../../shared/store/book.selectors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  /* styleUrls: ['./create.component.css'], */
})
export class CreateComponent implements OnInit, OnDestroy {
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
    this.store.pipe(select(getBook)).subscribe(book => {
      if (book.id){
        this.formSubscription.add(
          this.bookForm.patchValue({
          id: book.id,
          name: book.name,
          price: book.price,
          category: book.category,
          author: book.author,
          })
        );
        this.editBook = true;
      }else{
        this.editBook = false;
      }
    });
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
}
