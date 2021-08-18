# HTTP / AJAX II React Module Project: Movie CRUD

This module explored HTTP methods, REST interfaces, CRUD apps and using put and delete to allow editing and deleting functionality. We also dug into how to pass props to Route connected components and using URL params to get values from an api. In this project, you will practice each of these skills by implement various pieces of functionality in a movie database CRUD app.

- [HTTP / AJAX II React Module Project: Movie CRUD](#http--ajax-ii-react-module-project-movie-crud)
  - [Objectives](#objectives)
  - [Introduction](#introduction)
  - [Instructions](#instructions)
    - [Task 1: Project Set Up](#task-1-project-set-up)
    - [Task 2: Project Requirements](#task-2-project-requirements)
      - [Editing a Movie](#editing-a-movie)
      - [Deleting a Movie](#deleting-a-movie)
      - [Adding a Movie](#adding-a-movie)
    - [Stretch goals](#stretch-goals)
    - [Resource: API documentation](#resource-api-documentation)
      - [GET `http://localhost:5000/api/movies`](#get-httplocalhost5000apimovies)
      - [GET `http://localhost:5000/api/movies`](#get-httplocalhost5000apimovies-1)
      - [GET `http://localhost:5000/api/movies/:id`](#get-httplocalhost5000apimoviesid)
      - [POST `http://localhost:5000/api/movies`](#post-httplocalhost5000apimovies)
      - [PUT `http://localhost:5000/api/movies/:id`](#put-httplocalhost5000apimoviesid)
      - [DELETE `http://localhost:5000/api/movies/:id`](#delete-httplocalhost5000apimoviesid)
  - [Rick Mansfield's Pull/push trail for Web Modual HTTP Movie Proj](#rick-mansfields-pullpush-trail-for-web-modual-http-movie-proj)
  - [Class Questions](#class-questions)

## Objectives
- Understand how to use the post, put and delete HTTP methods to interact with server data.
- Understand how to sync server data with an applications internal state.
- Understand how to pass values into a Route component to allow for the updating of state.

## Introduction
CRUD applications are the foundation of most web applications. Being able to manage creating, edit and deleting data from an external source is as key a skill as it gets. In this project, you will complete the code nessisary to allow all of these fundmental actions.

![Movie DB Example](project-goals.gif)

***Make sure to complete your tasks one at a time and complete test each task before proceeding forward.***

## Instructions
### Task 1: Project Set Up
* [x] Create a forked copy of this project.
* [x] Clone your OWN version of the repository in your terminal
* [x] cd into the project base directory `cd web-module-project-HTTP`
* [x] Download server dependencies by running `npm install`
* [x] Run the local web server by running `node server.js` (or nmp start in root)
* [x] Open a new terminal window and cd into the client code `cd client`
* [x] Download project dependencies by running `npm install`
* [x] Start up the app using `npm start`

### Task 2: Project Requirements
#### Editing a Movie
> *Let's start by walking through the process of adding the routing, component and service calls need for resource updating*

* [x] 1 First, we need to be able to navigate to the edit movie component. In App.js, add in the `<EditMovieForm> `component to the supplied edit route.

* [x] 2 Next, we need to grab the id being passed into the component through the url. Use the `useParams` hook to get the id value. (note to self... got to EditMovieForm)

* [x] 3. We need to be able to load in the current movie's attributes into our local form state. When `EditMovieForm` mount, retrieve our current id's movie from the api and save the data returned to local state.

* [x] 4. At this point, nothing happens when the edit form is **submitted.** Add in the api call needed to update the server with our updated movie data. (note to self update the handleSubmit. in EditMovieForm.js)

* [x] 5 Don't forget to make sure that your server data and your local state are in sync! Make any changes the edit route needed to give the edit form access to App's `setMovies` method.

* [x] 6 Now that we have access to `setMovies`, make sure the updated list of movies is saved to our global state.(note to self see EditMovieForm.js handleSubmit)

* [x] 7 Redirect the user to the currently edited movie's individual info page.

#### Deleting a Movie
> *You added in a CRUD feature! Good job! Now let's get deleted squared away...*

* [x] 8 Identify the component that holds the "button" needed for deletion. Add an event handler to that button.(Note to self... I used Dev Tools under Components to narrow in on the correct component.i.e. Movie.js)

* [x] 9 Build an event handler that makes a request to delete the currently viewed movie. Observe what is returned from the request.(note you must put "deleteMovie" into props at the top of Move.js eventhough the function is not yet complete in App.js in order to "see" the res data.Notice that the "res" is the object data) 

* [x] 10 You will once again need to keep the server and state data in sync. In `App.js`, complete the `deleteMovie` method so that it receives an id, filters out any movie with that id and sets state to that resultant movie list.

* [x] 11 Pass `deleteMovie` into the approprate component. (note to self ...This step is confusing as it was necessary to complete step 9 so you should have already done this in step 9 in order to be able to "see" the res data.) 

* [x] 12 Run `deleteMovie` on the currently selected movie when your delete request is complete and redirect the user to the `/movies` route.

#### Adding a Movie
> *Alright! You ready! Let's see you use the skills of the previous steps to build a crud function from start to finish.*

* [x] 13 Use `EditMovieForm.js` as a model to build an `AddMovieForm` component from scratch. The component should hold all the attributes of a new movie in local state. (Note to self basically other than changing the name from EditMovieForm to AddMovieForm everything **except** the __useEffect__ and __handleSubmit__ are identical to EcitMovieForm)

* [x] 14 Add in a route that allows access to `AddMovieForm`. (see App.js routes and imorts, then got to 15 to fix handleChange and then 16 to handle submit. THe app is broken until those are fixed. )

* [x] 15 Locate the part of the ui that should redirect to your new `AddMovieForm`. Make that button works as expected. (Note to self...The button originates in MovieHeader.js. I found this by righ clicking on the "Add New Movie Button and selecting inspect in chrome dev tools under "componenets" it shows the location. Since we already just Routed it in App.js, now we just add "to="/movies/add"" to the button in MovieHeader.js's appropriate "<Link>")

* [ ] 16 In `AddMovieForm,` add an event handler for form submission. When the form is submitted, run the approprate request for adding a movie with the component's state values. 

* [ ] 17 Make sure your component has access to and runs and modifications needed to global state and redirects to `/movies` after creation.

### Stretch goals
- 18 Make the added DeleteMovieModal appear and be reacted to before deletion occurs.
- 19 Add in `addToFavorites` functionality. When the favorite button is pushed in the `Movie` component, make sure that when the favorite button is pushed, the id and name of the currently viewed into the favorite state slice in `App.js.`
- 20 For extra credit, ensure that only unique movies can be added as favorites. Consider the `.find` method for arrays.
- 21 Add in some Style!

### Resource: API documentation 

#### GET `http://localhost:5000/api/movies`
- Retrieves all the Movies with the following formatting:
```
[{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  genre: "Drama",
  description: : "A successful lawman's plans to retire anonymously in Tombstone, Arizona are disrupted by the kind of outlaws he was famous for eliminating."
}]
```
#### GET `http://localhost:5000/api/movies`
- Retrieves all movies on the server.

#### GET `http://localhost:5000/api/movies/:id`
- Retrieves a movie with the passed value as id.

#### POST `http://localhost:5000/api/movies`
- Adds the movie passed in through body to the server movies list. Returns updated movies list.

#### PUT `http://localhost:5000/api/movies/:id`
- Replaced the movie with the passed in id with data passed in through body. Returns update movies list.

#### DELETE `http://localhost:5000/api/movies/:id`
- Removed movie with the passed in id. Returns the deleted movie's id.

## Rick Mansfield's Pull/push trail for Web Modual HTTP Movie Proj

- [link for convenience](https://github.com/LambdaSchool/web-module-project-HTTP/pull/54)

## Class Questions
1. What is a "Request" 
   1. Requests are messages (get, post, put, delete) sent to a server or other listener
   2. We might think of it (a request) as a signal to a server to perform a task or do something depending on the creator of the API. 

2. What is HTTP
   1. Hypertext Transfer (or Transport) Protocol, the data transfer protocol used on the World Wide Web and it is responsible for providing a channel where data can be transmitted between your device and a web server so that normal web browsing functions can take place. 