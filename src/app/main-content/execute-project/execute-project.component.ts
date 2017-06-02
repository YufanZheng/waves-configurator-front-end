import { Directive, Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'execute-project',
  templateUrl: './execute-project.component.html',
  styleUrls: ['./execute-project.component.css']
})
export class ExecuteProjectComponent implements OnInit {

  @ViewChild('reporter') reporter;
  private shown: string = "configuration";

  private projectName:  string;
  private location: string;
  private serverUri: string  = "http://localhost:8080/waves-configurator/jarxs/";
  private properties = [];

  private waiting: boolean = false;
  private waitMsg: string = "";

  constructor(private activeRouter: ActivatedRoute, private router: Router, private http: Http){}

  ngOnInit() {
    // Load project name from routing params
    this.activeRouter.params.subscribe(
      (params: Params) => {
        let projectName = params["name"];
        this.projectName = projectName;
      }
    );
    // Get project info from triple store
    this.getProjectInfo();
  }

  private getProjectInfo(){
    let destination = this.serverUri + "project-data/project-info";
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

  private execute(){
    let destination = this.serverUri + "project-execution/run";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          console.log(response.logs);
          this.reporter.nativeElement.insertAdjacentHTML("beforeend", response.logs);
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

  private extractData(data){
    this.location = data.location;
    for( var property of data.properties ){
      for( var key in property ){
        var p = {
          "key": key,
          "value": property[key]
        };
        this.properties.push(p);
      }
    }
    this.properties = this.sortByKey(this.properties);
    console.log(this.properties);
  }

  private sortByKey(properties){
    for( var i = 0 ; i < properties.length ; i++ ){
      for( var j = i + 1 ; j < properties.length ; j++ ){
        if( properties[i].key > properties[j].key ){
          var p = properties[i];
          properties[i] = properties[j];
          properties[j] = p;
        }
      }
    }
    return properties;
  }

  private selectConfigTable(){
    this.shown = "configuration";
  }

  private selectLogsReporter(){
    this.shown = "logs";
  }

}
