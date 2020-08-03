import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant, ParticipantService } from '../services/participant.service';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { CsvDataService } from '../csv-data-service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  unregisterBackButtonAction: any;
  searchTerm : any="";
  participants: Participant[];
  participantCopy;

  constructor(private participantService: ParticipantService,
              private platform: Platform,
              private file: File,
              private toastCtrl: ToastController) {
    console.log('in constructor');
    this.participantService.getParticipants().subscribe(data => {
        this.participants = data;
        this.participants.sort(this.compare);
    });
    this.participantService.getParticipants().subscribe(data => {
      this.participantCopy = data;
      this.participantCopy.sort(this.compare);
    });
    this.initializeItems();
  }

  initializeItems() {
    
    this.participants = this.participantCopy;
}



compare(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  let comparision = 0;
  if(nameA > nameB) {
    comparision = 1;
  } else if (nameA < nameB) {
    comparision = -1;
  }
  return comparision;
}

getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.participants = this.participants.filter((participant) => {
        return (participant.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  download() {
    const csvFile = CsvDataService.exportToCsv('Participants.csv', this.participantCopy);
    let filepath = this.file.externalRootDirectory + '/Download/';
    this.file.writeFile(filepath, 'Participants.csv', csvFile, {replace: true}).then((data) => {
      this.showToast();
    });
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'file saved successfully',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  

  ngOnInit() {
    //this.participants = this.participantService.getParticipants();
  }

}
