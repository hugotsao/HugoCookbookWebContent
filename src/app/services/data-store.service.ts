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
  categorySubject: Subject<Category[]> = new Subject();
  articleSubject: ReplaySubject<Article[]> = new ReplaySubject();
  contentSubject: Subject<Content> = new Subject();

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
          this.articles = result._embedded.articles.sort(this.sortArticle);
          this.articleSubject.next(this.articles);
        }
      )
    }
  }
  
  sortArticle(a: Article, b:Article) {
    return b.articleId - a.articleId;
  }

  fetchContent(articleId: number): Observable<Content> {
    return this.httpClient.get<Content>(`${this.api}/contents/search/findByArticleId?articleId=${articleId}`);
  }
  
}
