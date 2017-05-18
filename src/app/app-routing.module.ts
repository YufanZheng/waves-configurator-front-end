import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './main-content/welcome-page/welcome-page.component';
import { StepOneComponent } from './main-content/create-project/step-one/step-one.component';
import { StepTwoComponent } from './main-content/create-project/step-two/step-two.component';
import { StepThreeComponent } from './main-content/create-project/step-three/step-three.component';
import { StepFourComponent } from './main-content/create-project/step-four/step-four.component';
import { ImportProjectComponent } from './main-content/import-project/import-project.component';
import { ProjectDetailsComponent } from './main-content/project-details/project-details.component';
import { ExecuteProjectComponent } from "app/main-content/execute-project/execute-project.component";

const routes: Routes = [
    {path: '', component: WelcomePageComponent},
    {path: 'create-project-step-1', component: StepOneComponent},
    {path: 'create-project-step-2', component: StepTwoComponent},
    {path: 'create-project-step-3', component: StepThreeComponent},
    {path: 'create-project-step-4', component: StepFourComponent},
    {path: 'import-project', component: ImportProjectComponent},
    {path: 'execute-project/:name', component: ExecuteProjectComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{ }
export const routingComponents = [
    WelcomePageComponent, 
    StepOneComponent, 
    StepTwoComponent, 
    StepThreeComponent, 
    StepFourComponent,
    ImportProjectComponent,
    ExecuteProjectComponent
]