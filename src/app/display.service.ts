import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  title: Subject<string> = new Subject();
  constructor(
    private dataService: DataStoreService
  ) { }
  
  getTitleFromId(articleId: number): Observable<string> {
    if(articleId === -1) {
      this.dataService.articleSubject.subscribe(
        articles => {
          if (articles) {
            this.title.next(articles[0].title)
          }
        }
      )
    } else {
      this.dataService.articleSubject.subscribe(
        articles => {
          if (articles && articleId){
            this.title.next(articles.filter(article => article.articleId === articleId)[0].title);
          }
        }
      )
    }
    return this.title;
  }

}
