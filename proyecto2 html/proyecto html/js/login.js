// Mostrar u ocultar la contraseña
document.getElementById("togglePassword")?.addEventListener("click", function () {
    let passwordField = document.getElementById("passwordRegistro");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.textContent = "🙈";
    } else {
        passwordField.type = "password";
        this.textContent = "👁️";
    }
});

// Lógica de inicio de sesión
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarioInput = document.getElementById("usuario").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const usuarioEncontrado = clientes.find(c => c.usuario === usuarioInput && c.password === passwordInput);

    if (!usuarioEncontrado) {
        mensajeError.textContent = "Usuario o contraseña incorrectos.";
        return;
    }

    // Guardar usuario autenticado
    localStorage.setItem("loggedInUser", JSON.stringify(usuarioEncontrado));

    // Redirigir al dashboard
    window.location.href = "../pages/dashboard.html";
});
// Mostrar u ocultar la contraseña
document.getElementById("togglePassword")?.addEventListener("click", function () {
    let passwordField = document.getElementById("passwordRegistro");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.textContent = "🙈";
    } else {
        passwordField.type = "password";
        this.textContent = "👁️";
    }
});