async function getProfData(){
    const res = await fetch("https://freshmenmern.onrender.com/professor");
    const data = await res.json();
    
    let profData = data;
    
    // inserting all the prof data in the dropdown section
    let dropdown = document.querySelector("#teacher");
    
    let html = `<option value="option1">Name</option>`
    for (let i=0; i<profData.length; i++){
        html += `<option value="${profData[i]["name"]}">${profData[i]["name"]}</option>`
    }
    console.log(html)
    dropdown.innerHTML = html;
}

getProfData();

// put request from form
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject)

    fetch('http://localhost:3500/professor', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Review submitted successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('There was an error submitting your review.');
    });
  });