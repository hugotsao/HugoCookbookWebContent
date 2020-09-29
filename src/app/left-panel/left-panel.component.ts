import { Component, OnInit, Input } from '@angular/core';
import { LeftPanelServiceService } from '../left-panel-service.service';
import { Article, Category } from '../data-structures';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  toc: Map<string, Article[]>;
  titles: Article[];
  categories: Category[];
  @Input() editorView: boolean;
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
}
