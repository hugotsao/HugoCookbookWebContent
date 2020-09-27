import { Component, OnInit } from '@angular/core';
import * as marked from "marked";
import { DisplayService } from '../display.service';
import { ActivatedRoute ,ParamMap } from '@angular/router';
@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit {
  title: string;
  content: string;
  
  constructor(
    private displayService: DisplayService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.init();
    this.content = marked('the content is a mark down content\n' + 
    '1. point a\n' + 
    '2. point b\n');
  }
  init() {
    this.route.paramMap.subscribe(paramMap => {
      const articleId = +paramMap.get('articleId');
      this.initTitle(articleId)

    })
  }
  initTitle(articleId: number) {
    this.displayService.getTitleFromId(articleId).subscribe(
      title => this.title = title
    )
  }
  initContent() {

  }
}
