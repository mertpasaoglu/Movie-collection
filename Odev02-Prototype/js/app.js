import { UI } from "../js/ui.js";
import { storage } from "../js/storage.js";
import { Movie } from "../js/movie.js";

const formElement = document.querySelector('#form');
const movieNameElement = document.querySelector('#movieName');
const movieDirectorElement = document.querySelector('#directorName');
const bannerUrlElement = document.querySelector('#bannerUrl');
const premiereElement = document.querySelector("#premiere");
const movieCards = document.querySelector('.movie-cards');
const clearAllButton = document.querySelector('.btn-delete-all');

eventListeners();

function eventListeners() {
    formElement.addEventListener('submit', addMovie);
    document.addEventListener('DOMContentLoaded', () => {
        let movies = storage.getMoviesFromStorage();
        UI.loadAllMoviesToUi(movies);
    });
    movieCards.addEventListener('click', deleteAll);
    clearAllButton.addEventListener('click', clearAllMovies);
}

function addMovie(e) {
    e.preventDefault();   
    const movieName = movieNameElement.value;
    const movieDirector = movieDirectorElement.value;
    const bannerUrl = bannerUrlElement.value;
    const premiereDate = premiereElement.value;
    if (movieName === "" || movieDirector === "" || bannerUrl === "" || premiereDate === "") {
        UI.displayMessage('Please fill in all the fields!', 'fail');
    } else {
        const newMovie = new Movie(movieName, movieDirector, bannerUrl, premiereDate);
        UI.addMovieToUi(newMovie);
        storage.addMovieToStorage(newMovie);
        UI.clearInputs(movieNameElement, movieDirectorElement, bannerUrlElement, premiereElement);
        UI.displayMessage('Movie Added Successfuly', 'success');
    }
}

function deleteAll(e) {
    if (e.target.classList.contains('btn-delete')) {
        UI.deleteMovieFromUi(e.target);
        storage.deleteMovieFromStorage(e.target.parentElement.previousElementSibling.children[0].textContent);
        UI.displayMessage('Movie Deleted Successfuly', 'success');
    }
}

function clearAllMovies(e) {
    if (confirm('Are you sure?')) {
        UI.clearAllMoviesFromUi();
        storage.clearAllMoviesFromStorage();
    }
}
