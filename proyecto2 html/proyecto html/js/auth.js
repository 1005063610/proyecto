document.addEventListener("DOMContentLoaded", function () {
    // Registro de usuario
    document.getElementById("registroForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();
        let empresa = document.getElementById("empresa").value.trim();
        let usuario = document.getElementById("usuarioRegistro").value.trim();
        let password = document.getElementById("passwordRegistro").value.trim();
        let correo = document.getElementById("correo").value.trim();
        let celular = document.getElementById("celular").value.trim();

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        if (clientes.some(c => c.usuario === usuario)) {
            alert("El usuario ya está registrado.");
            return;
        }

        // Verifica que la contraseña sea segura
        if (!validarPassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
            return; // Impide el registro si no cumple con los requisitos
        }

        clientes.push({ nombre, empresa, usuario, password, correo, celular });
        localStorage.setItem("clientes", JSON.stringify(clientes));

        alert("Registro exitoso.");
        document.getElementById("registroForm").reset();
    });

    // Login
    document.getElementById("loginForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        let usuario = document.getElementById("usuarioLogin").value.trim();
        let password = document.getElementById("passwordLogin").value.trim();

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        let cliente = clientes.find(c => c.usuario === usuario && c.password === password);

        if (cliente) {
            localStorage.setItem("usuarioLogueado", JSON.stringify(cliente));
            window.location.href = "dashboard.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });

    // Logout
    document.getElementById("logout")?.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "login.html";
    });

    // Función para validar la seguridad de la contraseña
    function validarPassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    // Recuperar contraseña
    document.getElementById("recuperarForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        let usuario = document.getElementById("usuarioRecuperar").value.trim();
        let contacto = document.getElementById("contactoRecuperar").value.trim();

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        let cliente = clientes.find(c => c.usuario === usuario && (c.correo === contacto || c.celular === contacto));

        if (cliente) {
            let nuevaPassword = Math.random().toString(36).slice(-8);
            cliente.password = nuevaPassword;
            localStorage.setItem("clientes", JSON.stringify(clientes));

            alert(`Tu nueva contraseña es: ${nuevaPassword}`);
        } else {
            alert("No se encontró una cuenta con esos datos.");
        }
    });

    // Mostrar/ocultar la contraseña
    document.getElementById("togglePassword")?.addEventListener("click", function () {
        let passwordField = document.getElementById("passwordRegistro");
        if (passwordField.type === "password") {
            passwordField.type = "text";
            this.textContent = "🙈"; // Cambia icono
        } else {
            passwordField.type = "password";
            this.textContent = "👁️"; // Cambia icono
        }
    });
});
const bcrypt = require('bcryptjs');

// Al registrar un usuario
bcrypt.hash(password, 10, function(err, hashedPassword) {
    // Guarda hashedPassword en lugar de la contraseña original
});

// Al hacer login
bcrypt.compare(password, storedHashedPassword, function(err, isMatch) {
    if (isMatch) {
        // Login exitoso
    } else {
        // Contraseña incorrecta
    }
});
