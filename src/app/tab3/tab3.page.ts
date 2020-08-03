import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Participant, ParticipantService } from '../services/participant.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  scannedData: {};
  participantID: string;
  barcodeScannerOptions: BarcodeScannerOptions;
  participant: Participant;
  eventList: any = [];
  participants: Observable<Participant[]>;
  attendedEvents: any = [];
  events = [];
  eventNames = [];

  // Event name variables
  ethicalWorkshop = 0;
  codigoExpert = 0;
  codigoNovice = 0;
  Prezentium = 0;
  webWorkshop = 0;
  Eliptas = 0;
  Auslander = 0;
  counterStrike = 0;
  nfs3 = 0;
  nfs1 = 0;
  nfsT = 0;
  miniMilitia = 0;
  pubgSolo = 0;
  pubgSquad = 0;
  pubgTdm = 0;

  constructor(private barcodeScanner: BarcodeScanner,
              private participantService: ParticipantService) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ionViewWillEnter() {
        this.participantService.getParticipantsEvents('Ethical Hacking Workshop').then(data => {
          this.ethicalWorkshop = data;
        });
        this.participantService.getParticipantsEvents('Codigo - Expert').then(data => {
          this.codigoExpert = data;
        });
        this.participantService.getParticipantsEvents('Codigo - Novice').then(data => {
          this.codigoNovice = data;
        });
        this.participantService.getParticipantsEvents('Prezentium').then(data => {
          this.Prezentium = data;
        });
        this.participantService.getParticipantsEvents('Web-O-Illusion').then(data => {
          this.webWorkshop = data;
        });
        this.participantService.getParticipantsEvents('Eliptas').then(data => {
          this.Eliptas = data;
        });
        this.participantService.getParticipantsEvents('Auslander').then(data => {
          this.Auslander = data;
        });
        this.participantService.getParticipantsEvents('Counter Strike').then(data => {
          this.counterStrike = data;
        });
        this.participantService.getParticipantsEvents('NFS - 3 Man match').then(data => {
          this.nfs3 = data;
        });
        this.participantService.getParticipantsEvents('NFS - 1 vs 1').then(data => {
          this.nfs1 = data;
        });
        this.participantService.getParticipantsEvents('NFS - Tournament').then(data => {
          this.nfsT = data;
        });
        this.participantService.getParticipantsEvents('Mini Militia').then(data => {
          this.miniMilitia = data;
        });
        this.participantService.getParticipantsEvents('PUBG - solo').then(data => {
          this.pubgSolo = data;
        });
        this.participantService.getParticipantsEvents('PUBG - squad').then(data => {
          this.pubgSquad = data;
        });
        this.participantService.getParticipantsEvents('PUBG - tdm').then(data => {
          this.pubgTdm = data;
        });
  }


  doRefresh(event) {
    this.participantService.getParticipantsEvents('Ethical Hacking Workshop').then(data => {
      this.ethicalWorkshop = data;
    });
    this.participantService.getParticipantsEvents('Codigo - Expert').then(data => {
      this.codigoExpert = data;
    });
    this.participantService.getParticipantsEvents('Codigo - Novice').then(data => {
      this.codigoNovice = data;
    });
    this.participantService.getParticipantsEvents('Prezentium').then(data => {
      this.Prezentium = data;
    });
    this.participantService.getParticipantsEvents('Web-O-Illusion').then(data => {
      this.webWorkshop = data;
    });
    this.participantService.getParticipantsEvents('Eliptas').then(data => {
      this.Eliptas = data;
    });
    this.participantService.getParticipantsEvents('Auslander').then(data => {
      this.Auslander = data;
    });
    this.participantService.getParticipantsEvents('Counter Strike').then(data => {
      this.counterStrike = data;
    });
    this.participantService.getParticipantsEvents('NFS - 3 Man match').then(data => {
      this.nfs3 = data;
    });
    this.participantService.getParticipantsEvents('NFS - 1 vs 1').then(data => {
      this.nfs1 = data;
    });
    this.participantService.getParticipantsEvents('NFS - Tournament').then(data => {
      this.nfsT = data;
    });
    this.participantService.getParticipantsEvents('Mini Militia').then(data => {
      this.miniMilitia = data;
    });
    this.participantService.getParticipantsEvents('PUBG - solo').then(data => {
      this.pubgSolo = data;
    });
    this.participantService.getParticipantsEvents('PUBG - squad').then(data => {
      this.pubgSquad = data;
    });
    this.participantService.getParticipantsEvents('PUBG - tdm').then(data => {
      this.pubgTdm = data;
    });
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert('Barcode data ' + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        this.participantID = this.scannedData["text"];
        this.participantService.getParticipant(this.participantID).subscribe(participant => {
          this.participant = participant;
          this.eventList = participant.selectedEvents;
        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  // tp() {
  //   this.participantService.getEventCount('some');
  // }

  selectMember(data) {
    if (data.checked == false) {
      this.attendedEvents.push(data);
    } else {
      let newArray = this.attendedEvents.filter(el => {
        return el.eventID !== data.eventID;
      });
      this.attendedEvents = newArray;
    }
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.participant.attendedEvents = this.attendedEvents;
    this.participantService.updateParticipant(this.participant);
  }

  scanAnother() {
    this.participant = null;
    this.participantID = null;
    this.eventList = [];
    this.attendedEvents = [];
  }
}
