import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit, OnDestroy {

  // A variable to save current creating's project data
  @Input() cluster;
  private defaultPort;

  constructor(private projectDataService: ProjectDataService, private _http: Http) { 
    this._http.get('src/config/default-port.json')
        .subscribe(res => this.defaultPort = res.json());
  }

  ngOnInit() { 
    this.cluster = this.projectDataService.getClusterInfo();
  }

  ngOnDestroy() {
    this.projectDataService.setClusterInfo(this.cluster);
  }

  private chooseEngine(type){
    this.cluster.rspEngine = type;
    this.projectDataService.setClusterInfo(this.cluster);
  }

  private changeDefaultPort(type, index){
    this.cluster.services[index].defaultPort = this.defaultPort[type];
  }

  private addService(service, index){
    this.projectDataService.addClusterService(service, index);
  }

  private removeService(index){
    this.projectDataService.removeClusterService(index);
  }

  private checkConnectionForAll(){
    for( var i = 0; i < this.cluster.services.length; i++ ){
      var ip = this.cluster.services[i].ip;
      var port = this.cluster.services[i].port;
      this.cluster.services[i].connectionStatus = this.checkConnection(ip, port);
      this.projectDataService.setClusterInfo(this.cluster);
    }
  }

  private checkConnection(ip, port){
    return "no";
  }

  /**
   * 
   * @param serviceName i.e. "Coordinator" etc
   * @param serviceList 
   * @param index
   * 
   * @desc  Only the first time appearence's label will be shown in page
   */
  private firstAppearance(serviceName, serviceList, index){
    for( var i: number = 0; i < index; i++ ){
      //console.log(serviceName, serviceList[i].name);
      if( serviceName == serviceList[i].name )
        return false; 
    }
    return true;
  }

 /**
  * 
  * @param serviceType 
  * @param serviceList 
  * @param index 
  *
 * @desc  "Add" row button will only be shown when it's the first time show in this type
  */
  private firstAppearanceInType(serviceType, serviceList, index){
    for( var i = 0; i < index; i++ ){
      if( serviceType == serviceList[i].types[0] && index != i ){
        return false;
      }
    }
    return true;
  }

}
