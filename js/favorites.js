let favorites=document.getElementById('favorites');//favorite elements to show the result
let temp=localStorage;// storing local storage to temp variable
//if temp is empty
if(temp.length==0){
favorites.innerHTML="<h1 class='text-white text-center'>No Favorites for now</h1>";
}
//if temp is not empty
else{
    //output string to be shown in the web page
    let output='';
    //traversing temp
    for(let i in temp)
    {
        //if i reaches the length break after length everything is method and details to be performed on the localstorage
        if(i=='length')
        {
            break;
        }
        //fetch details of each element from local storage and convert it to JSON format
        let data=JSON.parse(localStorage.getItem(i));
        //put the fetched json data to the output string
        output+=`<div class="col-md-6 col-lg-4 mt-3 mb-3 col-sm-12">
        <div class="card shadow">
            <img src="${data.image}" class="card-img-top character-img" alt="${data.name}">
            <div class="card-body">
              <h5 class="card-title">${data.name}</h5>
              <div class="d-flex" style="align-items:center">
              <a href="details.html?character=${data.id}" class="btn btn-primary">View Details</a>
              <p onclick="removeFav(${data.id})" id="${data.id}" class="like ms-auto text-danger">`
              if(!localStorage.getItem(data.id))
              {
              output+=`<i class="fa-regular fa-heart fa-xl"></i>`;
              }
              else
              {
                output+=`<i class="fa-solid fa-heart fa-xl"></i>`;
              }
              output+=`</p>
              </div>
            </div>
          </div>
    </div>`;
    //put data into favorites page
    favorites.innerHTML=output;
    }
}
//remove favourite function
function removeFav(id){
//remove the id passed from the local storage
localStorage.removeItem(id);
//refresh the page
location.reload();
}