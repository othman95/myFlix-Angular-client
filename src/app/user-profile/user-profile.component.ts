import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
user: any = {};
FavouriteMovies: any[]= [];

@Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}

constructor(
  public fetchApiData: FetchApiDataService,
  public snackBar: MatSnackBar,
    public router: Router) {}

    ngOnInit(): void {
      this.getUser();
    }

    // Gets the users info to display or change
    public getUser(): void {
      // Assuming you store the user's ID in the local storage
      const storedUser = localStorage.getItem('user') || '{}';
      console.log('Stored User:', storedUser);
    
      const userId = JSON.parse(storedUser)._id;
      
      // Check if userId is not null or undefined
      if (userId) {
        this.fetchApiData.getOneUser(userId).subscribe((user) => {
          this.user = user;
          this.userData = user;
          
          this.fetchApiData.getAllMovies().subscribe((response: any) => {
            this.FavouriteMovies = response.filter((movie: any) => this.user.FavouriteMovies.includes(movie._id));
          });
        });
      } else {
        // Handle the case where userId is not available
        console.error('User ID not found in local storage');
      }
    }
    

  // logic for edit user profile
  public updateUser() : void{
    this.fetchApiData.editUser(this.user._id, this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result));
      this.user= result;
    
      this.snackBar.open('Your profile has been updated', 'OK',{
        duration: 3000
      });
      // window.location.reload();
    },(result) =>{
      this.snackBar.open('Something went wrong', 'OK',{
        duration: 3000
      });
    })
  }

  public deleteUser(): void {
    if(confirm('Do you want to delete your account permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000
        });
      })
      this.fetchApiData.deleteUser(this.user._id).subscribe((result) => {
        console.log(result);
      });
    }
  }


  addToFavorites(movieId: string): void {
    console.log('userId:', this.user._id);
  console.log('movieId:', movieId);
    this.fetchApiData.addFavoriteMovie(this.user._id, movieId).subscribe(
      () => {
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
        // Update user profile favorite movies after successful addition
        this.getUser();
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
      }
    );
  }

  public removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.user._id, movieId).subscribe(
      () => {
        // Remove the movie from the local array
        this.FavouriteMovies = this.FavouriteMovies.filter(
          (movie) => movie._id !== movieId
        );
  
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error removing movie from favorites:', error);
      }
    );
  }
  
  
  }


