import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit, OnDestroy {

  // A variable to save current creating's project data
  @Input() project;
  private licenseList = [];
    
  constructor(private service: ProjectDataService, private http: Http) { 
    this.http.get('src/app/app-data/license-list.json')
        .subscribe(res => this.licenseList = res.json());
  }

  ngOnInit() {
    this.project = this.service.getProjectInfo();
  }
  
  ngOnDestroy() {
    this.service.setProjectInfo(this.project);
  }
}
