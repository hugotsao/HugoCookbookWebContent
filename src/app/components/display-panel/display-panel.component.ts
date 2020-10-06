import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { DataStoreService } from '../../services/data-store.service';
import { ActivatedRoute } from '@angular/router';
import { Article, Category } from '../../services/data-structures';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit {
  article: Article;
  content: string;
  articleId: number;
  categories: Category[];
  category: Category;
  newContentForm: FormControl;
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
      if (this.articleId === -1 && this.editorView) {
        this.dataStoreService.getNewArticleId().subscribe( res => {
          this.articleId = res;  
        });
        this.newContentForm = new FormControl();
      } else {
        this.getArticle();
      }
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
      res => this.content = res.content
    )
  }
  
  setNewContent() {
    this.newContentForm.setValue(
       {
          article: {
            articleId: this.articleId,
            title: '',
            categoryId: 1,
            tags: [],
            ref: [],
            DateCreation: new Date(),
            DateLastModified: new Date()
          },
          content: this.content
        }
    )
  }
}
