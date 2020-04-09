import { RouterModule, Routes } from '@angular/router';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
} from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignformComponent } from './signform/signform.component';
import { RestDemoComponent } from './rest-demo/rest-demo.component';
import { PostService } from './post.service';
import { FirebaseDemoComponent } from './firebase-demo/firebase-demo.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ErrorsHandler } from './common/errors-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { GithubFollowersServiceService } from './github-followers-service.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SignformComponent,
    RestDemoComponent,
    FirebaseDemoComponent,
    NavbarComponent,
    ChangePasswordComponent,
    NavbarComponent,
    HomeComponent,
    GithubFollowersComponent,
    NotfoundComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: SignformComponent },
      { path: 'home', component: HomeComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'posts', component: RestDemoComponent },
      { path: 'followers', component: GithubFollowersComponent },
      {
        path: 'profile/:id/:login-name',
        component: GithubFollowersComponent,
      },
      { path: '**', component: NotfoundComponent },
    ]),
  ],
  providers: [
    PostService,
    GithubFollowersServiceService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
