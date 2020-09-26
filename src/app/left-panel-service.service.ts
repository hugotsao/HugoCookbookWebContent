import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Observer, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {
  categories: Category[];
  articles: Article[];
  categorySubject: Subject<Category[]> = new Subject();
  articleSubject: Subject<Article[]> = new Subject();
  tableOfContent: Map<string, Article[]> = new Map();
  
  api = "http://localhost:8080";
  constructor(
    private httpClient: HttpClient
  ) {
  }

  fetchCategories() {
    if(!this.categories) {
      this.httpClient.get<any>(`${this.api}/categories`).subscribe(
        result => {
          this.categories = result._embedded.categories;
          this.categorySubject.next(result._embedded.categories);
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

  fetchArticles() {
    this.httpClient.get<any>(`${this.api}/articles`).subscribe(
      result => {
        this.articles = result._embedded.articles;
        this.articleSubject.next(this.articles);
      }
    )
  }
  getArticles(): Observable<Article[]> {
    if (!this.articles) {
      this.fetchArticles();
    }
    this.articleSubject.next(this.articles);
    return this.articleSubject;
  }
  
  getToc(): Observable<Map<string, Article[]>>{
    this.getCategories().subscribe(cats => {
      this.getArticles().subscribe(arts => {
        if(cats && arts) {
          this.transformToToc(cats, arts);
        }
      })
    })
    return of(this.tableOfContent);
  }

  private transformToToc(cats: Category[], arts: Article[]){
    
    for (let cat of cats) {
      for (let art of arts) {
        const catName = art.categoryId === cat.categoryId ? cat.name : undefined;
        if(catName) {
          if(!this.tableOfContent.has(catName)){
            this.tableOfContent.set(catName, []);
          }
          this.tableOfContent.get(catName).push(art);
        }
        
      }
    }
  }
}
