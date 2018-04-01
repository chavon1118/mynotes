import Note from '../models/note.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class NoteService {
	api_url = '96.49.219.148/32';
	noteUrl = `${this.api_url}/api/notes`;

	constructor(
		private http: HttpClient
		) { };

	createNote(note: Note): Observable<any> {
		return this.http.post(`${this.noteUrl}`, note);
	};

	getNotes(): Observable<Note[]> {
		return this.http.get(this.noteUrl).map(res => {
			return res["data"].docs as Note[];
		})
	};

	editNote(note: Note) {
		return this.http.put(`${this.noteUrl}`, note);
	};

	deleteNote(id: string): any {
		const deleteUrl = `${this.noteUrl}/${id}`;
		return this.http.delete(deleteUrl).map(res => {
			return res;
		});
	};

	private handleError(error: any): Promise<any> {
		console.error("An error occurred", error);
		return Promise.reject(error.message || error);
	};
};
