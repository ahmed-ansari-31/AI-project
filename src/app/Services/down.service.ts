import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DownService {

	// url = 'http://192.168.88.254:7000/predict'       //For Server use
	url = 'http://192.168.88.48:7000/predict'       //For local use
	writelogurl = 'http://192.168.88.48:7000/writelog'       //For local use


	constructor(private http: HttpClient) { };

	data: any;
	mydict: any;
	personage: number[] = [];
	// sendcsv(csv: any) {
	//   return this.http.post(this.urlcsv, csv)
	// };

	check(text: any) {
		this.data = text.value
		console.log("Sending data to: " + this.url);
		return this.http.post(this.url, this.data);
	}
	sendlog(senddata: any){
		
		console.log("Sending data to: " + this.writelogurl);
		return this.http.post(this.writelogurl, senddata);
		
	}
}




// this.http.post('http://192.168.88.20:7000/predict', this.data)
  // .subscribe(res => {
// console.log(this.data);