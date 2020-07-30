import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiScrollModule } from 'ngx-ui-scroll';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    UiScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
