import { Injectable } from '@angular/core';

import { Observable, from, of, BehaviorSubject, pipe } from 'rxjs';
import { mergeMap, switchMap, catchError, delay } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  public posts$ = new BehaviorSubject([]);
  constructor() { }

  getPosts(): Observable<Post[]> {
    return from(fetch(this.postsUrl)).pipe(
      mergeMap(response => response.json()),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPostsWithSubject(): void {
    this.getPosts()
      .pipe(
        switchMap(() => this.getPosts())
      )
      .subscribe(posts => this.posts$.next(posts));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
