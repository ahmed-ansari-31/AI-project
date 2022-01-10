import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DownService } from '../Services/down.service';
import { NgForm } from '@angular/forms'
import {FormsModule} from '@angular/forms';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	ngForm=NgForm;
	constructor(private http: HttpClient, private Auth: DownService) { }

	ngOnInit(): void {
		
	}
	text:any = '';
	return_data:any;
	send:any;
	// data: any;
	str: any;
	confidence: any = 0;
	sub_intent: boolean = false;


	// {confidence: 0.8935669660568237, message: "positive", successful: true, text: "hello"}


	send_data(val:any){
		// document.getElementById("text").value = 'hi';
		// console.log(this.return_data)
		this.send = {
			text: this.return_data.text,
			intent: this.return_data.message,
			confidence: this.return_data.confidence,
			correctlabel: val.value.correctlabel
			
			
		}
		if(val.value.correctlabel == ''){
			this.send["correctlabel"] = this.return_data.message;
		}
		this.Auth.sendlog(this.send)
			.subscribe((data: any) => {
				// console.log(data)
			},
			(err: HttpErrorResponse) => {
				console.log(err)
			})

		// document.getElementById('')
		this.str = '';
		this.confidence = 0;
		this.sub_intent = false;
		console.log(this.send)
	}
	getval(val: any) {
		console.log("Working!!!")
		this.text = val.value
		console.log(this.text)
		this.Auth.check(val)
			.subscribe((data: any) => {
				this.return_data = data
				console.log(data)
				this.str = data.message
				this.confidence = data.confidence
				if (data.message == null) {
					console.log("NAN")
				}
				else {
					this.sub_intent = true;
					this.confidence = this.confidence.toFixed(4) * 100
				}
			},
				(err: HttpErrorResponse) => {
					console.log(err)
				})

	}
}
