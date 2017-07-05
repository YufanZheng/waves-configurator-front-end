import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Injectable()
export class ProjectDataService {
    
  // -------------------------------------------------
  // Load info of project to be executed
  // -------------------------------------------------

  private projectData;

  // -------------------------------------------------
  // Construction Functions
  // -------------------------------------------------

  constructor( private http: Http ) { 
    this.initData();
  }

  private initData() {
    // Load default project data
    var text = this.read('assets/app-data/default-project.json');
    this.projectData = JSON.parse(text);
  }

  private read(path){
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var text = request.responseText;
    return text;
  }

  // -------------------------------------------------
  // Getters and Setters
  // -------------------------------------------------

  getProjectInfo(){
    return this.projectData.project;
  }

  setProjectInfo(project){
    this.projectData.project = project;
  }

  getClusterInfo(){
    return this.projectData.cluster;
  }

  setClusterInfo(cluster){
    this.projectData.cluster = cluster;
  }

  getWorkflowInfo(){
    return this.projectData.workflow;
  }

  setWorflowInfo(workflow){
    this.projectData.workflow = workflow;
  }

  getMetricsInfo(){
    return this.projectData.metrics;
  }

  setMetricsInfo(metrics){
    this.projectData.metrics = metrics;
  }

  // -------------------------------------------------
  // Handle Workflow Component
  // -------------------------------------------------

  addWorkflowComponent(newComponent){
    this.projectData.workflow.components.push(newComponent);
    return this.projectData.workflow;
  }

  removeWorkflowComponentById(componentId){
    var components = this.getWorkflowInfo().components;
    for( var i = 0; i < components.length; i++ ){
      if( componentId == components[i].id ){
        components.splice(i, 1);
        break;
      }
    }
    return this.projectData.workflow;
  }

  // -------------------------------------------------
  // Handle Workflow Component Settings
  // -------------------------------------------------

  getComponentSettingsById(componentId){
    var components = this.getWorkflowInfo().components;
    var selectedComponent;
    for( var i = 0; i < components.length; i++ ){
      if( componentId == components[i].id ){
        selectedComponent = components[i];
        break;
      }
    }
    if( typeof selectedComponent != undefined ){
      return selectedComponent.settings;
    }else{
      throw new Error("The selected id doesn't exist");
    }
  }

  setComponentSettingsById(componentId, settings){
    for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
      var currentComponent = this.projectData.workflow.components[i];
      if( currentComponent.id == componentId ){
        // If componentId exists, save its settings
        // If not exists, do nothing
        this.projectData.workflow.components[i].settings = settings;
        break;
      }
    }
    return this.projectData.workflow;
  }

  // -------------------------------------------------
  // Handle Workflow Component Location
  // -------------------------------------------------

  setComponentLocationById(componentId, xPosition, yPosition){
    for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
      var currentComponent = this.projectData.workflow.components[i];
      if( currentComponent.id == componentId ){
        this.projectData.workflow.components[i].settings.xPosition = xPosition;
        this.projectData.workflow.components[i].settings.yPosition = yPosition;
        break;
      }
    }
    return this.projectData.workflow;
  }

  // -------------------------------------------------
  // Handle Workflow Component Connections
  // -------------------------------------------------

  addWorkflowConnection(sourceId, targetId){
    for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
      var currentComponent = this.projectData.workflow.components[i];
      if( currentComponent.id == sourceId && !currentComponent.linksTo.includes(targetId) ){
        currentComponent.linksTo.push(targetId);
        this.printAllConns();
        return this.projectData.workflow;
      }
    }
    return this.projectData.workflow;
  }

  removeAllConnections(){
    for( var i = 0 ; i < this.projectData.workflow.components.length ; i++ ){
      var component = this.projectData.workflow.components[i];
      var newComponent = {
        "id": component.id,
        "componentType": component.componentType,
        "xPosition": component.xPosition,
        "yPosition": component.yPosition,
        "linksTo": [],
        "settings": component.settings
      };
      this.projectData.workflow.components[i] = newComponent;
    }
  }

  updateConnections(conns){
    this.removeAllConnections();
    for( let conn of conns ){
      var sourceId = conn.sourceId;
      var targetId = conn.targetId;
      this.addWorkflowConnection(sourceId, targetId);
    }
  }

  public printAllConns(){
    var workflow = this.projectData.workflow;
    for( var i = 0 ; i < workflow.components.length ; i++ ){
      var component = workflow.components[i];
      for( var j = 0 ; j < component.linksTo.length ; j ++ ){
        console.log( component.id + " -> " + component.linksTo[j] );
      }
    }
  }
}
