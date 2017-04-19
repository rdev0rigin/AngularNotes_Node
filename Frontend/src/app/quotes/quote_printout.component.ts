/**
 * Created by aaron on 3/17/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Company} from "../companies/company.model";
import {Quote} from "./quote.model";
import {QuoteLine} from "./quote.model";
import {Settings} from "../common/models/setting.model";
import {Contact} from '../contacts/contact.model';
import {DataShareService} from '../common/services/data-share.service';
import {SocketService} from '../common/services/socket.service';
import {FIXTURE_USER_ID} from '../common/models/FIXTURE_ID';

/**
 * Displays a quote as a beautiful printout
 */
@Component({
	selector: 'quotes-printout-component',
	template: `
		<h1 style="text-align: center;">{{settings.companyName}}</h1>
		<p style="text-align: center;">{{settings.address}}</p>
		<p style="text-align: center;">{{settings.companyWeb}}</p>
		<table>
			<tr>
				<td style="text-align: center;">Cell: {{settings.phone}}</td>
				<td style="text-align: center;">Phone: {{settings.companyPhone}}</td>
				<td style="text-align: center;">Fax: {{settings.companyFax}}</td>
			</tr>
		</table>
		<table>
			<tr>
				<td>
					<p>
						<b>TO:</b> {{_Company.Name}}<br>
						{{_Contact.Name}}<br>
						{{_Company.Address}}<br>
						{{_Company.Phone}}
					</p>
				</td>
				<td>
					<table style="float:right">
						<tr>
							<th style="background-color:lightblue;text-align: center;">Salesperson</th>
							<th style="background-color:lightblue;text-align: center;">Email</th>
						</tr>
						<tr>
							<td style="text-align: center;">{{settings.name}}</td>
							<td style="text-align: center;">{{settings.email}}</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<br>
		<table class="table table-striped">
			<caption style="text-align: center;">{{_Quote.Name}}</caption>
			<tr>
				<th style="background-color: lightblue;text-align: center;">Unit</th>
				<th style="background-color: lightblue;text-align: center;">Description</th>
				<th style="background-color: lightblue;text-align: center;">Cost</th>
			</tr>
			<tbody>
			<tr *ngFor="let Line of _QuoteLines">
				<td style="text-align: center;">{{Line.UNIT}}</td>
				<td style="text-align: center;">{{Line.DESC}}</td>
				<td style="text-align: center;">{{Line.COST}}</td>
			</tr>
			</tbody>
		</table>
		<table>
			<tr>
				<td>Supplies on Request</td>
				<td style="text-align: right;">All prices subject to change without notice</td>
			</tr>
		</table>
	`
})
/**
 * Displays a quote as a mutha $!@#!@# beautiful printout
 */
export class Quotes_Printout implements OnInit {
	//TODO: Consider only using [Quote] and not the others
	//TODO: Find out how to order _QuoteLines by Display

	public _Quote: Quote = <Quote>{};
	public _Company: Company = <Company>{};
	public _QuoteLines: QuoteLine[] = [];
	public settings: Settings = <Settings>{};
	public _Contact: Contact = <Contact>{};
    constructor(private dataShareService: DataShareService,
				public socketService: SocketService){}

    public ngOnInit(): void {
    	console.log('hit');
    }
}