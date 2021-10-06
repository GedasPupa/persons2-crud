import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { PersonsComponent } from './components/persons/persons.component';
import { PersonComponent } from './components/person/person.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { Router, RouterModule } from '@angular/router';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import { ToSpacePipe } from './pipes/to-space.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CapitalizeFirstPipe,
    ToSpacePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: PersonsComponent },
      { path: 'persons', component: PersonsComponent },
      { path: 'persons/:id', component: PersonComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: 'persons', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
