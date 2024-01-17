import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { SingleMovieComponent } from '../single-movie/single-movie.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

import {
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;  // Input property to receive movie data
  @Output() addToFavoritesEvent = new EventEmitter<string>();
  movies: any[] = [];
  favorites: any[] = [];
  userId: string = '';
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar, ) { }

ngOnInit(): void {
  this.getMovies();
  // this.userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
  const userString = localStorage.getItem('user') || '{}';
  const user = this.parseJsonSafely(userString);
  this.userId = user._id;
  this.getFavorites();
}

private parseJsonSafely(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {};
  }}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

openSynopsis(movie:any): void {
  this.dialog.open(SingleMovieComponent, {
    data: {
      Title: movie.Title,
      Year: movie.Year,
Description: movie.Description,
Stars: movie.Stars,
    }
  });
}

openDirectorInfo(Director:any): void {
  this.dialog.open(DirectorInfoComponent, {
    data: {
      Name: Director.Name,
      Bio: Director.Bio,
Birthyear: Director.Birthyear,
    }
  });
}

openGenreInfo(Genres:any): void {
  this.dialog.open(GenreInfoComponent, {
    data: {
      Name: Genres.Name,
      Description: Genres.Description,
    }
  });
}

getFavorites(): void {
  this.fetchApiData.getOneUser(this.userId).subscribe(
    (resp: any) => {
      if (resp.user && resp.user.FavouriteMovies) {
        this.favorites = resp.user.FavouriteMovies;
      } else {
        this.favorites = [];
      }
    },
    (error: any) => {
      console.error('Error fetching user data:', error);
      this.favorites = [];
    }
  );
}

// getFavorites(): void {
//   if (this.userId) {
//     this.fetchApiData.getOneUser(this.userId).subscribe(
//       (resp: any) => {
//         if (resp.user && resp.user.FavouriteMovies) {
//           this.favorites = resp.user.FavouriteMovies;
//         } else {
//           this.favorites = [];
//         }
//       },
//       (error: any) => {
//         console.error('Error fetching user data:', error);
//         this.favorites = [];
//       }
//     );
//   } else {
//     console.error('User ID is undefined or null');
//   }
// }


isFavoriteMovie(movieId: string): boolean {
  return this.favorites.includes(movieId);
}

addToFavorites(movieId: string): void {
  this.addToFavoritesEvent.emit(movieId);
}


removeFavoriteMovie(movieId: string): void {
  this.favorites = this.favorites.filter((id) => id !== movieId);
  this.fetchApiData.deleteFavoriteMovie(this.userId, movieId).subscribe(() => {
    this.snackBar.open('Removed from favorites', 'OK', {
      duration: 2000,
    });
  });
}
}

// addToFavorites(movieId: string): void {
//   if (this.isFavoriteMovie(movieId)) {
//     this.removeFavoriteMovie(movieId);
//   } else {
//     this.favorites.push(movieId);
//     this.fetchApiData.addFavoriteMovie(this.userId, movieId).subscribe(
//       () => {
//         this.snackBar.open('Movie added to favorites', 'OK', {
//           duration: 2000,
//         });
//       },
//       (error) => {
//         this.favorites = this.favorites.filter((id) => id !== movieId);
//         console.error('Error adding movie to favorites:', error);
//       }
//     );
//   }
// }