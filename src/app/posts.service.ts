import { Injectable } from '@angular/core';

import { Observable, from, of, BehaviorSubject, pipe } from 'rxjs';
import { mergeMap, switchMap, catchError, filter, map, tap } from 'rxjs/operators';

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

  searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) return of([]);

    return this.getPosts().pipe(
      map(arr => arr.filter(item => item.body.includes(term)))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
