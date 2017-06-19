import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  public projects = [];

  ngOnInit(){
    this.getProjectList();
  }

  public showModsProjInfo = false;
  public showModsHostsInfo = false;
  public showModsWorkflow = false;
  public showModsMonitoring = false;
  private serverUri: string  = "http://localhost:8080/waves-configurator/jarxs/";

  public getProjectList(){
    let destination = this.serverUri + "project-data/project-list";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        this.projects = response.projects;
      }
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server or refresh the page.");
    }
    xhr.send();
  }
}
