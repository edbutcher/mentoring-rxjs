import { Component, OnInit } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Post[];
  buttonSubject$: Subject<Post[]> = new Subject();

  constructor() { }

  ngOnInit() {
    this.buttonSubject$.pipe(
      switchMap(() => this.getPosts()),
      tap(value => console.log(value)),
    ).subscribe(
      event => this.posts = event,
      error => console.log(error),
      () => console.log('Done')
    );

    this.buttonSubject$.next();
  }

  getPosts() {
    return from(
      fetch(this.postsUrl)
        .then(response => response.json())
        .then(responseJson => responseJson)
    )
  }

  getPostsWithSubject() {
    this.buttonSubject$.next();
  }
}
