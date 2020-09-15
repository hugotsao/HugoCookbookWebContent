import { Injectable } from '@angular/core';
import { Category } from './category-type';
import { Article } from './article-type';

@Injectable({
  providedIn: 'root'
})
export class LeftPanelServiceService {

  constructor() { }

  categories: Array<Category> = [
    {
      id: 1,
      name: 'LeetCode'
    },
    {
      id: 2,
      name: 'Recipe'
    },
    {
      id: 3,
      name: 'Comparisons'
    }
  ]
  articles: Array<Article> = [
    {
      id: 1,
      title: 'LC0001',
      categoryId: 1,
      tags: ['Tree'],
      ref: ['LC0002'],
      DateCreation: new Date(),
      DateLastModified: new Date()
    },
    {
      id: 2,
      title: 'LC0002',
      categoryId: 1,
      tags: ['Tree'],
      ref: [],
      DateCreation: new Date(),
      DateLastModified: new Date()
    },
    {
      id: 3,
      title: 'Chinese Tea Eggs',
      categoryId: 2,
      tags: ['Tree'],
      ref: [],
      DateCreation: new Date(),
      DateLastModified: new Date()
    },
  ]
  articleList: Map<string, Array<object>> = new Map();

  getLeftPanelItems(): Map<string, Array<object>> {
    this.articles.forEach(article => {
      let key = this.getCategoryName(article.categoryId);
      if (!(this.articleList.has(key))) {
        this.articleList.set(key, []);
      }
      this.articleList.get(key).push(article);
    })
    return this.articleList;
  }

  private getCategoryName(id: number): string{
    return this.categories.filter(category => category.id === id).pop().name;
  }
}

