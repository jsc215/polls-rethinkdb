import { DataService } from './data.service';
import { PollsComponent } from './polls/polls.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './shared/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NewPollComponent } from './new-poll/new-poll.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-poll', component: NewPollComponent },
  {path: 'polls', component: PollsComponent},
  { path: 'poll/:id', component: PollComponent}
];
@NgModule({
  declarations: [AppComponent, NavbarComponent, PollsComponent, NewPollComponent, HomeComponent, PollComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
