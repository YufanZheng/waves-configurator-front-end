import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'sparql-endpoint-settings',
  templateUrl: './sparql-endpoint-settings.component.html',
  styleUrls: ['./sparql-endpoint-settings.component.css']
})
export class SparqlEndpointSettingsComponent extends ComponentSettings implements OnInit, OnDestroy {

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
