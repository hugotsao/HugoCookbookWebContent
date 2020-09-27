import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  api = "http://localhost:8080";
  categories: Category[];
  articles: Article[];
  categorySubject: Subject<Category[]> = new Subject();
  articleSubject: Subject<Article[]> = new Subject();

  constructor(
    private httpClient: HttpClient
  ) { }

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

  getCategories(): Observable<Category[]> {
    if (!this.categories) {
      this.fetchCategories();
    }
    this.categorySubject.next(this.categories);
    return this.categorySubject;
  }

  getArticles(): Observable<Article[]> {
    if (!this.articles) {
      this.fetchArticles();
    }
    this.articleSubject.next(this.articles);
    return this.articleSubject;
  }
  
}
