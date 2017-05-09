import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  // public projects = [];
  public projects = ["Versailles", "Paris", "Orléans"];

  public showModsProjInfo = false;
  public showModsHostsInfo = false;
  public showModsWorkflow = false;
  public showModsMonitoring = false;

  constructor() { }

  ngOnInit() {
  }

}
