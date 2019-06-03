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
  posts: Post[];
  posts$: Observable<Post[]>;
  private searchTerms = new Subject<string>();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.posts$.subscribe(
      posts => this.posts = posts,
      error => console.error(error),
      () => console.log('getPosts completed')
    );
    this.posts$ = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.postsService.searchPosts(term)),
    );
  }

  getPosts() {
    this.postsService.getPosts().subscribe(
      posts => this.posts = posts,
      error => console.error(error),
      () => console.log('getPosts completed')
    );
  }

  getPostsWithSubject() {
    this.postsService.getPostsWithSubject();
  }

  search(term): void {
    this.searchTerms.next(term);
  }
}
