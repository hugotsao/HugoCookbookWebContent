import { Component, OnInit, Input } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { Article } from '../data-structures';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  tableOfContent: Map<string, Article[]> = new Map();
  @Input() editorView: boolean;
  constructor(
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.getToc();
  }

  getToc() {
    this.dataStoreService.getLeftPanel().subscribe(
      toc => this.tableOfContent = toc
      );
  }
}
