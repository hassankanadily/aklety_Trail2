const homeBtn = document.getElementById("home-btn");
const watchListBtn = document.getElementById("watchlist-btn");
const input = document.getElementById("movie-input");
const addBtn = document.getElementById("add-movie");

const moviesList = document.getElementById("movies-list");

const savedMovies = JSON.parse(localStorage.getItem("newList")) || [];
savedMovies.forEach(movie =>{
  addMovie(movie);
});

const newList = [...savedMovies];

function addMovie(movieName){
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  li.textContent = movieName;
  deleteBtn.textContent = "X";

  li.appendChild(deleteBtn);
  moviesList.appendChild(li);

  li.addEventListener('click',()=>{
    li.classList.toggle("watched");
  });

  deleteBtn.addEventListener('click',()=>{
    moviesList.removeChild(li);

    const index = newList.indexOf(movieName);
    newList.splice(index,1);
    localStorage.setItem("newList",JSON.stringify(newList));
  });


}

addBtn.addEventListener('click',()=>{
  const inputText = input.value;
  if(inputText===""){return;}

  addMovie(inputText);
  newList.push(inputText);
  localStorage.setItem("newList",JSON.stringify(newList));
  input.value="";

  const success = document.createElement("p");
  success.textContent = "Successfully Added";
  input.parentElement.appendChild(success);
  setTimeout(() => {
    success.remove(); // remove after 3 seconds
  }, 1000);
});

input.addEventListener('keydown',e => {
  if(e.key==="Enter"){
    addBtn.click();
  }
});

const home = document.getElementById("home");
const watchlist = document.getElementById("watchlist");


homeBtn.addEventListener('click', () => {
  showPage("home", "Home - Movie Watchlist", "#home");
});

watchListBtn.addEventListener('click', () => {
  showPage("watchlist", "Watchlist - Movie Watchlist", "#watchlist");
});
function showPage(sectionId, title, url) {
  document.querySelectorAll("section").forEach(s => s.hidden = true);
  document.getElementById(sectionId).hidden = false;
  document.title = title;
  window.history.pushState({}, "", url);
}

// On page load, read URL and show correct section
/*const path = window.location.pathname;
if(path === "/watchlist") {
  showPage("watchlist", "Watchlist - Movie Watchlist", "/watchlist");
} else {
  showPage("home", "Home - Movie Watchlist", "/home");
}*/

