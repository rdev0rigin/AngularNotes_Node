import {_baseListItem} from './base-model.model';
import {Note} from './note.model';
/**
 * Created by aaron on 3/14/2017.
 * edited by RD on 4/17/2017
 */
export interface _Contact {
	companyId: string;
	id?: string;
}

export interface Contact extends _Contact, _baseListItem {
	name: string;
	phone: string;
	email: string;
	position: string;
	updated_at?: string;
	created_at?: string;
	modelType: 'contacts';
	singular: 'Contact';
	company_id: string;
	notes: Note[];
}

export function newContact(): Contact {
		return {
			id: null,
			companyId: null,
			name: null,
			phone: null,
			email: null,
			position: null,
			updated_at: null,
			created_at: null,
			company_id: null,
			modelType: 'contacts',
			singular: 'Contact',
			notes: []
		}
}
