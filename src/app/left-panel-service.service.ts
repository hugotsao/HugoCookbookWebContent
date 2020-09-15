import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';

@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {
  categories: Array<Category> | undefined
  titles: Array<Article> | undefined
  articleList: Map<string, Array<Article>> = new Map();
  
  constructor() { 
    this.fetchData()
  }
  private fetchData() {
    
  }
  
  
  getLeftPanelItems(): Map<string, Array<Article>> {
    
    if (this.categories && this.titles) {
      this.titles.forEach(title => {
        let key = this.getCategoryName(title.categoryId);
        if (!(this.articleList.has(key))) {
          this.articleList.set(key, []);
        }
        this.articleList.get(key).push(title);
      })
    }
    return this.articleList;
  }

  private getCategoryName(id: number): string{
    return this.categories.filter(category => category.id === id).pop().name;
  }
}

