import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../data-store.service';
import { ActivatedRoute } from '@angular/router';
import { Article, Category, Content } from '../../data-structures';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit {
  article: Article;
  content: Content;
  @Input() editorView: boolean;
  editForm: FormGroup;
  
  constructor(
    private dataStoreService: DataStoreService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.route.paramMap.subscribe(paramMap => {
      const articleId = paramMap.get('articleId');
      zip(this.dataStoreService.getArticleFromId(articleId), this.dataStoreService.fetchContent(articleId))
      .pipe(map(([article, content]) => {
        return { article: article, content: content }
      }))
     .subscribe(
        obj => {
          this.article = obj.article;
          this.content = obj.content;
          this.editForm = this.formBuilder.group({
            article: this.formBuilder.group({
              ...this.article
            }),
            content: this.content.content
          })
        }
      )
    })
  }
}
