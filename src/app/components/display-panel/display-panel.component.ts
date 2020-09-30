import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { DataStoreService } from '../../services/data-store.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../services/data-structures';
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
  @Input() editorView: boolean;
  
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
      
      this.getArticle();

    })
  }
  

  getArticle() {
    this.displayService.getArticleFromId(this.articleId).subscribe(
      article => {
        this.article = article;        
        if (this.articleId === -1 && this.editorView) {
          this.article = {
            ...this.article,
            articleId: this.articleId + 1,
            title: '',
            categoryId: 1,
            tags: [],
            ref: [],
            DateCreation: new Date(),
            DateLastModified: new Date()
          };
          this.content = '_new content here_';
        } else {
        this.articleId = article.articleId;
        this.renderContent();
        }
      })
  }
  renderContent() {
    this.dataStoreService.fetchContent(this.articleId).subscribe(
      res => this.content = res.content
    )  
  }

}
