// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
  fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response){
    response.json().then( function(json) {
      // console.log(json[0])
      let missionTarget = document.getElementById('missionTarget');
      missionTarget.innerHTML = `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[0].name}</li>
         <li>Diameter: ${json[0].diameter}</li>
         <li>Star: ${json[0].star}</li>
         <li>Distance from Earth: ${json[0].distance}</li>
         <li>Number of Moons: ${json[0].moons}</li>
      </ol>
      <img src="${json[0].image}">
      `;
      console.log(missionTarget.innerHTML)
      //missionTarget.innerhtml = '<h2>Mission Destination</h2>'
      //console.log(missionTarget.innerhtml)
    });
  });
  let form = document.querySelector("form");
  let faultyItems = document.getElementById('faultyItems');
  let launchStatus = document.getElementById('launchStatus');
  form.addEventListener("submit", function(event) {
    let pilotName = document.querySelector('input[name=pilotName]');
    let copilotName = document.querySelector('input[name=copilotName]');
    let fuelLevel = document.querySelector('input[name=fuelLevel]');
    let cargoMass = document.querySelector('input[name=cargoMass]');
    if( pilotName.value === '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value ===''){
      alert('All Fields Required!!')
      event.preventDefault();
    }
    if (isNaN(Number(cargoMass.value)) || isNaN(Number(fuelLevel.value))){
      console.log(cargoMass.value);
      alert('Please Enter Numbers for Cargo Mass and Fuel Level');
      event.preventDefault();
    }
    faultyItems.childNodes[1].childNodes[1].textContent = `Pilot ${pilotName.value} is ready for launch`;
    faultyItems.childNodes[1].childNodes[3].textContent = `Copilot ${copilotName.value} is ready for launch`;
    if (Number(fuelLevel.value)<10000){
      //console.log(faultyItems.childNodes[1].childNodes[3]);
      faultyItems.style.visibility = 'visible';
      let fuelStatus = document.getElementById('fuelStatus');
      //console.log(fuelStatus.textContent);
      fuelStatus.textContent = 'Fuel Level too low for launch!';
      launchStatus.style.color = 'red';
      launchStatus.textContent = 'Shuttle not ready for launch';
      event.preventDefault();
    }
    if (Number(cargoMass.value>10000)){
      launchStatus.style.color = 'red';
      launchStatus.textContent = 'Shuttle not ready for launch';
      let cargoStatus = document.getElementById('cargoStatus');
      cargoStatus.textContent = 'Cargo mass too high for launch';
      event.preventDefault();
    }
  });
});
