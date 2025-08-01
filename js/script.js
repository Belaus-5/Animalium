// ===== VALIDACION DEL FORMULARIO + MAPA =====
document.addEventListener("DOMContentLoaded", () => {
    // --- VALIDACION DEL FORMULARIO ---
    const form = document.getElementById("form-contacto");

    const inputNombre = document.getElementById("nombre");
    const inputApellidos = document.getElementById("apellidos");
    const inputCorreo = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");

    const errorNombre = document.getElementById("error-nombre") || { textContent: "" };
    const errorApellidos = document.getElementById("error-apellidos") || { textContent: "" };
    const errorCorreo = document.getElementById("error-correo") || { textContent: "" };
    const errorTelefono = document.getElementById("error-telefono") || { textContent: "" };

    function validarNombre() {
        const valor = inputNombre.value.trim();
        const regex = /^[A-Za-z\s]{3,40}$/;
        if (valor === "") {
            errorNombre.textContent = "El nombre es obligatorio.";
            return false;
        }
        if (!regex.test(valor)) {
            errorNombre.textContent = "Solo letras y espacios (3-40 caracteres).";
            return false;
        }
        errorNombre.textContent = "";
        return true;
    }

    function validarApellidos() {
        const valor = inputApellidos.value.trim();
        const regex = /^[A-Za-z\s]{4,60}$/;
        if (valor === "") {
            errorApellidos.textContent = "Los apellidos son obligatorios.";
            return false;
        }
        if (!regex.test(valor)) {
            errorApellidos.textContent = "Solo letras y espacios (4-60 caracteres).";
            return false;
        }
        errorApellidos.textContent = "";
        return true;
    }

    function validarTelefono() {
        const valor = inputTelefono.value.trim();
        const regex = /^\d{9}$/;
        if (valor === "") {
            errorTelefono.textContent = "El telefono es obligatorio.";
            return false;
        }
        if (!regex.test(valor)) {
            errorTelefono.textContent = "Debe tener 9 numeros.";
            return false;
        }
        errorTelefono.textContent = "";
        return true;
    }

    function validarCorreo() {
        const valor = inputCorreo.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (valor === "") {
            errorCorreo.textContent = "El correo es obligatorio.";
            return false;
        }
        if (!regex.test(valor)) {
            errorCorreo.textContent = "Formato invalido. Usa ejemplo@dominio.com";
            return false;
        }
        errorCorreo.textContent = "";
        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombreOk = validarNombre();
        const apellidosOk = validarApellidos();
        const telefonoOk = validarTelefono();
        const correoOk = validarCorreo();

        if (nombreOk && apellidosOk && telefonoOk && correoOk) {
            alert("Formulario enviado correctamente.");
            form.reset();
        } else {
            alert("Corrige los errores antes de enviar.");
        }
    });

    inputNombre.addEventListener("input", validarNombre);
    inputApellidos.addEventListener("input", validarApellidos);
    inputTelefono.addEventListener("input", validarTelefono);
    inputCorreo.addEventListener("input", validarCorreo);

    // ===== MAPA DINAMICO (Leaflet) =====
    const mapaDiv = document.getElementById("mapa");

    if (mapaDiv) {
        const ubicacionPorDefecto = { lat: 43.2630, lng: -2.9350 }; // Bilbao

        function mostrarMapa(coords) {
            const map = L.map("mapa").setView([coords.lat, coords.lng], 14);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(map);

            L.marker([coords.lat, coords.lng]).addTo(map)
                .bindPopup("Estamos aqui")
                .openPopup();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    };
                    mostrarMapa(coords);
                },
                () => {
                    mostrarMapa(ubicacionPorDefecto);
                }
            );
        } else {
            mostrarMapa(ubicacionPorDefecto);
        }
    }
});
