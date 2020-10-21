import { Injectable } from '@angular/core';
import { Article, Category, Content } from './data-structures';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  api = "http://localhost:8080";

  contentSubject: Subject<Content> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  constructor(
    private httpClient: HttpClient
  ) {
  }

  fetchCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.api}/categories`);
  }

  fetchArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.api}/articles`).pipe(
      shareReplay()
    );
  }

  fetchContent(id: string): Observable<Content> {
    if (id === 'new') {
      return of({content: ''} as Content);
    }
   return this.getArticleFromId(id).pipe(
    switchMap(article => this.httpClient.get<Content>(`${this.api}/content/${article.articleId}`))
   )
  }

  createOrUpdateContent(formdata: any){
    let article: Article = formdata.article;
    let contentString: string = formdata.content;
    const today: Date = new Date();
    if (article.publishDate){
      const content: Content = { 
        articleId: article.articleId,
        content: contentString
      }
      article = {
        ...article,
        modifiedDate: today
      }
      this.httpClient.put<Article>(`${this.api}/article`, article, this.httpOptions).subscribe();
      this.httpClient.put<Content>(`${this.api}/content`, content, this.httpOptions).subscribe();
    } else {
      article = {
        ...article,
        publishDate: today,
        modifiedDate: today
      }
      this.httpClient.post<Article>(`${this.api}/article`, article, this.httpOptions).subscribe(article => {
        const content: Content = {
          articleId: article.articleId,
          content: contentString
        }
        this.httpClient.post<Content>(`${this.api}/content`, content, this.httpOptions).subscribe();
      });
      
    }
    
 }
  getArticleFromId(articleId: string): Observable<Article> {
    if (articleId === 'new') {
      return of({title: '', categoryId: ''} as Article);
    }
    if(articleId === 'latest') {
      return this.fetchArticles().pipe(
        map(articles => articles[0])
      )
    }
    return this.fetchArticles().pipe(
      map(articles => articles.find(article => article.articleId === articleId))
    )
  }
}
