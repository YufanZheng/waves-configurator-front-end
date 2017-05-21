import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToolTipModule } from 'angular2-tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';

import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ProjectSpaceComponent } from './left-sidebar/project-space/project-space.component';
import { HeaderComponent } from './left-sidebar/project-space/header/header.component';
import { ProjectsComponent } from './left-sidebar/project-space/projects/projects.component';
import { ButtonGroupComponent } from './left-sidebar/project-space/button-group/button-group.component';

import { MainContentComponent } from './main-content/main-content.component';
import { WelcomePageComponent } from './main-content/welcome-page/welcome-page.component';
import { WaitingPageComponent } from './main-content/waiting-page/waiting-page.component';
import { ProjectDetailsComponent } from './main-content/project-details/project-details.component';
import { ImportProjectComponent } from './main-content/import-project/import-project.component';
import { ProjectDataService } from './main-content/create-project/project-data.service';
import { StepOneComponent } from './main-content/create-project/step-one/step-one.component';
import { StepTwoComponent } from './main-content/create-project/step-two/step-two.component';
import { StepThreeComponent } from './main-content/create-project/step-three/step-three.component';
import { StepFourComponent } from './main-content/create-project/step-four/step-four.component';

import { RawStreamSettingsComponent } from './main-content/create-project/step-three/raw-stream-settings/raw-stream-settings.component';
import { EmptySettingsComponent } from './main-content/create-project/step-three/empty-settings/empty-settings.component';
import { CreateProjectComponent } from './main-content/create-project/create-project.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectSpaceComponent,
    MainContentComponent,
    routingComponents,
    ProjectDetailsComponent,
    HeaderComponent,
    ProjectsComponent,
    ButtonGroupComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    LeftSidebarComponent,
    RawStreamSettingsComponent,
    EmptySettingsComponent,
    ImportProjectComponent,
    WaitingPageComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ToolTipModule
  ],
  providers: [{ provide: ProjectDataService, useClass: ProjectDataService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
