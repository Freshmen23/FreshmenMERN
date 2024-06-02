// get all professor in DB and show it as options on the index.html file

async function getProfData(){
    const res = await fetch("http://localhost:3500/professor");
    const data = await res.json();
    
    let profData = data;
    
    // inserting all the prof data in the dropdown section
    let dropdown = document.querySelector("#dropdown");
    
    let html = `<option value="option1">Name</option>`
    for (let i=0; i<profData.length; i++){
        html += `<option value="${profData[i]["name"]}">${profData[i]["name"]}</option>`
    }
    console.log(html)
    dropdown.innerHTML = html;
}

getProfData();



// fill the Review area on selection of a prof

document.getElementById("submit").addEventListener('click', async function () {
    const res = await fetch("http://localhost:3500/professor");
    const data = await res.json();
    let dropdown = document.getElementById("dropdown");
    let selectedProf = dropdown.value;
    console.log(data);
    // checking whether the selected Proffessors detail is present in our Object or not
    for (let i=0; i<data.length; i++){
        
        if (selectedProf === data[i]["name"]) {
          let selectedOption = document.getElementById("selectedOption");
          let Teaching = data[i]['teaching'];
          let Evaluation = data[i]['evaluation'];
          let Behaviour = data[i]['behavior'];
          let Internals = data[i]['internals'];
          let Average = data[i]['average'];
          let Overall = data[i]['overall'].toUpperCase();
          let noOfReviews = data[i]['numberOfReviews'];
      
      
      
          //   Fetching Review of the selected Proffessor
          selectedOption.innerHTML = `Teaching: ${Teaching} <br>
                    Evaluation : ${Evaluation} <br>
                    Behaviour : ${Behaviour} <br>
                    Internals : ${Internals} <br>
                    No Of Reviews : ${noOfReviews} <br>
                    Average : ${Average} <br><br>
                    Overall : ${Overall} <br>`
      
            ;
        //   selectedOption.setAttribute("style", `background-color:${Color};`);
      
      
        }
        else {
          let selectedOption = document.getElementById("selectedOption");
          selectedOption.innerHTML = `Please Select a Professor from the above Dropdown list`;
          selectedOption.setAttribute("style", `color: #f0ff00;`);
        }
      }
    })


// for filtering searches
// let searchInput = document.querySelector("#searchInput");
// let 

// searchInput.addEventListener("oninput", ()=>{

// })

function filterFunction() {
  let searchInput = document.getElementById("searchInput");
  let filter = searchInput.value.toUpperCase();
  let dropdown = document.getElementById("dropdown");
  let options = dropdown.getElementsByTagName("option");
  let matchFound = false;

  for (let i = 0; i < options.length; i++) {
      let txtValue = options[i].textContent || options[i].value;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          options[i].style.display = "";
          if (!matchFound) {
              dropdown.selectedIndex = i;
              matchFound = true;
          }
      } else {
          options[i].style.display = "none";
      }
  }

  if (!matchFound) {
      dropdown.selectedIndex = 0; // No match found, no option selected
  }
}

document.getElementById("searchInput").addEventListener("input", filterFunction);