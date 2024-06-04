const Professor = require("./models/Professor.js");

async function updateProfs(){
    try {
        const res = await fetch("http://localhost:3500/professor");
        const data = await res.json();
    
        for (const key in data){
            if (data[key]["teaching"] !== undefined){
                console.log(data[key])
                fetch('http://localhost:3500/professor', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data[key])
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        console.log('Success:', data);
        // alert('Review submitted successfully!');
        })
        .catch((error) => {
        console.error('Error:', error);
        // alert('There was an error submitting your review.');
        
    });
    
            }
        }
        // console.log(data);

        
        
    } catch (error) {
        console.log(error)
    }
}

updateProfs()