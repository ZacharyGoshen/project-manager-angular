import { Component, OnInit, Input, Inject } from '@angular/core';
import { Project } from '../../models/project';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service'

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProjectEditData, private projectService: ProjectService) {
    this.project = data.project;
  }

  updateProject(name: string): void {
    this.data.project.name = name;
    this.projectService.updateProject(this.data.project).subscribe();
  }
}
