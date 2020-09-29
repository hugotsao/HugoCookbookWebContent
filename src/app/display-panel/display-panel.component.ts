import { Component, OnInit } from '@angular/core';
import * as marked from "marked";
import { DisplayService } from '../display.service';
import { DataStoreService } from '../data-store.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../data-structures';
import { Input } from '@angular/core';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit {
  article: Article;
  content: string;
  articleId: number;
  editorView: boolean;
  
  constructor(
    private displayService: DisplayService,
    private dataStoreService: DataStoreService,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.init();    
  }
  init() {
    this.route.paramMap.subscribe(paramMap => {
      this.articleId = +paramMap.get('articleId');
      this.editorView = paramMap.has('edit');
      this.getArticle();
    })
  }
  getArticle() {
    this.displayService.getArticleFromId(this.articleId).subscribe(
      article => {
        this.article = article;
        this.articleId = article.articleId;
        this.renderContent();        
      })
  }
  renderContent() {
    this.dataStoreService.fetchContent(this.articleId).subscribe(
      res => this.content = marked(res.content)
    )    
  }

}
