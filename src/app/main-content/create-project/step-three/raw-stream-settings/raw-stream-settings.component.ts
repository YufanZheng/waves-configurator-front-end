import { Component, OnInit, Input } from '@angular/core';
import { ProjectDataService } from '../../project-data.service';

import { JsPlumbSingleton } from '../jsPlumb-singleton';

// Use jsPlumb for connection component
declare var jsPlumb: any;
// Use jQuery
import $ from 'jquery/dist/jquery';
@Component({
  selector: 'raw-stream-settings',
  templateUrl: './raw-stream-settings.component.html',
  styleUrls: ['./raw-stream-settings.component.css']
})
export class RawStreamSettingsComponent implements OnInit {

  @Input() componentId;

  private type;
  private filepath;
  private folderpath;
  private url;

  constructor(private service: ProjectDataService) { }

  ngOnInit() {
    var settings = this.service.getComponentSettingsById(this.componentId);
    this.type = ( typeof settings.type == 'undefined' ) ? "WebServices" : settings.type;
    this.filepath = ( typeof settings.filepath == 'undefined' ) ? "" : settings.filepath;
    this.folderpath = ( typeof settings.folderpath == 'undefined' ) ? "" : settings.folderpath;
    this.url = ( typeof settings.url == 'undefined' ) ? "" : settings.url;
  }

  saveSettings() {
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
    this.service.setComponentSettingsById(this.componentId, settings);
    console.log(this.service.getWorkflowInfo());
  }

  deleteComponent(){
    JsPlumbSingleton.getInstance().remove( this.componentId );
  }

  detachConnections(){
    var allConns = JsPlumbSingleton.getInstance().getAllConnections();
    for( let conn of allConns ){
      if( conn.sourceId == this.componentId ){
        JsPlumbSingleton.getInstance().deleteConnection(conn);
      }
    }
  }

}
