const publicaciones = [];

document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagen = document.getElementById("imagen").files[0];

    if (!imagen) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    const urlImg = URL.createObjectURL(imagen);

    const publicacion = {
        titulo,
        descripcion,
        urlImg,
        likes: 0,
        nolikes: 0,
        love: 0
    };

    publicaciones.push(publicacion);
    renderFeed();
    this.reset();
    document.getElementById("vistaPrevia").style.display = "none";

    // Cierra el modal automáticamente
    const modal = bootstrap.Modal.getInstance(document.getElementById('contactoModal'));
    modal.hide();

    // Muestra alerta de éxito
    document.getElementById("alerta-exito").classList.remove("d-none");
    setTimeout(() => {
        document.getElementById("alerta-exito").classList.add("d-none");
    }, 3000);
});

document.getElementById("imagen").addEventListener("change", function () {
    const archivo = this.files[0];
    const vistaPrevia = document.getElementById("vistaPrevia");

    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (e) {
            vistaPrevia.src = e.target.result;
            vistaPrevia.style.display = 'block';
        };
        lector.readAsDataURL(archivo);
    } else {
        vistaPrevia.style.display = 'none';
    }
});

function renderFeed() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    publicaciones.forEach((publi, index) => {
        const div = document.createElement("div");
        div.classList.add("post", "card", "p-2", "mb-3");
        div.innerHTML = `
            <img src="${publi.urlImg}" class="card-img-top" alt="Imagen">
            <div class="card-body">
                <h5 class="card-title">${publi.titulo}</h5>
                <p class="card-text">${publi.descripcion}</p>
                <div class="reacciones">
                    <button class="btn btn-sm btn-outline-success" onclick="darLike(${index})">👍 ${publi.likes}</button>
                    <button class="btn btn-sm btn-outline-success" onclick="darNoLike(${index})">👎 ${publi.nolikes}</button>
                    <button class="btn btn-sm btn-outline-success" onclick="darLove(${index})">💖 ${publi.love}</button>
                </div>
            </div>
        `;
        feed.appendChild(div);
    });
}

function darLike(index) {
    publicaciones[index].likes++;
    renderFeed();
}

function darNoLike(index) {
    publicaciones[index].nolikes++;
    renderFeed();
}
function darLove(index) {
    publicaciones[index].love++;
    renderFeed();
}
