import { Injectable } from '@angular/core';
import { Article, Category } from './data-structures';
import { Observable, merge,zip } from 'rxjs';
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
    const merged = merge<Category[], Article[]>(this.dataStore.fetchCategories(), this.dataStore.fetchArticles)
    return zip(this.dataStore.fetchCategories(), this.dataStore.fetchArticles())
    .pipe(
      map(([categories, articles])=> {
        return this.transformToToc(categories, articles)
      })
    )
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
