import { Injectable } from '@angular/core';

import { Observable, from, pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor() { }

  getPosts(): Observable<Post[]> {
    return from(fetch(this.postsUrl)).pipe(
      mergeMap(response => response.json())
    );
  }
}
