import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  editorView: boolean;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {    
    this.editorView = this.activatedRoute.snapshot.paramMap.has('edit');
    this.activatedRoute.url.subscribe(url => {
      this.editorView = url.toString().indexOf('edit') > 0;      
    });
  }

}
