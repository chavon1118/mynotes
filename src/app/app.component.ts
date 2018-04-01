import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import {NoteService } from './services/note.service';
import Note from './models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	constructor(
		private noteService: NoteService
		) { };

	public newNote: Note = new Note();

	noteList: Note[];
	editNotes: Note[] = [];
	title = 'MyNotes'

	ngOnInit(): void {
		this.noteService.getNotes().subscribe(notes => {
			this.noteList = notes;
			console.log(notes);
		});
	};

	createNote() {
		this.noteService.createNote(this.newNote).subscribe((res) => {
			this.noteList.push(res.data);
			this.newNote = new Note();
		});
	}

	editNote(note: Note) {
		console.log(note);

		if (this.noteList.includes(note)) {
			if (!this.editNotes.includes(note)) {
				this.editNotes.push(note);
			} else {
				this.editNotes.splice(this.editNotes.indexOf(note), 1);
				this.noteService.editNote(note).subscribe(res => {
					console.log("Update Successful");
				}, err => {
					this.editNote(note);
					console.error("Update Failed");
				});
			}
		}
	}

	submitNote(event, note: Note) {
		// key code 13 = enter
		if (event.keyCode == 13) {
			this.editNote(note);
		}
	}

	deleteNote(note: Note) {
		this.noteService.deleteNote(note._id).subscribe(res => {
			this.noteList.splice(this.noteList.indexOf(note), 1);
		});
	}
};