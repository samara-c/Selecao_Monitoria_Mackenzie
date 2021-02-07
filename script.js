
const urlBase = "https://pokeapi.co/api/v2/pokemon/";

window.onload = function () {
  let pokemonSorteado = urlBase + randomPokemon();
  getJSON(pokemonSorteado, showCard);
  let contador = 0;
  
  let botaoVerificar = document.getElementById("botao-confirmar");
  let botaoDesistir = document.getElementById("botao-desistir");

  botaoDesistir.addEventListener("click", function () {
    getJSON(pokemonSorteado, function (data) {
      var name = data.name;
      contador += 1;
      mensagem = "<p style='color:red'> Uma pena você desistir.. esse pokémon é o "+name[0].toUpperCase() + name.slice(1).toLowerCase()+". </p>";
      var d = document.getElementById("espaco-resposta");
      d.innerHTML += mensagem;
      botaoDesistir.disabled = true;
      botaoVerificar.disabled = true;
      
    });
  });


  botaoVerificar.addEventListener("click", function () {
   getJSON(pokemonSorteado, function(data) {
     var name = data.name;
     var entrada = document.getElementById("pkname").value.toLowerCase();
     contador+=1;


    if (name == entrada ) {
      var resposta = "<div id='respostaCerta' style='color:green'>";
      resposta+= "<p> Você acertou! Esse é o "+name[0].toUpperCase() + name.slice(1).toLowerCase()+"! </p>";
      resposta+="</div";
      var d = document.getElementById("espaco-resposta");
      if (contador!=1){
        document.getElementById("respostaCerta").remove();
        console.log(contador);

      }
      d.innerHTML += resposta;

      botaoDesistir.disabled = true;

    }});
   
  });

}  





function randomPokemon() {
  var pokemonNum = Math.floor(Math.random() * 731 + 1);
  return pokemonNum;
}



function showCard(data) {
  var img = data.sprites.front_default;
  var name = data.name;
  
  

  // ATRIBUTOS


  var card = "<div id='pokemonFoto'>";
  card += "<img src='" + img + "'/>";
  card += "<p id='nome-pokemon'>" + name[0].toUpperCase() + name.slice(1).toLowerCase() + "</p>";


  card += "</div>";

  var d = document.getElementById("pokemon-container");
  d.innerHTML += card;

}

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Dados recebidos com sucesso!");
      callback(xhr.response);
    } else {
      console.warn("Problemas ao conectar com a API: " + xhr.status);
    }
  };
  xhr.send();
}


