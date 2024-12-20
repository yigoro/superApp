const Productos = document.getElementById("product-container")
const Buscador = document.getElementById("buscador")

Buscador.addEventListener("input", async (e) => {
  e.preventDefault();

  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQyLVaEmCvBCmq3YVM7ysFHvbXNzcHAJY22K_-K7epbbe0Rso9uK3320s5twHwQwPAGMu2B5MLmPhys/pub?output=csv');
  const csv = await response.text();

  const rows = csv.split("\n").slice(1); // Divide el CSV en filas y elimina la cabecera
  const data = rows.map(row => {
    const [id, rubro, link, descripcion, agregado, comprado] = row.split(",");
    return { id, rubro, link, descripcion, agregado, comprado };
  });

  const searchTerm = e.target.value.toLowerCase();
  const dataFiltrada = data.filter(el => el.rubro.toLowerCase().includes(searchTerm));

  Productos.innerHTML = "";

  dataFiltrada.forEach(el => {
    creadoraDeCards(el.id, el.rubro, el.link, el.descripcion, el.agregado, el.comprado);
  });
});


document.addEventListener("DOMContentLoaded", async ()=>{
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQyLVaEmCvBCmq3YVM7ysFHvbXNzcHAJY22K_-K7epbbe0Rso9uK3320s5twHwQwPAGMu2B5MLmPhys/pub?output=csv');
  const csv = await response.text();

  // Parse the CSV data
  const products = csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [id, rubro, link, descripcion, agregado, comprado] = row.split(",");
      return { id, rubro, link, descripcion, agregado, comprado };
    });

    console.log(products)

    products.map(el => {
      creadoraDeCards(el.id, el.rubro, el.link, el.descripcion, el.agregado, el.comprado)
  })

});
  
const creadoraDeCards = (id, rubro, link, descripcion, agregado, comprado) => {

  const container = document.createElement("div")
  container.classList.add("producto")

    //const rubro = document.createElement("h3")
    const img = document.createElement("img")
    const desc = document.createElement("p")
    const boton = document.createElement("button")

    container.append(rubro, img, desc, boton)

    rubro.innerText = rubro
    img.src = link
    desc.innerText = descripcion
    boton.innerText = "Agregar"

    boton.addEventListener("click", ()=>{

      console.log("se presiono boton")

      Swal.fire({
        title: "Agregado",
        text: descripcion,
        icon: "success",
        timer: 1600,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'bottom-end'
    });
    })


    Productos.append(container)

  }

