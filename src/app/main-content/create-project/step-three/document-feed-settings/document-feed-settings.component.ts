import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

import { FileUploader } from 'ng2-file-upload';

const URL = "http://localhost:8080/waves-configurator/jarxs/project-file/upload";

@Component({
  selector: 'document-feed-settings',
  templateUrl: './document-feed-settings.component.html',
  styleUrls: ['./document-feed-settings.component.css']
})
export class DocumentFeedSettingsComponent extends ComponentSettings implements OnInit, OnDestroy {

  @Input() componentId;
  public uploader:FileUploader = new FileUploader({url: URL});
  public showPreview = false;
  public content = "";

  constructor( service: ProjectDataService ) { 
    super(service);
  }

  ngOnInit() {
    this.loadSettings(this.componentId);
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
    this.uploader.queue = ( typeof settings.queue == 'undefined' ) ? [] : settings.queue;
    this.uploader.progress = ( typeof settings.progress == 'undefined' ) ? 0 : settings.progress;
  }

  saveSettings(componentId){
    var settings;
    settings = {
      "queue": this.uploader.queue,
      "progress": this.uploader.progress
    } 
    this.service.setComponentSettingsById(componentId, settings);
  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }

  preview(file){
    var reader = new FileReader();
    reader.onload = (event) => {
      this.content = reader.result;
      this.showPreview = true;
    };
    reader.readAsText(file);
  }
}


