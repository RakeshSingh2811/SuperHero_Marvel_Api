let timestamp=Date.now();//current timestamp
let publicKey="779fc430dc3d78ce491aa97dbdcb36d8";//marvel api public key
let privateKey="6419a7008b45d90497619e9ad01f7c90a143dca2";//marvel api private Key
let hashKey= md5(timestamp+privateKey+publicKey); //hash key md5(timestamp+privateKey+publicKey)
let keyValues=window.location.search;//get the query string from the Url
const urlParams = new URLSearchParams(keyValues);//convert it to parameters
const characterId = urlParams.get('character');//get the 'character' from the parameters and store it in the variable
let characterDetails=document.getElementById('character_details');//output element for displaying the data
//Url to fetch data from
let detailsUrl=`https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${hashKey}`;
//fetching data from the Url
fetch(detailsUrl)
    .then((response) => response.json())
    .then((data) => displayDetails(data));
//displaying resultdata in the web page
function displayDetails(res){
    //storing received Data in a variable
    let resultData=res.data.results[0];
    //string to store the character details
    let charDetails=`<img src="${resultData.thumbnail.path}.${resultData.thumbnail.extension}" alt="${resultData.name}" width="100%">
    <h2 class="text-white">${resultData.name}</h2>
    <p class="text-white">${resultData.description}</p>`;
    characterDetails.innerHTML=charDetails;//displaying data to details page 
    let comics=resultData.comics.items;//comics list
    let series=resultData.series.items;//series list
    let stories=resultData.stories.items;//stories list
    let events= resultData.events.items;//events list
    
//dispalying comic list
    let comicData="<ul>";
    for(let i of comics)
    {
        comicData+=`<li>${i.name}</li>`;
    }
    comicData+="</ul>";
    document.getElementById('comics').innerHTML=comicData;

//displaying series list
    let seriesData="<ul>";
    for(let i of series)
    {
        seriesData+=`<li>${i.name}</li>`;
    }
    seriesData+="</ul>";
    document.getElementById('series').innerHTML=seriesData;

//displaying stories list
    let storiesData="<ul>";
    for(let i of stories)
    {
        storiesData+=`<li>${i.name}</li>`;
    }
    storiesData+="</ul>";
    document.getElementById('stories').innerHTML=storiesData;

//dispalying events list
    let eventsData="<ul>";
    for(let i of events)
    {
        eventsData+=`<li>${i.name}</li>`;
    }
    eventsData+="</ul>";
    document.getElementById('events').innerHTML=eventsData;
}