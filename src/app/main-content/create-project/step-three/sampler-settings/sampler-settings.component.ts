import { Component, OnInit, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'sampler-settings',
  templateUrl: './sampler-settings.component.html',
  styleUrls: ['./sampler-settings.component.css']
})
export class SamplerSettingsComponent extends ComponentSettings implements OnInit {

  @Input() componentId;

  constructor( service: ProjectDataService ) { 
    super(service);
  }

  ngOnInit() {
  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }
}
