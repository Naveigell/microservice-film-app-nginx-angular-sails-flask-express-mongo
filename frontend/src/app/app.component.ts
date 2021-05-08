import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    public title = 'frontend';
    public films = [];
    public directors = [];

    public film = {
        message: {},
        insert: {
            open: false,
            data: {
                title: "",
                description: ""
            }
        }
    };

    public director = {
        message: {},
        insert: {
            open: false,
            data: {
                name: "",
                born: ""
            }
        }
    };

    readonly gateway = "http://localhost:1000";

    constructor(private http: HttpClient){}

    ngOnInit() {
        this.retrieveDirectors();
        this.retrieveFilms();
    }

    public saveFilm() {
        const { title, description } = {...this.film.insert.data};

        this.http.post<any>(`${this.gateway}/films`, { title, description }).subscribe(data => {
            this.film.message = data;

            if (this.film.message['message']) {
                this.film.insert.open = false;
                this.retrieveFilms();
            }
        });
    }

    public retrieveFilms() {
        this.http.get<any>(`${this.gateway}/films`).subscribe(data => {
            this.films = data.data;
            this.films.map((item, index) => {
                item.onUpdateMode = false;
            });
        });
    }

    public retrieveDirectors() {
        this.http.get<any>(`${this.gateway}/directors`).subscribe(data => {
            this.directors = data.data;
            this.directors.map((item, index) => {
                item.onUpdateMode = false;
            });
        });
    }

    public removeDirector(index) {
        const { _id = '' } = { ...this.directors[index] };

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id: _id }
        };

        this.http.delete<any>(`${this.gateway}/directors`, httpOptions).subscribe(data => {
            if (data["message"]) {
                this.retrieveDirectors();
            } else if (data["error"]) {
                alert(data["error"]);
            }
        });
    }

    public removeFilms(index) {
        const { _id = '' } = { ...this.films[index] };

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id: _id }
        };

        this.http.delete<any>(`${this.gateway}/films`, httpOptions).subscribe(data => {
            if (data["message"]) {
                this.retrieveFilms();
            } else if (data["error"]) {
                alert(data["error"]);
            }
        });
    }

    public updateFilm(film) {
        const { _id = '', title = '', description = '' } = {...film};

        this.http.put<any>(`${this.gateway}/films`, { id: _id, title, description }).subscribe(data => {
            if (data["message"]) {
                this.retrieveFilms();
            } else if (data["error"]) {
                alert(data["error"]);
            }
        });
    }

    public updateDirector(director) {
        const { _id = '', name = '', born = '' } = {...director};
        
        this.http.put<any>(`${this.gateway}/directors`, { id: _id, name, born }).subscribe(data => {
            if (data["message"]) {
                this.retrieveDirectors();
            } else if (data["error"]) {
                alert(data["error"]);
            }
        });
    }

    public saveDirector() {
        const { name = '', born = '' } = {...this.director.insert.data};

        this.http.post<any>(`${this.gateway}/directors`, { name, born }).subscribe(data => {
            this.director.message = data;

            if (this.director.message['message']) {
                this.director.insert.open = false;
                this.retrieveDirectors();
            }
        });
    }
}
