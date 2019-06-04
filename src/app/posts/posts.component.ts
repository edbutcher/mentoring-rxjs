import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';

import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Observable<Post[]>;

  constructor() { }

  ngOnInit() {
    this.posts = this.getPosts();
  }

  getPosts() {
    return from(
      fetch(this.postsUrl)
        .then(response => response.json())
        .then(responseJson => responseJson)
    )
  }
}
