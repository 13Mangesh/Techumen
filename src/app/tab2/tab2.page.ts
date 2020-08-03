import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant, ParticipantService } from '../services/participant.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  participant: Participant;
  id: string;
  entryTaker: string;
  qrURL: string;
  totalAmount = 0;
  newArray = [];
  eventList: any = [
    {eventID: 1, eventName: 'Ethical Hacking Workshop', ischecked: false, value: 100},
    {eventID: 2, eventName: 'Codigo - Expert', ischecked: false, value: 80},
    {eventID: 3, eventName: 'Codigo - Novice', ischecked: false, value: 80},
    {eventID: 4, eventName: 'Prezentium', ischecked: false, value: 160},
    {eventID: 5, eventName: 'Web-O-Illusion', ischecked: false, value: 150},
    {eventID: 6, eventName: 'Eliptas', ischecked: false, value: 80},
    {eventID: 7, eventName: 'Auslander', ischecked: false, value: 50},
    {eventID: 8, eventName: 'Counter Strike', ischecked: false, value: 200},
    {eventID: 9, eventName: 'NFS - 3 Man match', ischecked: false, value: 40},
    {eventID: 10, eventName: 'NFS - 1 vs 1', ischecked: false, value: 50},
    {eventID: 11, eventName: 'NFS - Tournament', ischecked: false, value: 40},
    {eventID: 12, eventName: 'Mini Militia', ischecked: false, value: 40},
    {eventID: 13, eventName: 'PUBG - solo', ischecked: false, value: 40},
    {eventID: 14, eventName: 'PUBG - squad', ischecked: false, value: 160},
    {eventID: 15, eventName: 'PUBG - tdm', ischecked: false, value: 50}
  ];
  selectedEvents: any = [];

  constructor(private participantService: ParticipantService,
              private http: HttpClient,
              private toastCtrl: ToastController) {
    this.participant = {
      name: '',
      email: '',
      selectedEvents: [],
      attendedEvents: [],
      teamMate: '',
      paidMoney: null,
      unpaidMoney: null,
      mobile: '',
      entryTaker: '',
      college: ''
    };
  }

  ionViewWillEnter() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
          this.entryTaker = user.email;
        }
      } else {
        // No user is signed in.
      }
    });
  }

  selectMember(data) {
    console.log(data);
    if (data['ischecked'] == false) {
      console.log('if' + data.ischecked);
      this.selectedEvents.push(data);
    } else {
      console.log(data.ischecked);
      this.newArray = this.selectedEvents.filter(el => {
        return el.eventID !== data.eventID;
      });
      this.selectedEvents = this.newArray;
    }
    console.log(this.selectedEvents);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.participant.email = value.email;
    this.participant.name = value.name;
    this.participant.teamMate = value.teamMate;
    this.participant.paidMoney = value.paidMoney;
    this.participant.mobile = value.number;
    this.participant.college = value.college;
    this.participant.entryTaker = this.entryTaker;
    this.participant.selectedEvents = this.selectedEvents;
    for (var money of this.selectedEvents) {
      this.totalAmount = this.totalAmount + money.value;
      console.log(this.totalAmount);
    }
    this.participant.unpaidMoney = this.totalAmount - this.participant.paidMoney;
    this.participantService.addParticipant(this.participant).then(data => {
      this.id = data.id;
      this.qrURL = 'http://api.qrserver.com/v1/create-qr-code/?data=' + this.id + '&size=100x100';
      this.http.get(
        'https://us-central1-techumen-2019.cloudfunctions.net/sendMail?dest=' + value.email + '&qr=' + this.qrURL
      ).subscribe((mdata: any) => {
        console.log(mdata);
      });
      this.showToast();
    }).catch(err => {
      this.errShowToast();
    });
    this.selectedEvents = [];
    this.newArray = [];
    this.eventList = [
      {eventID: 1, eventName: 'Ethical Hacking Workshop', ischecked: false, value: 100},
    {eventID: 2, eventName: 'Codigo - Expert', ischecked: false, value: 80},
    {eventID: 3, eventName: 'Codigo - Novice', ischecked: false, value: 80},
    {eventID: 4, eventName: 'Prezentium', ischecked: false, value: 160},
    {eventID: 5, eventName: 'Web-O-Illusion', ischecked: false, value: 150},
    {eventID: 6, eventName: 'Eliptas', ischecked: false, value: 80},
    {eventID: 7, eventName: 'Auslander', ischecked: false, value: 50},
    {eventID: 8, eventName: 'Counter Strike', ischecked: false, value: 200},
    {eventID: 9, eventName: 'NFS - 3 Man match', ischecked: false, value: 40},
    {eventID: 10, eventName: 'NFS - 1 vs 1', ischecked: false, value: 50},
    {eventID: 11, eventName: 'NFS - Tournament', ischecked: false, value: 40},
    {eventID: 12, eventName: 'Mini Militia', ischecked: false, value: 40},
    {eventID: 13, eventName: 'PUBG - solo', ischecked: false, value: 40},
    {eventID: 14, eventName: 'PUBG - squad', ischecked: false, value: 160},
    {eventID: 15, eventName: 'PUBG - tdm', ischecked: false, value: 50}
    ];
    this.totalAmount = 0;
    form.reset();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Participant saved successfully',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  async errShowToast() {
    const toast = await this.toastCtrl.create({
      message: 'There was a error',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
