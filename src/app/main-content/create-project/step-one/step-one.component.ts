import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit, OnDestroy {

  // A variable to save current creating's project data
  @Input() project;

  private licenseList;

  constructor(private projectDataService: ProjectDataService) { }

  ngOnInit() {
    // Set the default value
    this.licenseList = [
      "Open Data Common Open Database License (CC BY 3.0)",
      "Attribution, 3.0 not transposed (CC BY-SA 3.0)",
      "Paternity - Sharing identity, 3.0 not transposed (CC BY-ND 3.0)",
      "Paternity - No modification, 3.0 not transposed (CC BY 3.0)",
      "Paternity - No commercial use, 3.0 not transposed (CC BY 3.0)",
      "Paternity - No commercial use - Sharing identity, 3.0 not transposed (CC BY 3.0)",
      "Paternity - No commercial use - No modification, 3.0 not transposed (CC BY 3.0)"
    ];
    this.project = this.projectDataService.getProjectInfo();
  }
  
  ngOnDestroy() {
    this.projectDataService.setProjectInfo(this.project);
  }

}
