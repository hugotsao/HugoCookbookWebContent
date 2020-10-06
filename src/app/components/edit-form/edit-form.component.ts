import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStoreService } from '../../services/data-store.service';
import { Category } from 'src/app/services/data-structures';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  
  categories: Observable<Category[]>;
  @Input() content: string;
  @Input() categoryId: number;

  editForm: FormGroup = this.formBuilder.group({
    article: this.formBuilder.group({
      title: [''],
      category: [''],
      tags: this.formBuilder.array(['']),
      ref: this.formBuilder.array(['']),
      dateCreation: ['']
    }),
    content: ''
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataStoreService: DataStoreService,
  ) { }
  
  ngOnInit(): void {
    console.log('init');
    this.editForm.patchValue({
      content: this.content
    });
    this.categories = this.dataStoreService.categorySubject;
  }

  saveChange() {
    // Add category, Add article, Add content
    //this.setNewContent();
  }
  changingCategory() {
    console.log(`this category is ${this.editForm.get('article').get('category')}`);
  }

}
