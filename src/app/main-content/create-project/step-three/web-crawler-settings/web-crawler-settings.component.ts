import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'web-crawler-settings',
  templateUrl: './web-crawler-settings.component.html',
  styleUrls: ['./web-crawler-settings.component.css']
})
export class WebCrawlerSettingsComponent extends ComponentSettings implements OnInit, OnDestroy {

  @Input() componentId;

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

  }

  saveSettings(componentId) {

  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }
}
