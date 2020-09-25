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
  toc: Map<string, Article[]>;
  titles: Article[];
  categories: Category[];
  loading: boolean;
  constructor(
    private leftPanelService: LeftPanelServiceService
  ) { }

  ngOnInit(): void {
    this.getToc();
  }

  getToc() {
    this.leftPanelService.getToc().subscribe(
      toc => this.toc = toc
      );
  }

  getContent(articleId: number): void{
    window.alert(`Getting content of ${articleId}`);
  }
}
