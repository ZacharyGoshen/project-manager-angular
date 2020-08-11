import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { Category } from '../../models/category';
import { CategoryService } from './../../services/category.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild('newCategoryButton', { static: false }) newCategoryButton: ElementRef;
  @ViewChild('newCategoryInput', { static: false }) newCategoryInput: ElementRef;

  categories: Category[];
  newCategoryInputHidden: boolean = true;

  constructor(private renderer: Renderer2, private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.getCategories();
    this.onClickOutsideNewCategoryInput();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  addCategory(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage('A category can not be created without a name');
      return;
    }
    if (name.length > 50) {
      this.messageService.addMessage("A category's name can not be longer than 50 characters");
      return;
    }
    this.categoryService.addCategory({ name: name } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
    this.hideNewCategoryInput();
  }

  deleteCategory($event): void {
    this.categories = this.categories.filter(c => c !== $event);
    this.categoryService.deleteCategory($event).subscribe();
  }

  showNewCategoryInput(): void {
    this.newCategoryInputHidden = !this.newCategoryInputHidden;
    setTimeout(() => { 
      this.newCategoryInput.nativeElement.focus();
      this.newCategoryInput.nativeElement.select();
    }, 0); 
  }

  hideNewCategoryInput(): void {
    this.newCategoryInputHidden = !this.newCategoryInputHidden;
    this.newCategoryInput.nativeElement.value = '';
  }

  onClickOutsideNewCategoryInput(): void {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (
        event.target != this.newCategoryButton.nativeElement &&
        event.target != this.newCategoryInput.nativeElement &&
        !this.newCategoryInputHidden
      ) {
        this.hideNewCategoryInput();
      } 
    });
  }

}
