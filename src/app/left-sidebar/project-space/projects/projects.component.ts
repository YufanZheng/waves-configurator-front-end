import { Component, OnInit } from '@angular/core';

const BASE_SERVER_URL = "http://localhost:8080/waves-configurator/jarxs/";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  // -------------------------------------------------
  // Project List
  // -------------------------------------------------

  public projects = [];

  // -------------------------------------------------
  // Init functions
  // -------------------------------------------------

  ngOnInit(){
    this.loadProjectList();
  }

  public loadProjectList(){
    // Use XMLHttpRequest to get project list
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let url = BASE_SERVER_URL + "project-data/project-list";
    xhr.open("GET", url, true);
    // Recieve response
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        // Load project list
        this.projects = response.projects;
      }
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server or refresh the page.");
    }
    // Send request
    xhr.send();
  }
}
