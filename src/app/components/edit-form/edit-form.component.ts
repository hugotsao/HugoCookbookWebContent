import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataStoreService } from '../../services/data-store.service';
import { Category } from 'src/app/services/data-structures';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  @Input() form: FormGroup;
  constructor(
    private dataStoreService: DataStoreService,
  ) { }
  
  ngOnInit(): void {
    this.categories$ = this.dataStoreService.fetchCategories();
  }

  saveChange() {
    // Add category, Add article, Add content
    //this.setNewContent();
  }
  changingCategory() {
    console.log(`this category is ${this.form.get('article').get('categoryId')}`);
  }

}
