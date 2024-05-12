// After install the supabase-js module
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://rnjdrodsfcuzxixcvhsc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamRyb2RzZmN1enhpeGN2aHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMzc4OTcsImV4cCI6MjAyODcxMzg5N30.3199onqPuQq8xjwayHromtSf6SrMQPMPMCGxxAQDviM')
const supabaseUrl = 'https://rnjdrodsfcuzxixcvhsc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamRyb2RzZmN1enhpeGN2aHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMzc4OTcsImV4cCI6MjAyODcxMzg5N30.3199onqPuQq8xjwayHromtSf6SrMQPMPMCGxxAQDviM"
const supabase = createClient(supabaseUrl, supabaseKey)
console.log(supabase);
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const plateNumber = document.getElementById('plateNumber').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const ownerName = document.getElementById('ownerName').value;

    const ownerSelect = document.getElementById('ownerSelect');
    ownerSelect.innerHTML = '';

    const { data: ownersData, error: ownersError } = await supabase
        .from('People')
        .select('*')
        .ilike('Name', `%${ownerName}%`); // ensuring its case insensitive

    if (ownersError) {
        console.error('Error fetching owners data:', ownersError);
        return;
    }
    const emptyOption = document.createElement('option');

    emptyOption.value = ''; // Set the value of the empty option
    emptyOption.text = 'Select an option'; // Set the text of the empty option
    ownerSelect.add(emptyOption);




    if (ownersData.length > 0) {
        ownerSelect.style.display = 'block'; // Show select dropdown
        ownersData.forEach(owner => {
            let option = new Option(owner.Name, owner.id);
            ownerSelect.add(option);
        });

     ownerSelect.addEventListener('change', async function(event) {
            event.preventDefault(); //NO RELOADS 
            
            // Get the selected owner's ID
            const selectedOwnerName = ownerSelect.value; //the NAME 
            console.log(selectedOwnerName);
            const { data: PersonData, error: PersonError } = await supabase
            .from('People')
            .select('*')
            .eq('Name', selectedOwnerName); 
     
             if (PersonError) {
                 console.error('Error fetching owners data:', ownersError);
                 return;
             }
     
            console.log(PersonData);
            addData(plateNumber,make,model,color,PersonData[0].PersonID);
            ownerSelect.removeEventListener('change', this); //removing event listener to avoid multiple submissions
            

    });



   }else {
        document.getElementById('addOwner').style.display = 'block';

    }
});

document.getElementById('ownerForm').addEventListener('submit', async function(event) {
    event.preventDefault();


    const { data: OLDOwnerData, error: OLDOwnerError } = await supabase
    .from('Vehicle')
    .select('*')
    if (OLDOwnerError) {
        console.error('Error fetching owners data:', ownersError);
        return;
    }
    let ownerID = OLDOwnerData.length + 1;
    const plateNumber = document.getElementById('plateNumber').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const ownerName = document.getElementById('ownerName').value;
    const ownerLicense = document.getElementById('ownerLicense').value
    const ownerAddress = document.getElementById('ownerAddress').value
    const ownerDOB = document.getElementById('ownerDOB').value
    const ownerExpiry = document.getElementById('ownerExpiry').value


    
     
    const { InputData, InputError } = await supabase
            .from('People')
            .insert([
                { PersonID:ownerID, Name:ownerName, Address: ownerAddress, DOB:ownerDOB, LicenseNumber:ownerLicense, ExpiryDate: ownerExpiry }
            ]);
            console.log(InputData);

             // Check for errors
            if (InputError) {
                console.error('Error inserting data:', error);
                alert('Failed to add vehicle. Error: ' + error.message);
            } else {
                console.log('Vehicle Data inserted:', InputData);
      
            }
    
        const { data, error } = await supabase
        .from('Vehicle')
        .insert([
            { VehicleID: plateNumber, Make: make, Model: model, Colour: color, OwnerID: ownerID }
        ]);
            console.log(data);

             // Check for errors
            if (error) {
                console.error('Error inserting data:', error);
                alert('Failed to add vehicle. Error: ' + error.message);
            } else {
                console.log('Owner Data inserted:', data);
            
            }






    
  

   

    // Here you might send this data to the server
});


async function addData(plateNumber,make,model,color,ownerID){
    
    

    const { data, error } = await supabase
            .from('Vehicle')
            .insert([
                { VehicleID: plateNumber, Make: make, Model: model, Colour: color, OwnerID: ownerID }
            ]);
            console.log(data);

             // Check for errors
            if (error) {
                console.error('Error inserting data:', error);
                alert('Failed to add vehicle. Error: ' + error.message);
            } else {
                console.log('Data inserted:', data);
                alert('Vehicle added successfully!');
            }

    console.log(data)

}