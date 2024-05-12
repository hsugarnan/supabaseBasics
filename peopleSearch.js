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
    const searchName = document.getElementById('name').value.trim();
    const searchLicense = document.getElementById('licenseNumber').value.trim();


    if (!searchName && !searchLicense) {
        document.querySelector('.output p').textContent = 'Please enter a name or driving license number.';
        return;
    }

    if(searchName){
        const { data, error } = await supabase
            .from('People')
            .select('*')
            .ilike('Name', `%${searchName}%`);//to make it case insensitive

            if (error) {
                console.error('Error fetching people data:', error);
                document.querySelector('.output p').textContent = 'Error fetching data';
                return;
            }
        
            if (data.length === 0) {
                document.querySelector('.output p').textContent = 'No matching records found';
                
                return;
            }
            console.log(data[0].Name);
            let htmlContent = '';

            for(let i = 0; i < data.length; i++){
                //loop through all the length and then print out the possible options
                htmlContent +=  ` 
                     <div class="eachPerson">
                        <p>Name: ${data[i].Name}</p> 
                        <p>Address: ${data[i].Address}</p> 
                        <p>DOB: ${data[i].DOB}</p>
                        <p>License Number: ${data[i].LicenseNumber}</p> 
                        <p>Expiry Date: ${data[i].ExpiryDate}</p> 
                        <p>Person ID: ${data[i].PersonID}</p>  
                     </div>`;


            } 

            document.querySelector('.PersonInfo').innerHTML = htmlContent;
        


    }else if(searchLicense){
        const { data, error } = await supabase
        .from('People')
        .select('*')
        .eq('LicenseNumber', searchLicense);

        if (error) {
            console.error('Error fetching people data:', error);
            document.querySelector('.output p').textContent = 'Error fetching data';
            return;
        }
    
        if (data.length === 0) {
            document.querySelector('.output p').textContent = 'No matching records found';
            return;
        }

        let htmlContent = '';

            for(let i = 0; i < data.length; i++){
                //loop through all the length and then print out the possible options
                htmlContent +=  ` 
                     <div class="eachPerson">
                        <p>Name: ${data[i].Name}</p> 
                        <p>Address: ${data[i].Address}</p> 
                        <p>DOB: ${data[i].DOB}</p>
                        <p>License Number: ${data[i].LicenseNumber}</p> 
                        <p>Expiry Date: ${data[i].ExpiryDate}</p> 
                        <p>Person ID: ${data[i].PersonID}</p>  
                     </div>`;


            } 

            document.querySelector('.PersonInfo').innerHTML = htmlContent;
        

    }


    
}); 