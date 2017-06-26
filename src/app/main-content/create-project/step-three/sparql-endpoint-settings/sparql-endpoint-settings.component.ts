import { Component, OnInit, OnDestroy, OnChanges, Input, ViewChild } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import 'jquery';
import 'bootstrap';

@Component({
  selector: 'sparql-endpoint-settings',
  templateUrl: './sparql-endpoint-settings.component.html',
  styleUrls: ['./sparql-endpoint-settings.component.css']
})
export class SparqlEndpointSettingsComponent extends ComponentSettings implements OnInit, OnDestroy {

  @Input() componentId;
  private showResult = false;
  private resultTable = "";

  private location;
  private refreshInterval;
  private query;
  private sparqlResult;

  constructor( service: ProjectDataService, private http: Http ) { 
    super(service);
  }

  ngOnInit() {
    this.loadSettings( this.componentId );
  }
        
  ngOnChanges(changes){
    if(changes.componentId){
      this.saveSettings( changes.componentId.previousValue );
      this.loadSettings( changes.componentId.currentValue );
    }
  }

  ngOnDestroy() {
    this.saveSettings(this.componentId);
  }

  loadSettings(componentId) {
    var settings = this.service.getComponentSettingsById(componentId);
    this.location = ( typeof settings.location == 'undefined' ) ? 'http://dbpedia.org/sparql' : settings.location;
    this.refreshInterval = ( typeof settings.refreshInterval == 'undefined' ) ? 120 : settings.refreshInterval;
    this.query = ( typeof settings.query == 'undefined' ) ? 'select distinct ?Concept where {[] a ?Concept} LIMIT 100' : settings.query;
  }

  saveSettings(componentId) {
    var settings = {
      "location": this.location,
      "refreshInterval": this.refreshInterval,
      "query": this.query
    }
    this.service.setComponentSettingsById(componentId, settings);
  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }

  public sparql(endpoint, query) {
    var params = "query=" + this.query + "&" + "format=text/html";

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", this.location+"?"+params, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "text/html");

    xhr.onreadystatechange = (event) => {
      if(xhr.readyState == 4 && xhr.status == 200) {
        this.resultTable = xhr.responseText;
        this.showResult = true;
      }
      if(xhr.readyState == 4 && xhr.status == 404 ){
        alert("ERROR: Can not find the endpoint: " + this.location);
      }
      if(xhr.readyState == 4 && xhr.status == 400 ){
        alert("ERROR: Invalid query: " + this.query);
      }
    }
    xhr.send(null);
  }
}
