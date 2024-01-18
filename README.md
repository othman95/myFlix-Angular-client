# MyFlixAngularClient
## Objective
Using Angular, build the client-side for an app called myFlix based on its existing server-side code (REST API and database).

## Essential Views & Features:
### Welcome View
#### Login view
- Allows users to log in with a username and password
#### Signup view
- Allows new users to register (username, password, email, date of birth)
### Main view
- Returns ALL movies to the user in a card list (each movie item with an image, title, and description)
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view
- Allows users to add a movie to their list of favorites 
- Returns data (description, year, actors) about a single movie to the user
- Returns information about a genre in a dialog
- Displays information of a directors in a dialog
### Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister
### Technical Requirements
- The application would be a single-page application (SPA)
- The application would use routing to navigate between views and share URLs
- The application would use Angular material as a UI library for styling and responsiveness
- The application would contain function components
- The application would be hosted online
### Tech stack
- Angular CLI
- Angular material
- Typescript
- typedoc

### Server
- gh-pages
#### The app can be visited at
GitHub: https://github.com/MSIlam/myFlix-Angular-client.git
Deployment: https://msilam.github.io/myFlix-Angular-client/

------------------------
### Other technicalities

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
