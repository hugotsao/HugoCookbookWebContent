import { Component, OnInit, Input } from '@angular/core';
import { LeftPanelServiceService } from '../../services/left-panel-service.service';
import { Article, Category } from '../../services/data-structures';

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
    this.leftPanelService.getTableOfContent().subscribe(
      toc => this.toc = toc
      );
  }
}
