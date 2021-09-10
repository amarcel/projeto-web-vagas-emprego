function verificarWebStore() {
    if (typeof(Storage) !== "undefined") {
        alert("Possui suporte para gravar dados");
    } else {
        alert("Sorry... :(");
    }
}
function favoritar(favorito, idVaga) {
    let classe = favorito.className;
    if (classe === "fa fa-heart-o") {
        favorito.className = "fa fa-heart";
        // Store
        if(idVaga >= 0) {
            localStorage.setItem("vaga_"+idVaga, idVaga);
            console.log('Vaga ' + idVaga + ' inserida no BD browser');
        }
    } else if (classe === "fa fa-heart") {
        favorito.className = "fa fa-heart-o";
        // Remove
        if(idVaga >= 0) {
            localStorage.removeItem("vaga_"+idVaga);
            console.log('Vaga ' + idVaga + ' removida do BD browser');
        }
    }
}
function acessarAPI(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}
function carregarDadosAPI() {
    let dados = acessarAPI("https://mock-json-service.glitch.me/");
    let vagas = JSON.parse(dados);
    
    divDados = '';
    vagas.forEach(e => {
        // Retrieve
        favoritou = localStorage.getItem("vaga_"+e.id);
        if (parseInt(favoritou) >= 0 ) {
            classeFavorito = "fa fa-heart";
        } else {
            classeFavorito = "fa fa-heart-o";
        }

        divDados += '<div class="card">';
        divDados += '<div class="container">';
        divDados += '<h4>';
        divDados += '<b>Vaga ID '+e.id+'</b>&nbsp;&nbsp;&nbsp;<i onclick="favoritar(this,'+e.id+')" class="'+classeFavorito+'"></i>';
        divDados += '</h4>';
        divDados += '<p>Empresa: '+e.company+'</p>';
        divDados += '<p>Descrição: '+e.description+'</p>';
        divDados += '<p>Tipo: '+e.employmentType+'</p>';
        divDados += '<p>Localização: '+e.location+'</p>';
        divDados += '<p>Cargo: '+e.position+'</p>';
        divDados += '<p>Habilidades: '+e.skillsRequired+'</p>';
        divDados += '</div></div>';
    });
    document.getElementById("dados_vagas").innerHTML = divDados;
}