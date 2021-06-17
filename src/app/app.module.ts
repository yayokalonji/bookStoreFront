import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { bookReducer } from './shared/store/book.reducer';
import { BookEffects } from './shared/store/book.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [AppComponent, NavbarComponent, CreateComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
