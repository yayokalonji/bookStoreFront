import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  bookForm!: FormGroup;
  editBook = false;
  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.formSubscription.add(
      this.bookForm.patchValue({
        id: '',
        name: '',
        price: 0,
        category: '',
        author: '',
      })
    );
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  createForm(): void {
    this.bookForm = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      category: [''],
      author: [''],
    });
  }

  onSubmit(): void {
    console.log('Unknown');
  }

  clearForm(): void {
    this.bookForm.reset();
    // ** this.store.dispatch(new SetSelectedBook(null));
  }
}
