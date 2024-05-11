
// After install the supabase-js module
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://rnjdrodsfcuzxixcvhsc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamRyb2RzZmN1enhpeGN2aHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMzc4OTcsImV4cCI6MjAyODcxMzg5N30.3199onqPuQq8xjwayHromtSf6SrMQPMPMCGxxAQDviM')
const supabaseUrl = 'https://rnjdrodsfcuzxixcvhsc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamRyb2RzZmN1enhpeGN2aHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMzc4OTcsImV4cCI6MjAyODcxMzg5N30.3199onqPuQq8xjwayHromtSf6SrMQPMPMCGxxAQDviM"
const supabase = createClient(supabaseUrl, supabaseKey)
console.log(supabase);



document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the form from submitting in the traditional way

    // Get the value from the input field
    const numberPlate = document.getElementById('numberPlate').value;

    // Fetching data filtered by the input
    const { data, error } = await supabase
        .from('Vehicle')
        .select('*')
        .eq('VehicleID', numberPlate);

    if (error) {
        console.error('Error fetching vehicle data:', error);
        document.querySelector('.vehicleID').textContent = 'Error fetching data';
        return;
    }

    if (data.length === 0) {
        console.error('Vehicle not in the system');
        document.querySelector('.vehicleID').textContent = 'Vehicle not in the system';
        return;
    }

    // Assuming there is data and it includes an OwnerID
    const ownerId = data[0].OwnerID;
    if (ownerId) {
        const { data: peopleData, error: peopleError } = await supabase
            .from('People')
            .select('*')
            .eq('PersonID', ownerId);

        if (peopleError) {
            console.error('Error fetching people data:', peopleError);
            document.querySelector('.vehicleID').textContent = 'Error fetching people data';
            return;
        }

        if (peopleData.length === 0) {
            document.querySelector('.vehicleID').textContent = 'Owner not found';
            return;
        }
        console.log(peopleData);
        document.querySelector('.vehicleID').textContent = `Vehicle ID: ${data[0].VehicleID}`;
        document.querySelector('.make').textContent = `Vehicle Make: ${data[0].Make}`;
        document.querySelector('.colour').textContent = `Vehicle Colour: ${data[0].Colour}`;
        document.querySelector('.model').textContent = `Vehicle Model: ${data[0].Model}`;
        document.querySelector('.name').textContent = `Owner Name: ${peopleData[0].Name}`;
        document.querySelector('.licenseNum').textContent = `License Number: ${peopleData[0].LicenseNumber}`;
      

 


    } else {
        document.querySelector('.vehicleID').textContent = `Vehicle ID: ${data[0].VehicleID}`;
        document.querySelector('.make').textContent = `Vehicle Make: ${data[0].Make}`;
        document.querySelector('.colour').textContent = `Vehicle Colour: ${data[0].Colour}`;
        document.querySelector('.model').textContent = `Vehicle Model: ${data[0].Model}`;
        document.querySelector('.name').textContent = `Owner Name: N/A`;
        document.querySelector('.licenseNum').textContent = `License Number: N/A`;
      
    }
});



