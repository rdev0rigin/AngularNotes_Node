import {Injectable, OnInit} from '@angular/core';
import {initUser, TWT} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../shared/services/socket.service';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';
import {Subject} from 'rxjs/Subject';
import {RESTService} from '../shared/services/rest.service';
import {Company} from '../shared/models/company.model';
import {Contact} from '../shared/models/contact.model';
import {Quote} from '../shared/models/quote.model';
import {Note} from '../shared/models/note.model';
import {CRMType} from '../shared/models/CRMTypes.type';
import {TEST_COMPANY, TEST_CONTACT, TEST_NOTE, TEST_QUOTE} from '../shared/models/comparrison-models.obj';

@Injectable()
export class UsersServices implements OnInit {
	private userStatesSource: Subject<TWT> = new Subject();
	public userState$: Observable<TWT> = this.userStatesSource.asObservable();
	constructor(private restService: RESTService,
				private socketService: SocketService) {
	}

	public path(endPoint): string {
		return `http://angularnotes-angularbros.azurewebsites.net/api/${endPoint}`
	}

	public ngOnInit(): void {
	}

	public setTWTProp(prop: {} | string): void {
		this.userStatesSource
		 	.next(this.userStatesSource = Object.assign(this.userStatesSource, this.userStatesSource[Object.keys(prop)[0]], prop));
		console.log(this.userStatesSource);
	}


	//todo add credentials
	public tokenFactory(): Promise<TWT> {
		return new Promise((resolve, reject) => {
			//todo if id else demoId
			this.socketService
				.responseSocket('user.get', {id: FIXTURE_USER_ID})
				.subscribe(user => {
					let token: TWT = <TWT>{};
					Object.assign(token, initUser(user));
					// for (let prop of Object.keys(user)) {
					// 	token[prop] = user[prop];
					// }
					resolve(token);
					reject('error with token');
				});
		})
	};

	public selectedUpdate(item: any): void {
		console.log(JSON.stringify(Object.keys(item).sort()));
		console.log(JSON.stringify(Object.keys(TEST_CONTACT).sort()));

		if (JSON.stringify(Object.keys(item).sort()) === JSON.stringify(Object.keys(TEST_COMPANY).sort())){
			console.log('company update', item);
			this.updateCompanyRelations(item)
				.then((res) => console.log(res));
		} else if (JSON.stringify(Object.keys(item).sort()) === JSON.stringify(Object.keys(TEST_CONTACT).sort())){
			console.log('contact update', item);
			this.updateContactRelations(item);

		} else if (JSON.stringify(Object.keys(item).sort()) === JSON.stringify(Object.keys(TEST_NOTE).sort())) {

		} else if (JSON.stringify(Object.keys(item).sort()) === JSON.stringify(Object.keys(TEST_QUOTE).sort())) {

		}

	}
	public updateQuoteRelations(quote: Quote): void {
		//todo fix extra call
		// this.updateCompanyRelations(<Company>{id: +quote.companyId});
	}

	public updateNoteRelations(note: Note): void {
		this.updateContactRelations(<Contact>{id: note.contactId});
	}

	public updateContactRelations(contact: Contact): void {
		this.restService
			.callPath('get', this.path('Companies/') + contact.companyId)
			.subscribe((company: Company) => {
			return new Promise((resolve, reject) => {
				Promise.resolve(<any>company)
					.then(()=> {
						console.log('promise contact to company', company);
						resolve(company);
					}).then((company: any) => {
						this.updateCompanyRelations(company).then(res => console.log('contact ' + res));
				});
			})
		})
	}

	public updateCompanyRelations(company: any): Promise<{}> {
		let twtProps = {
			selectedRelations: <SelectedRelations>{
				company: company,
				contacts: <{
				}[]>[],
				quotes: []
			}
		};
		console.log('then 0', twtProps);
		return new Promise((resolve, reject) => {
			Promise.resolve(<any>company)
			.then(() => {
				console.log('then 1', twtProps);
				return new Promise((resolve, reject) => {
					this.restService
						.getPath(this.path('Contact') + `?CompanyID=${company.id}`)
						.subscribe((contacts: Contact[]) => {
							resolve(<{}[]>contacts);
						})
				}).then((contacts: {}[]) => {
					for (let i = 0, k = contacts.length; i < k; i++) {
						console.log('contact', contacts[i]);
						let twtContact: TWTContact = <TWTContact>{
							notes: []
						};
						this.restService
							.getPath(this.path('Notes') + `?ContactID=${contacts[i]['ID']}`)
							.subscribe((notes: Note[]) => {
							twtContact.notes = notes;
							twtProps.selectedRelations.contacts.push(<TWTContact>Object.assign({}, {
								contact: contacts[i],
								notes: notes
							}));
							console.log('then 2', twtProps);
							});
					}
					return;
				}).then(() => {
					console.log('then 3', twtProps);
					this.restService
						.getPath(this.path('Quotes') + `?CompanyID=${company.id}`)
						.subscribe((quotes: Quote[]) => {
							twtProps.selectedRelations.quotes.concat(Object.assign({quotes: <Quote[]>quotes}));
							return;
						});
				}).then(() => {
					console.log('then 4', twtProps);
					this.setTWTProp(twtProps);
					console.log('twtProps', twtProps);
					resolve('Success!?');
				})
			})
		})
	}
}

export interface SelectedRelations {
	company: Company;
	contacts: TWTContact[];
	quotes: Quote[];
}

export interface TWTContact {
	contact: {};
	notes: {}[];
}