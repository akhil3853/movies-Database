document.addEventListener('DOMContentLoaded',function(){

    const moviesContainer = document.getElementById("moviesContainer");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const searchInput = document.getElementById("searchInput");
  let moviesData;
  
  
  fetch('movies.json').then(response => response.json()).then(data => {
    moviesData = data;
    displayMovies(moviesData);
  })
  .catch(error => console.error("Error fetching movies data",error));
  
  
  function displayMovies(movies){
    moviesContainer.innerHTML='';
    movies.forEach(movie => {
  const movieDiv = document.createElement('div');
  movieDiv.classList.add('movie-thumbnail');
  movieDiv.innerHTML = `
  <img src="${movie.image}" alt="${movie.title}">
  <h3>${movie.title}</h3>
  `    ;
  
  moviesContainer.appendChild(movieDiv);
  movieDiv.addEventListener('click',()=>openModal(movie))
    });
  }
  
  
  
  function openModal(movie){
    modalContent.innerHTML = `
    <span class="close" onclick="closeModal()">&times;</span>
    <h2>${movie.title}</h2>
    <p><strong>Director:</strong> ${movie.director}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
    <p>${movie.synopsis}</p>
    `;
    modal.style.display='block';
  }
  
  window.closeModal = function(){
    modal.style.display = "none";
  }
  
  
  
  searchInput.addEventListener('input',function(){
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = moviesData.filter(movie=>movie.title.toLowerCase().includes(searchTerm));
  
  if(filteredMovies.length>0){
    displayMovies(filteredMovies);
  }else{
    moviesContainer.innerHTML = `<p>No data found</p>`
  }
  
  
  })
  
  })