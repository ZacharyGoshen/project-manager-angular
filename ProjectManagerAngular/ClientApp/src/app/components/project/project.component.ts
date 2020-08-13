import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { Project } from '../../models/project';
import { Category } from '../../models/category';
import { CategoryService } from './../../services/category.service';
import { MessageService } from '../../services/message.service';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnChanges {

  @ViewChild('newCategoryButton', { static: false }) newCategoryButton: ElementRef;
  @ViewChild('newCategoryInput', { static: false }) newCategoryInput: ElementRef;

  @Input() project: Project;
  categories: Category[];
  newCategoryInputHidden: boolean = true;

  constructor(public dialog: MatDialog, private renderer: Renderer2, private projectService: ProjectService, private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.getCategoriesInProject();
    this.onClickOutsideNewCategoryInput();
  }

  ngOnChanges() {
    this.getCategoriesInProject();
  }

  getCategoriesInProject(): void {
    this.categoryService.getCategoriesInProject(this.project.id)
      .subscribe(categories => this.categories = categories);
  }

  addCategory(name: string): void {
    name = name.trim();
    if (!name) {
      this.messageService.addMessage('Name can not be empty', 'Create Category');
      return;
    }
    if (name.length > 50) {
      this.messageService.addMessage('Name must be 50 characters or less', 'Create Category');
      return;
    }
    this.categoryService.addCategory({ name: name, projectId: this.project.id } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
    this.hideNewCategoryInput();
  }

  deleteCategory($event): void {
    this.categories = this.categories.filter(c => c !== $event);
    this.categoryService.deleteCategory($event).subscribe();
  }

  openProjectEditDialog(): void {
    const dialogReference = this.dialog.open(ProjectEditComponent, {
      data: {
        project: this.project
      }
    });

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
