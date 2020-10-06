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

  getTableOfContent(): Observable<Map<string, Article[]>> {
    return new Observable((observer) => {
      if (this.tableOfContent.size === 0) {
        this.dataStore.fetchCategories().subscribe(categories => {
          this.dataStore.fetchArticles().subscribe(articles => {
            if (categories && articles) {
              this.tableOfContent = this.transformToToc(categories, articles);
              observer.next(this.tableOfContent);
            }
          })
        })
      } else {
        observer.next(this.tableOfContent);
      }    
    })
  }

  private transformToToc(cats: Category[], arts: Article[]):  Map<string, Article[]> {
    const map: Map<string, Article[]> = new Map();
    for (let cat of cats) {
      for (let art of arts) {        
        const catName = art.categoryId === cat.categoryId ? cat.name : undefined;
        if(catName) {
          if(!map.has(catName)){
            map.set(catName, []);
          }
          map.get(catName).push(art);
        }
      }
    }
    return map;
  }
}
