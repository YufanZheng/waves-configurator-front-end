import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../../app-services/project-data.service';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Component({
  selector: 'import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent{

  constructor(private projectDataService: ProjectDataService){

  }
  
  loadTrig( event ){
    // Check for the various File API support.
    if (File && FileReader && FileList && Blob) {
      // Load the TriG file
      var file = event.srcElement.files[0];
      if( file ){
        // Read the content of file
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        // Handle success, and errors
        reader.onerror = this._errorHandler;
        reader.onload = this._loaded;
      }
    } else {
      alert('The File APIs are not fully supported by your browser.');
    }
  }

  runProgram( trigConfig ){
    // Save the TriG configuration file into Triple Store.
    this.projectDataService.saveTrigInTripleStore(trigConfig);
  }

  private _loaded(evt) {  
    // Obtain the read file data    
    var fileString = evt.target.result;
    $('textarea').val(fileString); 
  }

  private _errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
      alert("The file could not be read");
    }
  }
}
