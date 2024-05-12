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
    
    const ownerName = document.getElementById('ownerName').value;
    const ownerSelect = document.getElementById('ownerSelect');
    ownerSelect.innerHTML = '';

    const { data: ownersData, error: ownersError } = await supabase
        .from('People')
        .select('*')
        .ilike('Name', ownerName);
    if (ownersError) {
        console.error('Error fetching owners data:', ownersError);
        document.getElementById('output').textContent = 'Error fetching owners data';
        return;
    }
 
    if (ownersData.length > 0) { // There is a owner in the database
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select Owner';
        ownerSelect.appendChild(defaultOption);
        ownerSelect.style.display = 'block'; //show options

        for(let i = 0; i < ownersData.length; i++){
            const option = document.createElement('option');
            option.text = ownersData[i].Name;
            option.value = ownersData[i].id; // Assuming 'id' is the primary key of the People table
            ownerSelect.appendChild(option);


        }


        // Add event listener to the select element
        ownerSelect.addEventListener('change', function() {
            // Get the selected owner's ID
            const selectedOwnerId = ownerSelect.value;

        // ADD THE DATA FROM THIS
       })
    }else{
        //have to manually add the data

        // get the data from form and insert this information
    }

});