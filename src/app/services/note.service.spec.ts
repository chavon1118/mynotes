import Note from '../models/note.model';
import { XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { NoteService } from './note.service';

describe('NoteService', () => {
	const testNote = { _id: '1', title: 'Test Note', content: 'Test note content'};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule
			],
			providers: [
				NoteService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('should be created', inject([NoteService], (service: NoteService) => {
		expect(service).toBeTruthy();
	}));

	it('getNotes method should return expected notes', 
		inject([NoteService, XHRBackend], (service: NoteService, mockBackend: MockBackend) => {
			let expectedNotes = [testNote] as Note[];

			const mockResponse = {
				data: expectedNotes
			};

			mockBackend.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(mockResponse)
				})));
			});

			service.getNotes().subscribe(notes => {
				expect(notes[0]._id).toEqual('1');
				expect(notes[0].title).toEqual('Test Note');
				expect(notes[0].content).toEqual('Test note content');
			});
		}));

	it('createNote method should send a post request and return result',
		inject([NoteService, XHRBackend], (service: NoteService, mockBackend: MockBackend) => {
			const mockResponse = {
				status: 201, 
				data: testNote,
				message: "Successfully Created Note"
            };

            mockBackend.connections.subscribe((connection) => {
            	connection.mockRespond(new Response(new ResponseOptions({
            		body: JSON.stringify(mockResponse)
            	})));
            });

            service.createNote(testNote).subscribe(res => {
            	expect(res.body.status).toEqual(201);
            	expect(res.body.data).toEqual(testNote);
            });
        }));

	it('editNote method should send a put request and return result',
		inject([NoteService, XHRBackend], (service: NoteService, mockBackend: MockBackend) => {
			const mockResponse = {
				status: 200, 
				data: testNote, 
				message: "Successfully Updated Note"
			};

            mockBackend.connections.subscribe((connection) => {
            	connection.mockRespond(new Response(new ResponseOptions({
            		body: JSON.stringify(mockResponse)
            	})));
            });

            service.editNote(testNote).subscribe(res => {
            	expect(res.body.status).toEqual(200);
            	expect(res.body.data).toEqual(testNote);
            	expect(res.body.message).toEqual(mockResponse.message);
            });
        }));

	it('deleteNote method should send a delete request and return result',
		inject([NoteService, XHRBackend], (service: NoteService, mockBackend: MockBackend) => {
			const mockResponse = {
				status: 204, 
				message: "Successfully Deleted Note"};

            mockBackend.connections.subscribe((connection) => {
            	connection.mockRespond(new Response(new ResponseOptions({
            		body: JSON.stringify(mockResponse)
            	})));
            });

            service.deleteNote(testNote._id).subscribe(res => {
            	expect(res.body.status).toEqual(204);
            	expect(res.body.message).toEqual(mockResponse.message);
            });
        }));
});