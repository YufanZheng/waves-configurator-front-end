import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// Use jQuery
import $ from 'jquery/dist/jquery';

const BASE_SERVER_URL = "http://localhost:8080/waves-configurator/jarxs/";

@Component({
  selector: 'import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent{

  // -------------------------------------------------
  // Waiting page params
  // -------------------------------------------------

  private waiting: boolean = false; 
  private waitMsg: string  = "";

  // -------------------------------------------------
  // Import Project Information
  // -------------------------------------------------

  private project: any;

  // -------------------------------------------------
  // Construction function
  // -------------------------------------------------

  constructor( private router: Router ){}
  
  // -------------------------------------------------
  // Load Trig From Local
  // -------------------------------------------------

  loadTrig( event ){
    if (File && FileReader && FileList && Blob) { // Check for the various File API support.
      var file = event.srcElement.files[0];
      if( file ){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onerror = this.errorHandler;
        reader.onload = this.loaded;
      }
    } else { alert('The File APIs are not fully supported by your browser.'); }
  }

  private loaded(evt) {  
    // Obtain the file content and put it to textarea    
    var fileString = evt.target.result;
    $('textarea').val(fileString); 
  }

  private errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
      alert("The file could not be read");
    }
  }

  // -------------------------------------------------
  // Upload trig to server
  // -------------------------------------------------

  uploadProject( trig ){

    let destination = BASE_SERVER_URL + "project-data/load-trig";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");

    // Response recieved
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          // Server successfully put the TriG into Triple Store
          this.project = response;
          alert( "Successfully upload project " + this.project.projectName+ ", the TriG configuration is located at: " + this.project.graphLocation );
          this.router.navigate(['/execute-project', this.project.projectName]);
        } else {
          // Server side will tell the error message
          alert( response.errorMessage );
        }
      }
    }

    // Start waiting status
    xhr.onloadstart = (event) => {
      this.waitMsg = "Uploading Project ...";
      this.waiting = !this.waiting;
    }
    // Waiting status ended
    xhr.onloadend = (event) => {
      this.waitMsg = "";
      this.waiting = !this.waiting;
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server.");
    }
    xhr.send(trig);
  }
}
