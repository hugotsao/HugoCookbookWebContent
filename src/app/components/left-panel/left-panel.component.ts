import { Component, OnInit, Input } from '@angular/core';
import { DataStoreService } from '../../data-store.service';
import { Article, Category } from '../../data-structures';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.getTableOfContent().subscribe(
      toc => this.tableOfContent = toc
      );
  }

  getTableOfContent(): Observable<Map<string, Article[]>> {
    if (this.tableOfContent.size === 0) {
      return forkJoin(this.dataStoreService.fetchCategories(), this.dataStoreService.fetchArticles())
      .pipe(
        map(([categories, articles])=> {
          this.transformToToc(categories, articles);
          return this.tableOfContent;
        })
      )
    }
    return of(this.tableOfContent);
  }

  private transformToToc(cats: Category[], arts: Article[]){
    for (let cat of cats) {
      for (let art of arts) {        
        const catName = art.categoryId === cat.categoryId ? cat.categoryName : undefined;
        if(catName) {
          if(!this.tableOfContent.has(catName)){
            this.tableOfContent.set(catName, []);
          }
          this.tableOfContent.get(catName).push(art);
        }
      }
    }
  }
}
