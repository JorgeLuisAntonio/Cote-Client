const pays = [];
var pib=[];
change=true;


async function get_Data() {
    await fetch('https://api.covid19api.com/summary').then((response) => response.json())
    .then((responseJson) => {   
 responseJson.Countries.forEach((element=>  pays.push(element)));
 pays.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
 afficherTable();
        nb.addEventListener("keydown", function (e) {
            if (e.keyCode === 13 ) {
            afficherTableDinamica();
            }
        });

    })
   };

function afficherTable(){
 
  var contenido="";
  for (var i = 0; i < 8; i++){
    var pibhab= Math.floor(Math.random() * 100000)
    pib[i]=pibhab;
     contenido += "<tr>";
     contenido+="<td><img src='https://flagcdn.com/16x12/"+pays[i].CountryCode.toLowerCase()+".png'></td>";
     contenido += "<td>" + pays[i].Country + "</td>";
     contenido += "<td>" + pays[i].TotalConfirmed + "</td>";
     contenido += "<td>" + pays[i].TotalDeaths + "</td>";
     contenido += "<td>" + pib[i] + "</td>";
     contenido += "</tr>";
   }
   document.getElementById("tbodyEmpleados").innerHTML = contenido;
}

function afficherTableDinamica(nb){
   nb = document.getElementById("nb");
if(nb.value>0){     
  var con="";
    for (var i = 0; i < nb.value; i++){
      var pibhab= Math.floor(Math.random() * 100000)
    pib[i]=pibhab;
       con += "<tr>";
       con+="<td><img src='https://flagcdn.com/16x12/"+pays[i].CountryCode.toLowerCase()+".png'></td>";
       con += "<td>" + pays[i].Country + "</td>";
       con += "<td>" + pays[i].TotalConfirmed + "</td>";
       con += "<td>" + pays[i].TotalDeaths + "</td>";
       con += "<td>" + pib[i] + "</td>";
       con += "</tr>";
     }
     document.getElementById("tbodyEmpleados").innerHTML = con;
     
 }else{
   afficherTable();
 }
}
function sortPib(){
  if(change){
    pib.sort((a, b) => a-b );
    afficherTableDinamica();
      change=false;
  }else if(change===false){
    pib.sort((a, b) => b- a);
   afficherTableDinamica();
    change=true;
  }
}
function sortTotalCas(){
  if(change){
    pays.sort((a, b) => a.TotalConfirmed-b.TotalConfirmed );
    afficherTableDinamica();
      change=false;
  }else if(change===false){
    pays.sort((a, b) => b.TotalConfirmed- a.TotalConfirmed);
   afficherTableDinamica();
    change=true;

  }
}
 function sortDeces(){
  if(change){
    pays.sort((a, b) => a.TotalDeaths-b.TotalDeaths );
  afficherTableDinamica();
      change=false;
  }else if(change===false){
    pays.sort((a, b) => b.TotalDeaths- a.TotalDeaths);
    afficherTableDinamica();
    change=true;
  }
  }
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
 async  function drawChart() { 
let array=[];
pib.sort((a, b) => b-a );
array.push(["Pib/Hab", "Nb Caso"]);
for (let i= 0; i < 8; i++) {
  array.push([pib[i],  pays[i].TotalConfirmed]);
}
    var data = google.visualization.arrayToDataTable(array);
    var options = {
      title: 'nb cas vs pib/hab',
      hAxis: {title: 'Pib/Hab', minValue: 0, maxValue:10000 },
      vAxis: {title: 'Nb Cas', minValue: 0, maxValue:60000000},
      legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  }
  
document.addEventListener("DOMContentLoaded",async()=>{
try{
    await get_Data();
    await drawChart();
    
    
    
}catch(e){
console.log(e);
}

});
    
