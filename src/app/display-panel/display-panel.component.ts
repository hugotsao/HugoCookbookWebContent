import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { ActivatedRoute } from '@angular/router';
import { Article, Content } from '../data-structures';
import { FormGroup, FormBuilder, FormArray, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit {
  article: Article;
  content: Content;
  articleId: string;
  @Input() editorView: boolean;
  //editForm: FormGroup;
  authenticated: boolean
  
  constructor(
    public dataStoreService: DataStoreService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.route.paramMap.subscribe(paramMap => {
      this.articleId = paramMap.get('articleId');
      this.dataStoreService.getDisplayContent(this.articleId)
     .subscribe(
      ([article, content]) => {
          this.article = article;
          this.content = content;
        }
      )
    })
  }

  initEditForm(): FormGroup {
    return this.formBuilder.group({
      article: this.formBuilder.group({
        ...this.article,
        tags: this.formBuilder.array(this.article.tags ? [this.article.tags] : []),
        references: this.formBuilder.array(this.article.references ? [this.article.references]: [])
      }, {asyncValidators: this.articleValidator(this.articleId)}),
      content: this.formBuilder.group({
        ...this.content
      })
    })
  }

  articleValidator(articleId: string): AsyncValidatorFn {
    return ((articleFormGroup: FormGroup): Observable<ValidationErrors | any>=> {
      const title = articleFormGroup.get('title').value;
      return this.dataStoreService.fetchArticles().pipe(map(articles => {        
        if(articles.find(article => title === article.title) && 'new' === articleId) {
          return {titleAlreadyExisted: true};
        }
      }))
    })
  }

  /*
  get tags() {
    return this.editForm.get('tags') as FormArray
  }
  get references() {
    return this.editForm.get('references') as FormArray
  }
  */
}
