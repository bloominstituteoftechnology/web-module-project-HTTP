# HTTP / AJAX II React Module Project: Movie CRUD

This module explored HTTP methods, REST interfaces, CRUD apps and using put and delete to allow editing and deleting functionality. We also dug into how to pass props to Route connected components and using URL params to get values from an api. In this project, you will practice each of these skills by implement various pieces of functionality in a movie database CRUD app.

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
* [ ] Create a forked copy of this project.
* [ ] Clone your OWN version of the repository in your terminal
* [ ] cd into the project base directory `cd web-module-project-reducer-pattern`
* [ ] Download project dependencies by running `npm install`
* [ ] Start up the app using `npm start`
- [ ] With each saved change in your editor, the test runner will re-run all the tests
- [ ] **IMPORTANT** If a test fails, use the test runner's error messages to find out why it is failing

### Task 2: Project Requirements
#### The Episode Component
> *This component displays a single episode worth of data. To test it, let's try our some different varieties on what we should pass into our component's props.*

* [ ] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
* [ ] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
* [ ] The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.

### The Show Component
> *This component holds all general information on our featured show. Here we will once again work with data props, mock a function for testing and rerender our component for a change in data.*

* [ ] Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
* [ ] Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
* [ ] Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
* [ ] Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
* [ ] Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and userEvent reference materials to see how to trigger a selection.
* [ ] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.

### The Display Component
> *This component holds the state values of the application and handles api calls. In this component's tests, you work with mocking external modules and working with async / await / waitFor*
* [ ] Test that the Display component renders without any passed in props.
* [ ] Rebuild or copy the show test data element as used in the previous set of tests.
* [ ] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
* [ ] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
* [ ] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.

### Stretch goals

- Add in a testing suite for the episodes component.

- Look up the `TVMaze` API. Add a dropdown with the titles of some other popular shows. Add the user sequence of choosing a different show to fetch data for different shows.

- Add React Router, and add the functionality to click an episode and navigate to an episode page.

________________________________________________________________

# HTTP Movies

## Instructions

### Task 1: Project Setup 

- **Fork** this repository, then clone your fork.
- Run `npm install` to download dependencies.
- Run the server using `npm start`.
- In a separate terminal cd into the `client` folder and run `npm install` to download dependencies.
- Still inside the `client` folder run `npm start` to run the client application.

### Task 2: MVP

#### Updating A Movie:

- Add a route at the path `/update-movie/:id`
- Create a component with a form to update the chosen movie
- Add a button in the movie component that routes you to your new route with the movies's id as the URL param
- The form should make a PUT request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/` where they will see the updated movie in the list
- (Editing the movie stars can be a stretch problem... don't worry about it now. Move on to the next step, and come back and solve this at the end)

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

#### Deleting A Movie:

- Add a delete button in the movie component that makes a DELETE request
- When the call comes back successfully, route the user to `/` where they will see the updated movie list without the deleted movie

#### Adding A Movie:

- Add a route at the path `/add-movie`
- Create a component with a form to add a new movie
- Each created movie should have the following format (notice the array of strings - this will test your JS skills, so work through it methodically)
- The form should make a POST request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/`

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

### Task 3: Stretch Problem

- Add the ability to update the stars of a movie within a single text input field (think about how to change from an array of strings to a single string, then back to an array of strings)
- See Part 3 above (Adding movies with a POST request)
- Style the app!

## Submission Format
* [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's  Repo). **Please don't merge your own pull request**
