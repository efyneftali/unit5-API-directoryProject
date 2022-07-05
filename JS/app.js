const gallery_div = document.getElementById("gallery")

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------
fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&noinfo&nat=US')
  .then(response => response.json())
  .then(data=> {generateGallary(data.results)})
  .catch(error => console.log('Looks like there was a problem!', error))

  // ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
//Makes card html for each employee
function generateCard(employee){
    const card = `
            <div class="card" >
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
    `
    gallery_div.insertAdjacentHTML('beforeend', card)
}

//Generates Modal html for each employee
function generateModal(employee){
    let dob = employee.dob.date.replace(/-/g,'/').split('T')[0].split("/")
    const modal = `
     <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob[1]}/${dob[2]}/${dob[0]}</p>
            </div>
        </div>
    </div>
    ` 
    document.querySelector("body").insertAdjacentHTML(
        "beforeend", modal)
}
//adds functionality to 'close' btn
function closeModal(){
    const closeBtn = document.getElementById("modal-close-btn")
    const modal_div = document.querySelector(".modal-container")
    closeBtn.addEventListener("click", ()=>{
        modal_div.remove()
    })
}

//displays employee information when a card is clicked
function displayModal(data){
    const cards = document.querySelectorAll(".card")
    for(let i=0; i<cards.length; i++){
        cards[i].addEventListener('click', ()=>{
            generateModal(data[i])
            closeModal()
        })
    }
}

//displays employee gallary and modal information
function generateGallary(data){
    data.map(employee=>{
        generateCard(employee)
    })
    displayModal(data)
}
 
