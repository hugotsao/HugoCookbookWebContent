import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataStoreService } from '../data-store.service';
import { Category, Article, Content } from 'src/app/data-structures';
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
    this.dataStoreService.createOrUpdateContent(this.form.getRawValue());
  }

}
