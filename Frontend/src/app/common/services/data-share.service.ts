import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Company} from '../../companies/company.model';
import {Contact} from '../../contacts/contact.model';
import {Quote} from '../../quotes/quote.model';
import get = Reflect.get;

@Injectable()
export class DataShareService {
	private activeCompanySource = new BehaviorSubject<Company>(<Company>{});
	private activeContactSource = new BehaviorSubject<Contact>(<Contact>{});
	private activeQuoteSource = new BehaviorSubject<Quote>(<Quote>{});
	private activeNavVisibleSource = new BehaviorSubject<boolean>(true);
	public companySelected$ = this.activeCompanySource.asObservable();
	public contactSelected$ = this.activeContactSource.asObservable();
	public quoteSelected$ = this.activeQuoteSource.asObservable();
	public navVisible$ = this.activeNavVisibleSource.asObservable();



	public sendCompany(company: Company): void {
		this.activeCompanySource.next(company);
		this.activeCompanySource.error

	}

	public sendContact(contact: Contact): void {
		this.activeContactSource.next(contact);
	}

	public sendQuote(quote: Quote): void {
		this.activeQuoteSource.next(quote);
	}

	public isNavVisible(state: boolean): void {
		this.activeNavVisibleSource.next(state);
	}

	source00 = Observable.create(function(observer): void {

	})
}