let ruta = "http://localhost:3000/data"
fetch(ruta)
.then(response => response.json())
.then(  data => {
    let lista = Object.values(data)
    let datos = document.getElementById("valores")
    let agregar ="";
    console.log(lista)
    for(let i = 0; i<lista[1].length;i++){
    agregar +=`<p>${lista[1][i].valor_luminosidad}</p>`
    datos.innerHTML = agregar
}
}
)

