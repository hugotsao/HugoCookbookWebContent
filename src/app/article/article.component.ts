import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  editorView: boolean;
  editUrl: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.editorView = this.router.url.search('edit') > -1;
    this.editUrl = this.editorView ? this.router.url : `${this.router.url}/edit`;
    console.log(`edit link is ${this.editUrl}`);
  }

}
