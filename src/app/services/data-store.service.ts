import { Injectable } from '@angular/core';
import { Article, Category, Content } from './data-structures';
import { HttpClient } from '@angular/common/http'
import { Subject, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  api = "http://localhost:8080";
  categories: Category[];
  articles: Article[];
  contentSubject: Subject<Content> = new Subject();

  constructor(
    private httpClient: HttpClient
  ) {
  }

  fetchCategories(): Observable<Category[]> {
    return new Observable((observer) => {
      if(!this.categories) {
        this.httpClient.get<Category[]>(`${this.api}/categories`).subscribe(result => {
          this.categories = result;
          observer.next(result);
        })
      } else {
        observer.next(this.categories);
      }
    })
  }

  fetchArticles(): Observable<Article[]> {
    return new Observable((observer) => {
      if (!this.articles) {
        this.httpClient.get<Article[]>(`${this.api}/articles`).subscribe(
          result => {
            this.articles = result
            observer.next(result);
          });
      } else {
        observer.next(this.articles);
      }

    })
  }

  fetchContent(articleId: number): Observable<Content> {
    return this.httpClient.get<Content>(`${this.api}/content/${articleId}`);
  }

  getNewArticleId(): Observable<number> {
    return this.httpClient.get<number>(`${this.api}/articles/genNewArticleId`)
  }
}
