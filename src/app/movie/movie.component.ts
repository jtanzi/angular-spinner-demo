import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  private omdbApiUrl = 'http://www.omdbapi.com/?apikey=';
  private apiKey = 'your_OMDB_API_key';
  movie: any;
  showError = false;
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

  ngOnInit() {
  }

  onSearchClicked(): void {

    // Indicate loading status
    this.loading$.next(true);
    // Reset component variables
    this.showError = false;
    this.message = '';
    const term = this.searchForm.get('search').value;

    setTimeout(() => {

      // Make the call to the API
      this.http.get(`${this.omdbApiUrl}${this.apiKey}&t=${term}`).subscribe((success: any) => {

        // If we get a failed search error
        if (success.Error) {
          this.movie = null;
          this.message = 'Sorry, cannot find that one. Maybe try another title?';
          this.showError = true;
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
        this.showError = true;
      });

    }, 1500);


  }

}


