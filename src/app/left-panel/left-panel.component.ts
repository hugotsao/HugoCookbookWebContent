import { Component, OnInit } from '@angular/core';
import { LeftPanelServiceService } from '../left-panel-service.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  items;
  constructor(
    private leftPanelService: LeftPanelServiceService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.items = this.leftPanelService.getLeftPanelItems();
  }

  getContent(title: string): void{
    window.alert(`Getting content of ${title}`);
  }
}
