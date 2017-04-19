import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompaniesComponent} from './companies.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '../common/common.module';
import {CreateCompanyComponent} from './create-company.component';

const ROUTES: Routes = [
	{path: '', component: CompaniesComponent}
];

@NgModule({
	declarations: [
		CreateCompanyComponent,
		CompaniesComponent
	],
	providers: [
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		AngularCommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		CreateCompanyComponent,
		CompaniesComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],

})

export class CompaniesModule {}