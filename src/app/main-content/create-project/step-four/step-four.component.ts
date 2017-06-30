import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {

  // -------------------------------------------------
  // Input metrics information form ProjectDataService
  // -------------------------------------------------

  @Input() metrics;

  // -------------------------------------------------
  // Variable to control steps
  // -------------------------------------------------

  @Output() stepEvent = new EventEmitter<number>();

  // -------------------------------------------------
  // Metrics Reporter List
  // -------------------------------------------------

  private reporterList = ["Console"];

  // -------------------------------------------------
  // Construction Functions
  // -------------------------------------------------

  constructor(private service: ProjectDataService) { }

  ngOnInit() {
    this.metrics = this.service.getMetricsInfo();
  }

  // -------------------------------------------------
  // Step change function
  // -------------------------------------------------

  stepChange(step){
    this.stepEvent.emit(step);
  }

}
