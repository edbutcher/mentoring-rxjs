import { Component, OnInit } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Post[];
  buttonSubject$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.buttonSubject$.next(this.getPosts().pipe(
      switchMap(sourceValue => {
          console.log(sourceValue);
          return this.getPosts();
      }),
    ).subscribe(
      event => this.posts = event,
      error => console.log(error),
      () => console.log('Done')
    ));
  }

  getPosts() {
    return from(
      fetch(this.postsUrl)
        .then(response => response.json())
        .then(responseJson => responseJson)
    )
  }

  getPostsWithSubject() {
    console.log(this.posts);
    this.buttonSubject$.next(this.getPosts());
  }
}
