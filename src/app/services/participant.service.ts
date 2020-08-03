import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
	AngularFirestoreCollection,
	AngularFirestore,
	DocumentReference,
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

export interface Participant {
	id?: string;
	name: string;
	email: string;
	college: string;
	selectedEvents: any;
	attendedEvents: any;
	teamMate: string;
	paidMoney: number;
	unpaidMoney: number;
	mobile: string;
	entryTaker: string;
}

@Injectable({
	providedIn: 'root',
})
export class ParticipantService {
	private participants: Observable<Participant[]>;
	private participantsCollection: AngularFirestoreCollection<Participant>;

	constructor(private afs: AngularFirestore) {
		this.participantsCollection = this.afs.collection<Participant>(
			'participants'
		);
		this.participants = this.participantsCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getParticipants(): Observable<Participant[]> {
		return this.participants;
	}

	getOrderBy(searchName: string) {
		return this.participantsCollection.ref.where('name', '==', searchName);
	}

	getParticipantsEvents(name: string) {
		let events = [];
		let count = 0;
		return this.participantsCollection
			.get()
			.toPromise()
			.then(snapshot => {
				snapshot.forEach(doc => {
					events.push(doc.data().selectedEvents);
				});
				events.forEach(event => {
					event.forEach(element => {
						if (element['eventName'] === name) {
							count++;
						}
					});
				});
				return count;
			});
	}

	getParticipant(id: string): Observable<Participant> {
		return this.participantsCollection
			.doc<Participant>(id)
			.valueChanges()
			.pipe(
				take(1),
				map(participant => {
					participant.id = id;
					return participant;
				})
			);
	}

	addParticipant(participant: Participant): Promise<DocumentReference> {
		return this.participantsCollection.add(participant);
	}

	updateParticipant(participant: Participant): Promise<void> {
		// tslint:disable-next-line: max-line-length
		return this.participantsCollection
			.doc(participant.id)
			.update({
				name: participant.name,
				email: participant.email,
				selectedEvents: participant.selectedEvents,
				attendedEvents: participant.attendedEvents,
				teamMate: participant.teamMate,
				paidMoney: participant.paidMoney,
				unpaidMoney: participant.unpaidMoney,
				entryTaker: participant.entryTaker,
				college: participant.college,
			});
	}

	deleteParticipant(id: string): Promise<void> {
		return this.participantsCollection.doc(id).delete();
	}
}
