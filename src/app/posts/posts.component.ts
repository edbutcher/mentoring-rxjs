import { Component, OnInit } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { switchMap, tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Post[];
  postsSubject$ = new Subject();
  inputSubject$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.postsSubject$.pipe(
      switchMap(value => {
        if(value) {
          return this.getPosts().pipe(
            map(posts => 
              posts.filter(post => post.body.includes(''+ value))
          ));
        } else {
          return this.getPosts();
        }
      }),
      tap(_ => console.log(_)),
    ).subscribe(
      event => this.posts = event,
      error => console.log(error),
      () => console.log('Done')
    );
    this.inputSubject$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(_ => console.log(_)),
    ).subscribe(
      event => this.postsSubject$.next(event),
      error => console.log(error),
      () => console.log('Input')
    );
    this.postsSubject$.next();
  }

  getPosts(): Observable<Post[]> {
    return from(
      fetch(this.postsUrl)
        .then(response => response.json())
        .then(responseJson => responseJson)
    )
  }

  getPostsWithSubject() {
    this.postsSubject$.next();
  }

  search(term: string): void {
    this.inputSubject$.next(term);
  }
}
