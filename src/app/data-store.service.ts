import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  api = "http://localhost:8080";
  categories: Category[];
  articles: Article[];
  categorySubject: Subject<Category[]> = new Subject();
  articleSubject: ReplaySubject<Article[]> = new ReplaySubject();

  constructor(
    private httpClient: HttpClient
  ) { 
    this.fetchArticles();
    this.fetchCategories();
  }

  private fetchCategories() {
    if(!this.categories) {
      this.httpClient.get<any>(`${this.api}/categories`).subscribe(
        result => {
          this.categories = result._embedded.categories;
          this.categorySubject.next(this.categories);
        }
      )
    }
  }

  private fetchArticles() {
    if (!this.articles) {
      this.httpClient.get<any>(`${this.api}/articles`).subscribe(
        result => {
          this.articles = result._embedded.articles;
          this.articleSubject.next(this.articles);
        }
      )
    }
  }
}
