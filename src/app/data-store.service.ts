import { Injectable } from '@angular/core';
import { Article, Category, Content } from './data-structures';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  api = "http://localhost:8080";
  categories: Category[];
  articles: Article[];
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
    if (this.categories) {
      return of (this.categories);
    }
    return new Observable((observer) => {
      this.httpClient.get<Category[]>(`${this.api}/categories`).subscribe(result => {
        this.categories = result;
        observer.next(result);
      })
    })
  }

  fetchArticles(): Observable<Article[]> {
    if (this.articles) {
      return of(this.articles);
    }
    return new Observable((observer) => {
      this.httpClient.get<Article[]>(`${this.api}/articles`).subscribe(
        result => {
          this.articles = result
          observer.next(result);
      });
    })
  }

  fetchContent(articleId: string): Observable<Content> {
    if (articleId === 'new') {
      return of({content: ''} as Content);
    }
    return new Observable((observer) => {
      if(articleId === 'latest') {
        this.fetchArticles().subscribe(
          articles => {
            this.httpClient.get<Content>(`${this.api}/content/${articles[0].articleId}`).subscribe(
              content => observer.next(content));
          })
        
      } else {
        this.httpClient.get<Content>(`${this.api}/content/${articleId}`).subscribe(content => observer.next(content))
      }
    })
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
      this.httpClient.put<Article>(`${this.api}/article`, article, this.httpOptions).subscribe(article => this.articles.push(article));
      this.httpClient.put<Content>(`${this.api}/content`, content, this.httpOptions).subscribe();
    } else {
      article = {
        ...article,
        publishDate: today,
        modifiedDate: today
      }
      this.httpClient.post<Article>(`${this.api}/article`, article, this.httpOptions).subscribe(article => {
        this.articles.push(article);
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
    return new Observable((observer) => {
      if(articleId === 'latest') {
        this.fetchArticles().subscribe(
          articles => observer.next(articles[0])
        )
      } else {
        this.fetchArticles().subscribe(
          articles => observer.next(articles.filter(article => article.articleId === articleId)[0])
        )
      }
    })
  }
}
