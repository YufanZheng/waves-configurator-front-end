import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from './project-data.service';

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  public step: number = 1;

}
