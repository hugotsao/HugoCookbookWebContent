import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import { Subject, Observable } from 'rxjs';
import { Article } from './data-structures';


@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  article: Subject<Article> = new Subject();
  constructor(
    private dataService: DataStoreService
  ) { }
  
  getArticleFromId(articleId: number): Observable<Article> {
    this.dataService.articleSubject.subscribe(
      articles => {
        if(articles) {
  
          if(articleId === -1) {
            this.article.next(articles[0]);
          } else {
            this.article.next(articles.filter(article => article.articleId === articleId)[0]);
          }
        }
      }
    )
    return this.article;
  }
}
