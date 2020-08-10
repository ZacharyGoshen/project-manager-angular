import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { TaskComponent } from './components/task/task.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProjectComponent } from './components/project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    CategoryComponent,
    MessagesComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ProjectComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
