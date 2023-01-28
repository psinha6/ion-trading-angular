# IonTradingAngular
To login use 
username: `test`
password`test`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Installation

Run `npm install` to install all the packages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Application content 

### Header ###
The header consists of a few navigation links and a status bar

On clicking on `Ion Trading` will take us to the welcome page.
On clicking on `Home` will take us to the profile/details page. If the user is not logged in it then take the user to login page.

On the right side there is a status text which shows the following text.
 - Logged in
 - Not logged in
 - Logging in
 - Logging out
based on the activity going on currently with specific colors.

### Welcome page ###
The application upon launch will start with the welcome page with the header

The header has 2 parts on right most part it wil show the status and left will have the navigation items.

Inside the welcome page there is a `Login to view details` button. Clicking on the button will navigate to the login page 

### Login page ###

The login page consists of a simple user name and password text boxes where the care has been taken for the following

- User name cannot be empty or it cannot contain the special characters like ( , . \ / ^)
- Password cannot be empty

If the user name or password is not valid in that case the login button will not be enabled.

If both the inputs are valid then on clicking login the button will be disabled and a loading indicator on button will appear.
Sceenarions:
- On Success: The page will redirect to profile page
- On Incorrect user name and password: Appropriate message will be displayed the user indicating the incorrect user name or password.
- On Delay in request which can be changed there will be an error indication mentioning the request has timed out.

### Profile page ###

This is a page which can be opened post login. It's a simple page showing my basic profile with personal information.
This page is protected by the route guard so without login it will automatically redirect to login page.

__Once logged in the user information is since stored in localstorage hence the page will be visible on reloads as well.
Also if we route back to welcome page and from there we click on home. If the user is once loggedin then it will also be redirecting to this page and not to login page__

### Client Server communication ###

Currently there is 2 seconds delay to show the loader in login page which can be changed on the `ProxyBackendInterceptor` class delay pipe. 
Change this value to more then 5 seconds to see the timeout in login page.

### User lookup ###
The user is created with the HashMap of username and user object apartfrom the user array.
This lookup once loaded on constructor will speed up the lookup of billions of records faster by using the hashmap insted of looping through the array or users.


## Future enhancements

- Implement lazy loading, as the project keeps increasing in size.
- Implement AbstractControl class for the forms and subforms for enhanced validations and greater control over the FormGroup.
- Implement error class component which will display the error with the right message for code re-usability.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
