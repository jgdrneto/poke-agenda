import { Component, OnInit, ViewChild, ElementRef,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {
	
  @Input() failure: Boolean;

  //Events
	@Output() search = new EventEmitter();
	@Output() close = new EventEmitter();

	//Reference
	@ViewChild("searchInput") searchInput: ElementRef; 

  constructor() {
  }

  onSendText(event){
  	this.search.emit(event);
  }

  onCloseAlert(event){
  	this.failure = false;
  	this.close.emit(event);
  	this.searchInput.nativeElement.focus();
  }

  ngOnInit(): void {

  }

}
