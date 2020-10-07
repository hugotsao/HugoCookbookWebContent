import { Injectable } from '@angular/core';
import { Article, Category } from './data-structures';
import { Observable, merge,zip, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';


@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {

  tableOfContent: Map<string, Article[]> = new Map();
  constructor(
    private dataStore: DataStoreService
  ) {}

  getTableOfContent(): Observable<Map<string, Article[]>> {
    if (this.tableOfContent.size == 0) {
      return zip(this.dataStore.fetchCategories(), this.dataStore.fetchArticles())
      .pipe(
        map(([categories, articles])=> {
          this.transformToToc(categories, articles);
          return this.tableOfContent;
        })
      )
    }
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
