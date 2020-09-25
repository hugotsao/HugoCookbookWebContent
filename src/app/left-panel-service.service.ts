import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {
  categories: Subject<Category[]> = new Subject();
  titles: Subject<Article[]> = new Subject();
  articleList: Map<string, Article[]> = new Map();
  tableOfContent: Subject<Map<string, Article[]>> = new Subject();
  
  api = "http://localhost:8080";
  constructor(
    private httpClient: HttpClient
  ) {
  }
  getArticles(): Observable<any> {
    return this.httpClient.get(`${this.api}/articles`);
  }
  getCategories(): Observable<any>{
    return this.httpClient.get<any>(`${this.api}/categories`);
  }
}

