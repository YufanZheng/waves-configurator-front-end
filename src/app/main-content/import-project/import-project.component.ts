import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProjectDataService } from '../../app-services/project-data.service';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Component({
  selector: 'import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent{

  private serverUri: string = "http://localhost:8080/waves-configurator/jarxs/project-data/";

  constructor( private http: Http ){

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
        reader.onerror = this.errorHandler;
        reader.onload = this.loaded;
      }
    } else {
      alert('The File APIs are not fully supported by your browser.');
    }
  }

  uploadProject( trig ){
    // Save the TriG configuration file into Triple Store.
    let url     = this.serverUri + "load-trig";
    let body    = trig;
    let headers = new Headers();
    headers.append("Content-Type", "text/plain; charset=utf-8");
    // Post TriG String to Server
    this.http.post(url, body, headers)
      .map( res => res.text() )
      .subscribe(
          (msg) => { 
              alert(msg);
          },
          error => { alert("Server Connection Error: Please check if the J2EE server is started.") }
    );
  }

  private loaded(evt) {  
    // Obtain the read file data    
    var fileString = evt.target.result;
    $('textarea').val(fileString); 
  }

  private errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
      alert("The file could not be read");
    }
  }
}
