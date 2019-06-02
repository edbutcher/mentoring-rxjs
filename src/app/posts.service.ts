import { Injectable } from '@angular/core';

import { Observable, from, of, BehaviorSubject, pipe } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  subject = new BehaviorSubject([]);
  constructor() { }

  getPosts(): Observable<Post[]> {
    return from(fetch(this.postsUrl)).pipe(
      mergeMap(response => response.json()),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPostsWithSubject(): Observable<Post[]> {
    this.getPosts().subscribe(posts => {
      this.subject.next(posts)
      console.log(posts);
    });
    return this.subject.asObservable();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
