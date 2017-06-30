import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'rdf-stream-settings',
  templateUrl: './rdf-stream-settings.component.html',
  styleUrls: ['./rdf-stream-settings.component.css']
})
export class RdfStreamSettingsComponent extends ComponentSettings implements OnInit, OnDestroy {

  @Input() componentId;

  private type;
  private filepath;
  private folderpath;
  private url;

  constructor( service: ProjectDataService ) { 
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
    var settings = this.service.getComponentSettingsById(this.componentId);
    this.type = ( typeof settings.type == 'undefined' ) ? "WebServices" : settings.type;
    this.filepath = ( typeof settings.filepath == 'undefined' ) ? "" : settings.filepath;
    this.folderpath = ( typeof settings.folderpath == 'undefined' ) ? "" : settings.folderpath;
    this.url = ( typeof settings.url == 'undefined' ) ? "" : settings.url;
  }

  saveSettings(componentId) {
    var settings;
    if( this.type == "WebServices" ){
      settings = {
        "type": "WebServices",
        "url": this.url
      } 
    } else if( this.type == "Folder" ){
      settings = {
        "type": "Folder",
        "folderpath": this.folderpath
      }
    } else if( this.type == "File" ){
      settings = {
        "type": "File",
        "filepath": this.folderpath
      }
    }
    this.service.setComponentSettingsById(componentId, settings);
  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }

}
