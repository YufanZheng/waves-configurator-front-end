import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Injectable()
export class ProjectDataService {
    
    private projectData;

    constructor( private _http: Http ) { 
        this.initData();
    }

    /*-----------------------------------+
     |        Getters and Setters        |
     +-----------------------------------*/
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

    /*-----------------------------------+
     |          Workflow Settings        |
     +-----------------------------------*/

    addWorkflowComponent(newComponent){
        this.projectData.workflow.components.push(newComponent);
    }

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
                this.projectData.workflow.components[i].settings = settings;
                break;
            }
        }
    }

    addWorkflowLink(sourceId, targetId){
        for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
            var currentComponent = this.projectData.workflow.components[i];
            if( currentComponent.id == sourceId ){
                this.projectData.workflow.components[i].linksTo.push(targetId);
                break;
            }
        }
    }

    /*-----------------------------------+
     |         Init Project Data         |
     +-----------------------------------*/

    initData() {
        var text = this.readStringFromFileAtPath('../../../src/app/app-data/default-project.json');
        this.projectData = JSON.parse(text);
    }

    private readStringFromFileAtPath(pathOfFileToReadFrom){
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var text = request.responseText;
        return text;
    }
}
