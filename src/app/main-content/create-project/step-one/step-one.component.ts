import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectDataService } from '../project-data.service';

const LICENSE_LIST_FILE_PATH = "assets/app-data/license-list.json";

@Component({
  selector: 'step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {

  // -------------------------------------------------
  // Input project information form ProjectDataService
  // -------------------------------------------------

  @Input() project;

  // -------------------------------------------------
  // Variable to control steps
  // -------------------------------------------------

  @Output() stepEvent = new EventEmitter<number>();

  // -------------------------------------------------
  // App data
  // -------------------------------------------------

  private licenseList = [];
    
  // -------------------------------------------------
  // Construction functions
  // -------------------------------------------------

  constructor(private service: ProjectDataService) { 
    this.licenseList = JSON.parse( this.read(LICENSE_LIST_FILE_PATH) );
  }

  ngOnInit() {
    this.project = this.service.getProjectInfo();
  }

  private read(path){
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var text = request.responseText;
    return text;
  }

  // -------------------------------------------------
  // Step change functions
  // -------------------------------------------------

  stepChange(step){
    this.service.setProjectInfo(this.project);
    this.stepEvent.emit(step);
  }
}
