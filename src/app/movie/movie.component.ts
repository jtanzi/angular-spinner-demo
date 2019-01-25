import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {


  private omdbApiUrl = 'http://www.omdbapi.com/?apikey=';
  // private apiKey = 'your_OMDB_API_key';
  private apiKey = 'f805b4ff';
  movie: any; // Stores the movie data
  showError$ = new BehaviorSubject(false);  // State variable
  message = '';
  searchForm: FormGroup;
  loading$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.movie = null;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  onSearchClicked(): void {

    // Indicate loading status
    this.loading$.next(true);
    // Reset component variables
    this.showError$.next(false);
    this.message = '';
    const term = this.searchForm.get('search').value;

    setTimeout(() => {

      // Make the call to the API
      this.http.get(`${this.omdbApiUrl}${this.apiKey}&t=${term}`).subscribe((success: any) => {

        // If we get a failed search error
        if (success.Error) {
          this.movie = null;
          this.message = 'Sorry, cannot find that one. Maybe try another title?';
          this.showError$.next(true);
        } else {

          // Populate the movie data for the form
          this.movie = {
            title: success.Title,
            year: success.Year,
            rating: success.rating,
            runtime: success.Runtime,
            genre: success.Genre,
            director: success.Director
          };
        }

        // Make the spinner go away
        this.loading$.next(false);

      }, (error) => { // HTTP error response condition
        this.movie = null;
        this.message = 'Sorry, that search did not work, server responded with error.';
        this.showError$.next(true);
        this.loading$.next(false);
      });

    }, 1500);


  }

}


