import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
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

const COMPONENT_LIST_FILE_PATH = "assets/app-data/component-list.json";

@Component({
  selector: 'step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {

  // -------------------------------------------------
  // Input project information form ProjectDataService
  // -------------------------------------------------

  @Input() workflow;

  // -------------------------------------------------
  // Variable to control steps
  // -------------------------------------------------

  @Output() stepEvent = new EventEmitter<number>();
  
  // -------------------------------------------------
  // Selected Components
  // -------------------------------------------------

  private selectedComponentId;
  private selectedComponentType;

  // -------------------------------------------------
  // Use jsPlumbInstance to connect components
  // ------------------------------------------------- 

  private jsPlumbInstance;

  // -------------------------------------------------
  // App Data to Load the component list
  // ------------------------------------------------- 

  private componentList;

  // -------------------------------------------------
  // Construction functions
  // ------------------------------------------------- 

  constructor(private service: ProjectDataService, private http: Http) { 
    this.componentList = JSON.parse( this.read(COMPONENT_LIST_FILE_PATH) );
    this.selectedComponentType = "";
    this.jsPlumbInstance = JsPlumbSingleton.getInstance();
  }

  ngOnInit() { 
    this.workflow = this.service.getWorkflowInfo();
  }

  private read(path){
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var text = request.responseText;
    return text;
  }

  // -------------------------------------------------
  // Drag & Drop functions
  // ------------------------------------------------- 

  ngAfterViewInit() {
    // Make draggable
    $('.draggable').draggable({
      containment: ".droppable",
      revert: 'invalid',
      cursor: 'move',
      appendTo: ".droppable",
      helper: this.moveHelper
    });
    // Make dropable
    $('.droppable').droppable( {
        drop: (event, ui) => {
          this.onDrop(event, ui);
        }
    });
  }

  moveHelper( event ) {
    return `<div class="draggable component" type="` + $(this).text().trim() + `">
                <img src="` + $(this).children("img").attr("src") + `">
                <p>` + $(this).text().trim() + `</p>
                <div class="anchor-out"></div>
            </div>`;
  }

  onDrop(event, ui) {
    if( $(ui.draggable).hasClass("draggable") ){
      // Step 1: Append to .droppable div
      var newDiv = $(ui.helper).clone(false).removeClass("draggable");
      $('.droppable').append(newDiv);
      // Step 2: Init the node with jsPlumb so that it could be connected
      JsPlumbSingleton.initNode(newDiv);
      // Step 3: Add the new component information into project data
      var newComponent = {
          "id": newDiv.attr("id"),
          "componentType": newDiv.text().trim(),
          "xPosition": newDiv.offset().left - $('.droppable').offset().left,
          "yPosition": newDiv.offset().top - $('.droppable').offset().top,
          "linksTo": [],
          "settings": {}
      };
      this.service.addWorkflowComponent(newComponent);
    }
  }

  // -------------------------------------------------
  // Step change functions
  // -------------------------------------------------

  stepChange(step){
    this.updateComponentsLocation();
    this.updateConnections();
    this.service.setWorflowInfo(this.workflow);
    this.stepEvent.emit(step);
    console.log(this.service.getWorkflowInfo());
    console.log("WARNING!!!!!!!!!!!!!!!!!!!!!!: Update connections don't work.")
  }

  // -------------------------------------------------
  // Select component to show the settings panel
  // -------------------------------------------------

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

  // -------------------------------------------------
  // Update the component information
  // -------------------------------------------------

  private updateComponentsLocation(){
    var componentDivs = document.getElementsByClassName('component');
    for( var i = 0 ; i < componentDivs.length ; i++ ){
      var id = componentDivs[i].id;
      var div = $("#"+id);
      var xPosition = div.offset().left - $('.droppable').offset().left;
      var yPosition = div.offset().top - $('.droppable').offset().top;
      this.service.setComponentLocationById(id, xPosition, yPosition);
    }
  }

  private updateConnections(){
    var conns = JsPlumbSingleton.getInstance().getAllConnections();
    console.log(conns);
    this.service.updateConnections(conns);
  }

  // -------------------------------------------------
  // Find image path for specific type
  // -------------------------------------------------

  private imgSourcePath(type: string){
    return "assets/img/workflow/" + type.toLowerCase().split(' ').join('_') + ".png";
  }

}
