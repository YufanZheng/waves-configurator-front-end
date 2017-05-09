import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Injectable()
export class ProjectDataService {
    
    private static projectData;
    private _baseUrl: string = "http://localhost:8080/waves-configurator/jarxs/project-data/";

    constructor( private _http: Http ) { 
        this.initData();
    }

    /*-----------------------------------+
     |     Http POST, PUT, GET etc.      |
     +-----------------------------------*/

    saveTrigInTripleStore( trig ){
        let url = this._baseUrl + "load-trig";
        let body = trig;
        let headers = new Headers();
        headers.append("Content-Type", "text/plain; charset=utf-8");
        /*
        $.ajax({
            type: "POST",
            url: url,
            data: trig,
            contentType: "text/plain; charset=utf-8"
        });
        */

        this._http.post(url, body, headers)
            .subscribe(
                () => {
                    alert("File successfully uploaded!");
                },
                err => console.error(err)
            );

    }

    /*-----------------------------------+
     |        Getters and Setters        |
     +-----------------------------------*/

    getProjectInfo(){
        return ProjectDataService.projectData.project;
    }

    setProjectInfo(project){
        ProjectDataService.projectData.project = project;
    }

    getClusterInfo(){
        return ProjectDataService.projectData.cluster;
    }

    setClusterInfo(cluster){
        ProjectDataService.projectData.cluster = cluster;
    }

    addClusterService(service, index){
        ProjectDataService.projectData.cluster.services.splice(index, 0, service);
    }

    removeClusterService(index){
        ProjectDataService.projectData.cluster.services.splice(index, 1);
    }

    getWorkflowInfo(){
        return ProjectDataService.projectData.workflow;
    }

    setWorflowInfo(workflow){
        ProjectDataService.projectData.workflow = workflow;
    }

    /*-----------------------------------+
     |          Workflow Settings        |
     +-----------------------------------*/

    static addWorkflowComponent(newComponent){
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

    static setComponentSettingsById(componentId, settings){
        for( var i = 0; i < ProjectDataService.projectData.workflow.components.length; i++ ){
            var currentComponent = ProjectDataService.projectData.workflow.components[i];
            if( currentComponent.id == componentId ){
                ProjectDataService.projectData.workflow.components[i].settings = settings;
                break;
            }
        }
    }

    static addWorkflowLink(sourceId, targetId){
        for( var i = 0; i < ProjectDataService.projectData.workflow.components.length; i++ ){
            var currentComponent = ProjectDataService.projectData.workflow.components[i];
            if( currentComponent.id == sourceId ){
                ProjectDataService.projectData.workflow.components[i].linksTo.push(targetId);
                break;
            }
        }
    }

    /*-----------------------------------+
     |         Init Project Data         |
     +-----------------------------------*/

    initData() {
        ProjectDataService.projectData = {  
            "project":{  
                "name":"",
                "description":"",
                "license":"",
                "version":"1.0.0"
            },
            "cluster":{  
                "rspEngine":"unknown",
                "type":"Docker",
                "supervisor":"Supervisord",
                "services":[  
                    {  
                        "name":"Coordinator",
                        "types":[  
                        "Zookeeper"
                        ],
                        "ip":"",
                        "port":2181,
                        "ipPlaceholder":"IP address",
                        "defaultPort":2181,
                        "connectionStatus":"unknown"
                    },
                    {  
                        "name":"Messaging",
                        "types":[  
                        "Kafka"
                        ],
                        "ip":"",
                        "port":9092,
                        "ipPlaceholder":"IP address",
                        "defaultPort":9092,
                        "connectionStatus":"unknown"
                    },
                    {  
                        "name":"NoSQL DB",
                        "types":[  
                        "Redis",
                        "MongoDB",
                        "InfluxDB"
                        ],
                        "ip":"",
                        "port":6379,
                        "ipPlaceholder":"IP address",
                        "defaultPort":6379,
                        "connectionStatus":"unknown"
                    },
                    {  
                        "name":"Sparql DB",
                        "types":[  
                        "RDF4J",
                        "Virtuoso",
                        "Jena"
                        ],
                        "ip":"",
                        "port":8080,
                        "ipPlaceholder":"IP address",
                        "defaultPort":8080,
                        "connectionStatus":"unknown"
                    },
                    {  
                        "name":"RSP Engine",
                        "types":[  
                        "Storm-Nimbus"
                        ],
                        "ip":"",
                        "port":6627,
                        "ipPlaceholder":"Nimbus IP address",
                        "defaultPort":6627,
                        "connectionStatus":"unknown"
                    },
                    {  
                        "name":"RSP Engine",
                        "types":[  
                        "Storm-UI"
                        ],
                        "ip":"",
                        "port":8080,
                        "ipPlaceholder":"UI IP address",
                        "defaultPort":8080,
                        "connectionStatus":"unknown"
                    },
                    {  
                        "name":"RSP Engine",
                        "types":[  
                        "Storm-Supervisor"
                        ],
                        "ip":"",
                        "port":6700,
                        "ipPlaceholder":"Supervisor IP address",
                        "defaultPort":6700,
                        "connectionStatus":"unknown"
                    }
                ]
            },
            "workflow":{
                "components":[
                ]
            }
        };
    }
}
