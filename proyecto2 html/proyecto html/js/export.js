// Mostrar datos y renderizar tabla
function renderClientes() {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let clientesTable = document.getElementById("clientesTable");

    clientesTable.innerHTML = clientes.map((c, i) =>
        `<tr><td>${c.usuario}</td><td>${c.nombre}</td><td>${c.empresa}</td>
         <td><button onclick="borrarCliente(${i})">🗑️ Eliminar</button></td></tr>`).join("");
}

// Borrar cliente
function borrarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.splice(index, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderClientes();
}

// Mostrar mensaje temporal
function mostrarMensaje(texto) {
    const mensajeError = document.getElementById("mensajeError");
    if (mensajeError) {
        mensajeError.textContent = texto;
        setTimeout(() => {
            mensajeError.textContent = "";
        }, 5000); // se borra después de 5 segundos
    }
}

// Descargar Excel solo si es usuario autorizado
document.getElementById("descargarExcel")?.addEventListener("click", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    // Verifica que el usuario sea 7000 o 7001, sin importar los otros campos
    if (!user || (user.usuario !== "7000" && user.usuario !== "7001")) 
        {
             mostrarMensaje("Estás registrado pero no puedes descargar el Excel.");
        return;
    }

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    if (clientes.length === 0) {
        mostrarMensaje("No hay datos para exportar.");
        return;
    }

    // Eliminar la contraseña
    let clientesSinPassword = clientes.map(({ password, ...resto }) => resto);

    let ws = XLSX.utils.json_to_sheet(clientesSinPassword);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");

    XLSX.writeFile(wb, "clientes.xlsx");
});

