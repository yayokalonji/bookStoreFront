import { createReducer } from '@ngrx/store';
import { BookActions, BookActionTypes } from './book.actions';

export let initialState = [];

export function reducer(state= initialState, action: BookActions){
  switch (action.type){
    case BookActionTypes.ADD_BOOK : return [...state, action.payload];
  }
}
