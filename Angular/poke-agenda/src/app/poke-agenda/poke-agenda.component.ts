import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-poke-agenda',
  templateUrl: './poke-agenda.component.html',
  styleUrls: ['./poke-agenda.component.scss']
})
export class PokeAgendaComponent implements OnInit {

  MAX_POKE : number = 151;
	id : number;
	mode: String;
	disabled_prev : Boolean;
	disabled_next : Boolean;
	failure :  Boolean;

  constructor() {
    this.id = 1;
  	this.mode = "pokemon"; 
  	this.disabled_prev = true;
  	this.disabled_next = false;
  	this.failure = false;
  }

  prev(){
  	if(this.id>1){
      this.id -= 1;
      this.disabled_prev = true;
      this.disabled_next = true;
    }
  }

  next(){
  	if(this.id<this.MAX_POKE){
      this.id +=1;
      this.disabled_prev = true;
      this.disabled_next = true;
    }
  }

  desalock(){

    let d_next = false;
    let d_prev = false;

    if(this.id===1){
      d_prev = true;
    }else{
      if(this.id === this.MAX_POKE){
      	d_next = true;
      }
    }

    this.disabled_prev = d_prev;
    this.disabled_next = d_next;
  }

  responseRequest(event){
      
    let f=false;

    if(this.failure || event.failure){
      f = true;
    }

    this.failure = f;
    this.id = event.newID;

    if(event.failure){
      this.desalock();
    }
  }

  ngOnInit(): void {
  
  }
  
  onSearch(event){
    if(event.target.value === ""){
      console.log("VALIDATION: Empty field is not allowed");
    }else{  
    	this.id = event.target.value.toLowerCase();
      this.disabled_prev = true;
      this.disabled_next = true; 
    }
  }

  onClose(event){
  	this.failure = false;
  }
}
