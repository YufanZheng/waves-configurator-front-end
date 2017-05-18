import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ProjectDataService } from '../project-data.service';
import { JsPlumbSingleton } from './jsPlumb-singleton';

// Use jQuery
import $ from 'jquery/dist/jquery';
// User jQuery UI to drag and drop
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/draggable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
// Use jsPlumb for connection component
declare var jsPlumb: any;

@Component({
  selector: 'step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']


})
export class StepThreeComponent implements OnInit, OnDestroy {

  // A variable to save project data which is currently created
  @Input() workflow;
  
  private selectedComponentId;
  private selectedComponentType;
  private jsPlumbInstance;

  constructor(private service: ProjectDataService) { 
    this.selectedComponentType = "";
    this.jsPlumbInstance = JsPlumbSingleton.getInstance();
  }

  ngOnInit() { 
    this.workflow = this.service.getWorkflowInfo();
    // Draw each workflow components into panel
    this.drawWorkflow(this.workflow);
    //JsPlumbSingleton.bindConnEvents();
  }

  ngOnDestroy() {
    this.service.setWorflowInfo(this.workflow);
  }

  selector = {
    "dataSources":  ["Raw Stream", "RDF Stream", "Document Feed", "Triple Store", "Sparql Endpoint", "External Sources"],
    "functions":    ["RDF Converter", "Compresser", "Quantitative Filter", "Qualitative Filter"],
    "wavesFilters": ["Semantic Filter", "Reasoning Filter"],
    "dataAnalysis": ["Anomaly Detection"]
  };

  imgSourcePath(type: string){
    return "src/assets/img/workflow/" + type.toLowerCase().split(' ').join('_') + ".png";
  }

  ngAfterViewInit() {

    /* Init draggable component */
    $('.draggable').draggable({
      // Could only be draggable in the droppable space
      containment: ".droppable",
      // If the drop space is not correct, ui will come back to original place
      revert: 'invalid',
      // Cursor style -> 'move'
      cursor: 'move',
      // Drop space
      appendTo: ".droppable",
      // During the time when we drag and move the ui, the helper helps to locate where we are
      helper: this.moveHelper
    });

    /* Dropppable component */
    $('.droppable').droppable( {
        // When drop event happens, handle drop event
        drop: this.handleDropEvent
    });
  }

  moveHelper( event ) {
    return `<div class="draggable component" type="` + $(this).text().trim() + `">
                <img src="` + $(this).children("img").attr("src") + `">
                <p>` + $(this).text().trim() + `</p>
                <div class="anchor-out"></div>
            </div>`;
  }

  handleDropEvent( event, ui ) {
    // Check if the div comes from selector div : class == "draggable"
    if( $(ui.draggable).hasClass("draggable") ){
      var newDiv = $(ui.helper).clone(false).removeClass("draggable");
      $('.droppable').append(newDiv);
      JsPlumbSingleton.initNode(newDiv);
      var newComponent = {
            "id": newDiv.attr("id"),
            "componentType": newDiv.text().trim(),
            "xPosition": newDiv.offset().left - $('.droppable').offset().left,
            "yPosition": newDiv.offset().top - $('.droppable').offset().top,
            "linksTo": [],
            "settings": {}
        };
      //ProjectDataService.addWorkflowComponent(newComponent);
    }
  }

  selectComponent(evt: any): void {
    // Get the selected component Id
    var componentId;
    for( var i:number = 0; i < evt.path.length; i++){
      if( evt.path[i].id != "" ){
        componentId = evt.path[i].id;
        break;
      }
    }
    // Show selection with border colors
    if (typeof componentId != 'undefined'){
      // If select on component, change the seletced component's border color
      $("#"+componentId).siblings().removeClass("selected-border");
      $("#"+componentId).toggleClass("selected-border");
      this.selectedComponentId = componentId;
      this.selectedComponentType = $("#"+componentId).text().trim() ;
    } else { 
      // If click on background, deselect all components
      $('.droppable').find('.component').removeClass("selected-border");
      this.selectedComponentType = "";
     }
  }

  private drawWorkflow(workflow: any): void{
    this.appendComponents(workflow);
    this.connectComponents(workflow);
  }

  private appendComponents(workflow: any): void{
    for( var i = 0; i < this.workflow.components.length; i++ ){
      var component = this.workflow.components[i];
      // Create a new div and append to the '.droppable'
      var newDiv = $('<div>', {"class": "component"})
          .append( $('<img src="' + this.imgSourcePath(component.componentType)+ '"/>') )
          .append( $('<p>' + component.componentType + '</p>') )
          .append( $('<div>', {"class": "anchor-out"}) )
          .attr("type", component.componentType)
          .attr("id", component.id)
          .css("position", "absolute")
          .css("left", component.xPosition)
          .css("top", component.yPosition)
          .clone(false)
      ;
      $('.droppable').append(newDiv);
      JsPlumbSingleton.initNode(newDiv);
    }
  }

  private connectComponents(workflow: any): void{
    for( var i = 0; i < this.workflow.components.length; i++ ){
      var sourceId = this.workflow.components[i].id;
      var targetIds = this.workflow.components[i].linksTo;
      console.log(targetIds);
      for( var j = 0; j < targetIds.length; j++ ){
        var targetId = targetIds[j];
        //console.log("Connect node :" + sourceId + " " + targetId);
        JsPlumbSingleton.connectNode(sourceId, targetId);
      }
    }
  }
}
