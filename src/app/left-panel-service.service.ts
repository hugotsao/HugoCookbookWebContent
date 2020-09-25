import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { toASCII } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {

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

  getToc(): Observable<Map<string, Article[]>>{
    this.getCategories().subscribe(cats => {
      this.getArticles().subscribe(arts => {
        const categories = cats._embedded.categories;
        const toc: Map<string, Article[]> = new Map();
        for (let art of arts._embedded.articles) {
          const key = categories.filter(cat => art.categoryId === cat.categoryId).pop().name;
          if(!toc.has(key)) {
            toc.set(key, []);
          }
          toc.get(key).push(art);
        }
        console.log(`toc len ${toc.size}`);
        this.tableOfContent.next(toc);
      })
    })
    return this.tableOfContent;
  }
}
