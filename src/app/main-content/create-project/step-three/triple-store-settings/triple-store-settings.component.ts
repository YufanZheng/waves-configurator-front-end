import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'triple-store-settings',
  templateUrl: './triple-store-settings.component.html',
  styleUrls: ['./triple-store-settings.component.css']
})
export class TripleStoreSettingsComponent extends ComponentSettings implements OnInit, OnDestroy {

  @Input() componentId;

  private login;
  private pwd;
  private storeType;
  private location;

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
    this.login = ( typeof settings.login == 'undefined' ) ? "" : settings.login;
    this.pwd = ( typeof settings.password == 'undefined' ) ? "" : settings.password;
    this.storeType = ( typeof settings.storeType == 'undefined' ) ? "sesame" : settings.storeType;
    this.location = ( typeof settings.location == 'undefined' ) ? "" : settings.location;
  }

  saveSettings(componentId) {
    var settings = {
      "login" : this.login,
      "password" : this.pwd,
      "storeType" : this.storeType,
      "location" : this.location
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
