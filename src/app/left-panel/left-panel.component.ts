import { Component, OnInit } from '@angular/core';
import { LeftPanelServiceService } from '../left-panel-service.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  items;
  loading: boolean;
  constructor(
    private leftPanelService: LeftPanelServiceService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.loading = true;
    this.items = this.leftPanelService.getLeftPanelItems();
  }

  getContent(articleId: number): void{
    window.alert(`Getting content of ${articleId}`);
  }
}
