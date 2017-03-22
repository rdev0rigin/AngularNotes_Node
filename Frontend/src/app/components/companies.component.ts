import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Company, CompanyFormData} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {Router, NavigationExtras} from '@angular/router';
import {Observable} from 'rxjs';
@Component({
	selector: 'companies-component',
	template: `
		<div class="row">
			<div class="col-xs-12">
				<strong>Select a Company:</strong>
				<table class="table table-bordered table-hover">
					<thead>
						<th>Name</th>
						<th>Phone</th>
						<th></th>
					</thead>
					<tbody>
						<tr (click)="companyIsSelected(company)" *ngFor="let company of companies" [class.active]="selectedCompany.ID === company.ID">
							<td>
								<strong>{{company?.Name}}</strong>
							</td>
							<td>{{company.Phone}}</td>
							<td>
								<i class="glyphicon glyphicon-remove-circle" (click)="removeCompany(company.ID)"></i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div *ngIf="!!selectedCompany"><h4>{{selectedCompany.Name || 'No Company'}} Selected</h4></div>
		<button class="btn btn-block" (click)="setNewCompany()">Add Company</button>
		<form [formGroup]="companiesGroup" (ngSubmit)="companySave()">
			<span class="col-xs-6">
				<input-component label="Name" [idNumber]="selectedCompany.ID" [apiPath]="companiesRESTPath()" propKey="Name" [(model)]="selectedCompany.Name" [control]="nameControl" [currentModel]="selectedCompany"></input-component>
			</span>
			<span class="col-xs-6">
				<input-component label="Phone" [idNumber]="selectedCompany.ID" [apiPath]="companiesRESTPath()" propKey="Phone" [model]="selectedCompany.Phone" [control]="phoneControl" [currentModel]="selectedCompany"></input-component>	
			</span>
			<input-component label="Address" [idNumber]="selectedCompany.ID" [apiPath]="companiesRESTPath()" propKey="Address" [model]="selectedCompany.Address" [control]="addressControl" [currentModel]="selectedCompany"></input-component>
			<span class="col-xs-6">
				<input-component label="City" [idNumber]="selectedCompany.ID" [apiPath]="companiesRESTPath()" propKey="City" [model]="selectedCompany.City" [control]="cityControl" [currentModel]="selectedCompany"></input-component>
			</span>
			<span class="col-xs-6">
				<input-component label="ZipCode" [idNumber]="selectedCompany.ID" [apiPath]="companiesRESTPath()" propKey="Zip" [model]="selectedCompany.Zip" [control]="zipControl" [currentModel]="selectedCompany"></input-component>
			</span>
			<div class="row">
				Misc: <textarea (blur)="companySave(companiesGroup.value, selectedCompany.ID)" [ngModel]="selectedCompany.Misc" class="form-control" [formControl]="miscControl"></textarea>
			</div>
			<h4>{{selectedCompany.Name}} Contacts</h4>
			<div class="row">
				 <table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Position</th>
							<th></th>
						</tr>	
					</thead>
					<tbody>
						<tr *ngFor="let contact of contacts" >
							<td>{{contact.ID}}</td> 
							<td>{{contact.Name}}</td>
							<td>{{contact.Phone}}</td>
							<td>{{contact.Email}}</td>
							<td>{{contact.Position}}</td>
							<td>
								<i class="glyphicon glyphicon-list" (click)="selectContact(contact.ID, selectedCompany.ID)"></i>
							</td>
						</tr>	
					</tbody>
				</table>
			</div>
		</form>
		<button class="btn btn-block" (click)="selectContact(0, selectedCompany.ID)">Add A {{selectedCompany.Name}} Contact</button>
`
})

export class CompaniesComponent implements OnInit {
	@Output()
	public currentCompany: EventEmitter<Company> = new EventEmitter<Company>();
	// public notesRESTPath: () => string = () => 'http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=';
	public companiesRESTPath: () => string = () => 'http://angularnotes-angularbros.azurewebsites.net/api/companies/';
	public selectedCompany: Company = <Company>{};
	public newCompany: Company = <Company>{};
	public contacts: Contact[] = [];
	public companies: Company[];
	public nameControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public addressControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public companiesGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		miscControl: this.miscControl,
		cityControl: this.cityControl,
		zipControl: this.zipControl,
		phoneControl: this.phoneControl,
	});
	constructor(private contactService: ContactService, private companyService: CompanyService, private router: Router){};

	public ngOnInit(): void {
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
	}

	public companyIsSelected(company: Company): void {
		this.selectedCompany = company;
		this.currentCompany.emit(company);
		this.contactService.getCompanyContacts(company.ID)
			.subscribe(contacts => this.contacts = contacts, err => console.log('getCompanyContacts Error', err));
	}

	public setNewCompany(): void {
		this.companySave(this.newCompany);
	}

	public companySave(formData: CompanyFormData): void {
		const company = {
			ID: void 0,
			Name: formData.nameControl,
			Address: formData.addressControl,
			Phone: formData.phoneControl,
			City: formData.cityControl,
			Zip: formData.zipControl,
			Misc: formData.miscControl
		};
		this.companyService.saveCompany(company, this.selectedCompany.ID).subscribe(response => {
			console.log('saveCompany response', response); //todo toastr
			this.selectedCompany = response;
				this.companyService.getCompanies().subscribe(companies => {
					this.companies = companies;
				});
		});

	}

	public removeCompany(id: number): void {
		this.companyService.deleteCompany(id).subscribe(res => {
			console.log(res); //todo toastr
			this.companyService.getCompanies()
				.subscribe(companies => {
					this.companies = companies;
					this.selectedCompany = <Company>{};
				});
			});
	}

	public selectContact(contactId: number): void {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"contactId": contactId.toString(),
			}
		};
		this.router.navigate(['/contacts'], navigationExtras);
	}

}