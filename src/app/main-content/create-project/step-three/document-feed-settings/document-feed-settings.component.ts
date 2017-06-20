import { Component, OnInit, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

import { FileUploader } from 'ng2-file-upload';

const URL = "http://localhost:8080/waves-configurator/jarxs/project-file/upload";

@Component({
  selector: 'document-feed-settings',
  templateUrl: './document-feed-settings.component.html',
  styleUrls: ['./document-feed-settings.component.css']
})
export class DocumentFeedSettingsComponent extends ComponentSettings implements OnInit {

  @Input() componentId;
  public uploader:FileUploader = new FileUploader({url: URL});

  constructor( service: ProjectDataService ) { 
    super(service);
  }

  ngOnInit() {
    var settings = this.service.getComponentSettingsById(this.componentId);
    this.uploader.queue = ( typeof settings.queue == 'undefined' ) ? [] : settings.queue;
    this.uploader.progress = ( typeof settings.progress == 'undefined' ) ? 0 : settings.progress;
  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }

  saveSettings(){
    var settings;
    settings = {
      "queue": this.uploader.queue,
      "progress": this.uploader.progress
    } 
    this.service.setComponentSettingsById(this.componentId, settings);
    console.log(this.uploader.queue);
  }
}
