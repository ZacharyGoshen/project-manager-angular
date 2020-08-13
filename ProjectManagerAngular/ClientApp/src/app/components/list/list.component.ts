import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentProject: Project;
  projects: Project[];

  constructor(public dialog: MatDialog, private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.currentProject = projects[0];
        this.projects = projects;
      });
  }

  setCurrentProject(project: Project): void {
    this.currentProject = project;
  }

  openProjectEditDialog(): void {
    const dialogReference = this.dialog.open(ProjectEditComponent, {
      data: {
        project: this.currentProject
      }
    });
  }
}
