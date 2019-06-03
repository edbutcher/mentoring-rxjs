import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Post } from '../post';
import { PostsService } from '../posts.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  private searchTerms = new Subject<string>();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.postsService.searchPosts(term)),
    );
  }

  search(term): void {
    this.searchTerms.next(term.toLowerCase());
  }
}
