import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// External Libs Imports
import { ToolTipModule } from 'angular2-tooltip';
import { DataTableModule } from "angular2-datatable";
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { FileSelectDirective } from 'ng2-file-upload';

// Data Filter Pipe
import { DataFilterPipe }   from './main-content/execute-project/data-filter.pipe';

// Routing Imports
import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module';

// Components Imports
import { AppComponent } from './app.component';
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
import { RdfStreamSettingsComponent } from './main-content/create-project/step-three/rdf-stream-settings/rdf-stream-settings.component';
import { DocumentFeedSettingsComponent } from './main-content/create-project/step-three/document-feed-settings/document-feed-settings.component';
import { TripleStoreSettingsComponent } from './main-content/create-project/step-three/triple-store-settings/triple-store-settings.component';
import { SparqlEndpointSettingsComponent } from './main-content/create-project/step-three/sparql-endpoint-settings/sparql-endpoint-settings.component';
import { RdfConverterSettingsComponent } from './main-content/create-project/step-three/rdf-converter-settings/rdf-converter-settings.component';
import { CompresserSettingsComponent } from './main-content/create-project/step-three/compresser-settings/compresser-settings.component';
import { SamplerSettingsComponent } from './main-content/create-project/step-three/sampler-settings/sampler-settings.component';
import { SemanticFilterSettingsComponent } from './main-content/create-project/step-three/semantic-filter-settings/semantic-filter-settings.component';
import { ReasoningFilterSettingsComponent } from './main-content/create-project/step-three/reasoning-filter-settings/reasoning-filter-settings.component';
import { AnomalyDetectionSettingsComponent } from './main-content/create-project/step-three/anomaly-detection-settings/anomaly-detection-settings.component';
import { CleanerSettingsComponent } from './main-content/create-project/step-three/cleaner-settings/cleaner-settings.component';
import { WebCrawlerSettingsComponent } from './main-content/create-project/step-three/web-crawler-settings/web-crawler-settings.component';

@NgModule({
  declarations: [
    // Routing
    routingComponents,
    // Data Filter
    DataFilterPipe,
    // File Select
    FileSelectDirective,
    // Components
    AppComponent,
    NavbarComponent,
    ProjectSpaceComponent,
    MainContentComponent,
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
    CreateProjectComponent,
    RdfStreamSettingsComponent,
    DocumentFeedSettingsComponent,
    TripleStoreSettingsComponent,
    SparqlEndpointSettingsComponent,
    RdfConverterSettingsComponent,
    CompresserSettingsComponent,
    SamplerSettingsComponent,
    CleanerSettingsComponent,
    SemanticFilterSettingsComponent,
    ReasoningFilterSettingsComponent,
    AnomalyDetectionSettingsComponent,
    WebCrawlerSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ToolTipModule,
    DataTableModule,
    BrowserModule,
    HighlightJsModule
  ],
  providers: [HighlightJsService, { provide: ProjectDataService, useClass: ProjectDataService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
