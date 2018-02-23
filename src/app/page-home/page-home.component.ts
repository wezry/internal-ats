import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  private listQueue:Array<any> = [
		{
			name: 'Queue 1'
		},{
			name: 'Queue 2'
		},{
			name: 'Queue 3'
		},{
			name: 'Queue 4'
		},{
			name: 'Queue 5'
		},{
			name: 'Queue 6'
		}
	];
	private listPhoneScreen:Array<any> = [
		{
			name: 'Phone 1'
		},{
			name: 'Phone 2'
		},{
			name: 'Phone 3'
		},{
			name: 'Phone 4'
		},{
			name: 'Phone 5'
		},{
			name: 'Phone 6'
		}
	];
	private listOnSite:Array<any> = [
		{
			name: 'On-site 1'
		},{
			name: 'On-site 2'
		},{
			name: 'On-site 3'
		},{
			name: 'On-site 4'
		},{
			name: 'On-site 5'
		},{
			name: 'On-site 6'
		}
	];
  private listApproval:Array<any> = [
		{
			name: 'Approval 1'
		},{
			name: 'Approval 2'
		},{
			name: 'Approval 3'
		},{
			name: 'Approval 4'
		},{
			name: 'Approval 5'
		},{
			name: 'Approval 6'
		}
	];

  constructor() { }

  ngOnInit() {
  }

  private releaseQueue(event){
  	let index = this.listQueue.indexOf(event);
  	if (index >= 0){
  		this.listQueue.splice(index,1);
  	}
  }
	private addQueue(event){
			this.listQueue.push(event);
	}

	private releasePhoneScreen(event){
  	let index = this.listPhoneScreen.indexOf(event);
  	if (index >= 0){
  		this.listPhoneScreen.splice(index,1);
  	}
  }
	private addPhoneScreen(event){
			this.listPhoneScreen.push(event);
	}

	private releaseOnSite(event){
  	let index = this.listOnSite.indexOf(event);
  	if (index >= 0){
  		this.listOnSite.splice(index,1);
  	}
  }
	private addOnSite(event){
			this.listOnSite.push(event);
	}

  private releaseApproval(event){
  	let index = this.listApproval.indexOf(event);
  	if (index >= 0){
  		this.listApproval.splice(index,1);
  	}
  }
	private addApproval(event){
			this.listApproval.push(event);
	}

}
