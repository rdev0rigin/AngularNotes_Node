import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocketService} from './services/socket.service';
import {RESTService} from './services/rest.service';
import {Capitalize} from './pipes/toTitleCase.pipe';
import {DiamondLoaderComponent} from './animations/loading-screen.animation';
import {ModelService} from './services/model.service';
import {LastIndexed} from './pipes/lastIndex.pipe';
import {SelectByID} from './pipes/selectByID.pipe';

const COMPONENTS = [
	LastIndexed,
	Capitalize,
	SelectByID,
	DiamondLoaderComponent,
];

const MODULES = [
	AngularCommonModule,
	ReactiveFormsModule,
	FormsModule,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES
	],
	providers: [
		LastIndexed,
		Capitalize,
		SelectByID,
		SocketService,
		RESTService,
		ModelService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	]
})

export class SharedModule {}
