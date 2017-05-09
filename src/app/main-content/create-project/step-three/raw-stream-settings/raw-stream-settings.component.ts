import { Component, OnInit, Input } from '@angular/core';
import { ProjectDataService } from '../../../../app-services/project-data.service';

@Component({
  selector: 'raw-stream-settings',
  templateUrl: './raw-stream-settings.component.html',
  styleUrls: ['./raw-stream-settings.component.css']
})
export class RawStreamSettingsComponent implements OnInit {

  @Input() selectedComponentId;

  private type;
  private filepath;
  private url;

  constructor(private projectDataService: ProjectDataService) { }

  ngOnInit() {
    var settings = this.projectDataService.getComponentSettingsById(this.selectedComponentId);
    this.type = ( typeof settings.type == 'undefined' ) ? "WebServices" : settings.type;
    this.filepath = ( typeof settings.filepath == 'undefined' ) ? "" : settings.filepath;
    this.url = ( typeof settings.url == 'undefined' ) ? "" : settings.url;
  }

  selectFile( event ){
    console.log(event.target.files[0].name);
    this.filepath = event.target.files[0].name;
  }

  saveSettings() {
    var settings;
    if( this.type == "WebServices" ){
      settings = {
        "type": "WebServices",
        "url": this.url
      } 
    } else if( this.type == "Files" ){
      settings = {
        "type": "Files",
        "filepath": this.filepath
      }
    }
    ProjectDataService.setComponentSettingsById(this.selectedComponentId, settings);
    console.log(this.projectDataService.getWorkflowInfo());
  }

}
