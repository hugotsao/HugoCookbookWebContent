import { Component, OnInit } from '@angular/core';
import * as marked from "marked";
@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit {
  title: string;
  content: string;
  loading: boolean;
  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    this.title = 'Test Title';
    this.content = marked('the content is a mark down content\n' + 
    '1. point a\n' + 
    '2. point b\n');
  }



}
