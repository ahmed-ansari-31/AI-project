import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ChatComponent,
    AppComponent
  ],
  imports: [
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  exports:[FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
