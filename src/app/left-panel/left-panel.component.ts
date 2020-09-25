import { Component, OnInit } from '@angular/core';
import { LeftPanelServiceService } from '../left-panel-service.service';
import { Article } from '../article-type';
import { Category } from '../category-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  toc: Observable<Map<string, Article[]>>;
  titles: Article[];
  categories: Category[];
  loading: boolean;
  constructor(
    private leftPanelService: LeftPanelServiceService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getArticles();
  }
  getCategories() {
    this.leftPanelService.getCategories().subscribe(
      result => this.categories = result._embedded.categories
    )
  }
  getArticles() {
    this.leftPanelService.getArticles().subscribe(
    result => this.titles = result._embedded.articles
    )
  }

  getContent(articleId: number): void{
    window.alert(`Getting content of ${articleId}`);
  }
}
