const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied')
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
seatsArr = Array.from(document.querySelectorAll('.row .seat:not(.occupied'))
occseatsIndex=[]
occ = JSON.parse(localStorage.getItem("occupiedSeats"))
if(occ) // getting selected seats from localstorage
{
    console.log(occ)
    occ.forEach((e)=>{
        occseatsIndex.push(e)
    })
}

populateUI();

let ticketPrice = movieSelect.value;


// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const occupiedSeats = document.querySelectorAll('.row .seat.selected');

  //array of occupiedseats
    os = Array.from(occupiedSeats)
    occseatsIndex.push((seatsArr.indexOf(os[os.length-1])))

   localStorage.setItem('occupiedSeats', JSON.stringify(occseatsIndex));


  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));
  if (occupiedSeats !== null && occupiedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add('occupied');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  occseatsIndex=[]
  location.reload()
  updateSelectedCount();

});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
