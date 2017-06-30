import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HighlightJsService } from 'angular2-highlight-js';

// Use jQuery
import $ from 'jquery/dist/jquery';

const BASE_SERVER_URL = "http://localhost:8080/waves-configurator/jarxs/";

@Component({
  selector: 'execute-project',
  templateUrl: './execute-project.component.html',
  styleUrls: ['./execute-project.component.css']
})
export class ExecuteProjectComponent implements OnInit {

  // -------------------------------------------------
  // Panel shown params
  // -------------------------------------------------

  @ViewChild('submitLogs') submitLogs;
  private shown: string = "configuration";

  // -------------------------------------------------
  // Config. Table Controls
  // -------------------------------------------------

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";

  // -------------------------------------------------
  // Project data
  // -------------------------------------------------

  private projectName:  string;
  private location: string;
  private properties = [];

  // -------------------------------------------------
  // Waiting page params
  // -------------------------------------------------

  private waiting: boolean = false;
  private waitMsg: string = "";

  // -------------------------------------------------
  // Construction functions
  // -------------------------------------------------

  constructor(
    private activeRouter: ActivatedRoute, 
    private router: Router, 
    private http: Http,
    private service : HighlightJsService){
  }

  ngOnInit() {
    // Load project name from routing params
    this.activeRouter.params.subscribe(
      (params: Params) => {
        let projectName = params["name"];
        this.projectName = projectName;
      }
    );
    // Get project info from triple store
    this.loadProjectInfo();
  }

  // -------------------------------------------------
  // Load info of project to be executed
  // -------------------------------------------------

  private loadProjectInfo(){
    let destination = BASE_SERVER_URL + "project-data/project-info";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          console.log(response);
          this.extractData(response);
        } else {
          alert( response.errorMessage );
        }
      }
    }
    xhr.onloadstart = (event) => {
      this.waitMsg = "Retrieving Project Information ...";
      this.waiting = !this.waiting;
    }
    xhr.onloadend = (event) => {
      this.waitMsg = "";
      this.waiting = !this.waiting;
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server or refresh the page.");
    }
    xhr.send(this.projectName);
  } 

  private extractData(data){
    this.location = data.location;
    console.log(data.properties);
    for( var item of data.properties ){
      for( var key in item){
        var p = {
          "name": key,
          "value": item[key]
        };
        this.properties.push(p);
      }
    }
  }

  // -------------------------------------------------
  // Submit the project to cluster
  // -------------------------------------------------

  private execute(){
    let destination = BASE_SERVER_URL + "project-execution/run";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          this.submitLogs.nativeElement.insertAdjacentHTML("beforeend", response.logs);
          this.shown = "logs";
        } else {
          alert( response.errorMessage );
        }
      }
    }
    xhr.onloadstart = (event) => {
      this.waitMsg = "Submitting Project into Cluster ...";
      this.waiting = !this.waiting;
    }
    xhr.onloadend = (event) => {
      this.waitMsg = "";
      this.waiting = !this.waiting;
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server or refresh the page.");
    }
    xhr.send(this.projectName);
  }

  // -------------------------------------------------
  // Select panel to show 
  // -------------------------------------------------

  private selectConfigTable(){
    this.shown = "configuration";
  }

  private selectSubmitLogs(){
    this.shown = "submitLogs";
  }

}
