import { Injectable } from '@angular/core';
import { Article, Category } from './data-structures';
import { Observable, of } from 'rxjs';
import { DataStoreService } from './data-store.service';


@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {

  tableOfContent: Map<string, Article[]> = new Map();
  constructor(
    private dataStore: DataStoreService
  ) {}

  getToc(): Observable<Map<string, Article[]>> {
    this.dataStore.categorySubject.subscribe(cats => {
      this.dataStore.articleSubject.subscribe(arts => {
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
