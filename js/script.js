let timestamp=Date.now();//current timestamp
let publicKey="779fc430dc3d78ce491aa97dbdcb36d8";//marvel api public key
let privateKey="6419a7008b45d90497619e9ad01f7c90a143dca2";//marvel api private Key
let hashKey= md5(timestamp+privateKey+publicKey); //hash key md5(timestamp+privateKey+publicKey)
let out= document.getElementById('output');//output element
let search = document.getElementById('search');//search textbox element
let url=`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashKey}`;//api address
//calling fetch characters function by passing url
fetchCharacter(url);
//fetching character funtion by passing the url
function fetchCharacter(url)
{
    fetch(url)
    .then((response) => response.json())
    .then((data) => displayData(data));
}
// displaying the response
function displayData(res){
    //storing received Data in a variable
    let recievedData=res.data.results;
    //output string to be replace in a web page
    let output='';
    //traversing through received data
    for(let i of recievedData){
        //putting the received data to output variable
        output+=`<div class="col-md-6 col-lg-4 mt-3 mb-3 col-sm-12">
        <div class="card shadow">
            <img src="${i.thumbnail.path}.${i.thumbnail.extension}" class="card-img-top character-img" alt="${i.name}">
            <div class="card-body">
              <h5 class="card-title">${i.name}</h5>
              <div class="d-flex" style="align-items:center">
              <a href="details.html?character=${i.id}" class="btn btn-primary">View Details</a>
              <p onclick="addFav(${i.id},'${i.name}','${i.thumbnail.path}.${i.thumbnail.extension}')" id="${i.id}" class="like ms-auto text-danger">`
              //like button to be filled or kept empty based on the local storage
              if(!localStorage.getItem(i.id))
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
    //assigning output string to output element
    out.innerHTML=output;
    }
}
//search textbox event listner
search.addEventListener('keyup',function(e){
    e.preventDefault();
    let searchValue=this.value;//storing the value of search textbox into variable
    let url="";//url to fetch data from
    if(searchValue.length==0)
    {
    //if data is empty
    url=`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashKey}`;
    }
    else{
    // if data contains some string
    url=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchValue}&ts=${timestamp}&apikey=${publicKey}&hash=${hashKey}`;
    }
    //calling fetchCharacter based on the url above
    fetchCharacter(url);
})
//add favourite functionality
function addFav(id,name,image){
    //get the element from the id passed;
    let likeItem=document.getElementById(id);
    //if the element is not present in the local storage add the element
    if(!localStorage.getItem(id))
    {
        let obj={
            id:id,
            name:name,
            image:image
        }
        localStorage.setItem(id,JSON.stringify(obj));
        likeItem.innerHTML='<i class="fa-solid fa-heart fa-xl"></i>';
    }
    //if the element is present in the local storage remove the element
    else{
        localStorage.removeItem(id);
        likeItem.innerHTML='<i class="fa-regular fa-heart fa-xl"></i>';
    }

}