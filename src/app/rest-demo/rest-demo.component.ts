import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './../common/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { NotFoundError } from '../common/Notfound-error';
import {
  trigger,
  transition,
  animate,
  style,
  state,
  useAnimation,
  query,
  animateChild,
  group,
  stagger,
} from '@angular/animations';

import { fade, slide, bounceOutLeftAnimation } from '../animations';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'rest-demo',
  templateUrl: './rest-demo.component.html',
  styleUrls: ['./rest-demo.component.css'],
  animations: [
    trigger('customAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000),
          ]),
          query('@liAnimation', stagger('800s', [animateChild()]), {
            optional: true,
          }), //use optional:true else throw will be thrown
        ]),
      ]),
    ]),
    trigger('liAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('1000ms ease-out')]),
      transition(':leave', [
        style({ backgroundColor: '#F4A8B6', opacity: 0 }),
        animate(500),
        useAnimation(bounceOutLeftAnimation),
      ]),
    ]),
  ],
})
export class RestDemoComponent implements OnInit {
  posts: any[];
  constructor(private service: PostService) {}
  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.service.getPosts().subscribe(
      (response: any[]) => {
        this.posts = response;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('Not Found Error');
          console.log(error.originalError);
        } else {
          alert('Unexpected error cooured');
          console.log(error.originalError);
        }
      }
    );
  }
  addPost(topic: HTMLInputElement) {
    let post: any = { name: topic.value };
    topic.value = '';
    this.posts.splice(0, 0, post);
    this.service.createPost(post).subscribe(
      (res) => {
        console.log(res);
      },
      (error: AppError) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        if (error instanceof AppError) {
          console.log(error.originalError);
        } else {
          console.log(error);
        }
      }
    );
  }
  deletePost(post: any) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    this.service.deletePost(post.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error: AppError) => {
        alert('I am in error');
        if (error instanceof NotFoundError) {
          alert('Post has already been deleted.');
          console.log(error.originalError);
        } else {
          alert('Unexpected error cooured');
          console.log(error.originalError);
        }
      }
    );
  }
}
