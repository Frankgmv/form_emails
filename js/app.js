toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  
const emailData = {
    email: '',
    asunto: '',
    mensaje: ''
};

Object.seal(emailData);

document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");


    inputEmail.addEventListener("input", validarEntradas)
    inputAsunto.addEventListener("input", validarEntradas)
    inputMensaje.addEventListener("input", validarEntradas)
    btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        resetFormulario();
    })

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');


        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();
            // Display an info toast with no title
            toastr["success"]("Hecho", "Email enviado")
        }, 2000);


    })


    function validarEntradas(e) {
        let targetEvent = e.target

        if (!targetEvent.value.trim()) {
            mostrarAlerta(`El campo ${targetEvent.id} es obligatorio`, targetEvent.parentElement)
            emailData[targetEvent.id] = '';
            comprobarEmailData()
            return;
        }

        //validación de email
        if (targetEvent.id == "email") {
            if (!EmailValidation(targetEvent.value)) {
                mostrarAlerta("El email no es inválido ", targetEvent.parentElement);
                emailData[targetEvent.id] = '';
                return;
            }
        }

        suprimirALerta(targetEvent.parentElement);


        emailData[targetEvent.id] = targetEvent.value.trim().toLowerCase();
        comprobarEmailData();
    }

    function mostrarAlerta(mensaje, referencia) {

        suprimirALerta(referencia)
        let p = document.createElement('p');
        p.textContent = mensaje
        p.classList.add("bg-red-600", "text-white", "p-2", "text-center")
        referencia.appendChild(p);
    }

    function suprimirALerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove();
        }
    }

    function EmailValidation(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function comprobarEmailData() {
        if (Object.values(emailData).includes('')) {
            btnEnviar.classList.add('opacity-50')
            btnEnviar.disabled = true;
        } else {
            btnEnviar.classList.remove('opacity-50')
            btnEnviar.disabled = false;
        }

    }

    function resetFormulario() {

        emailData.asunto = '';
        emailData.email = '';
        emailData.mensaje = '';
        comprobarEmailData();
        formulario.reset();
    }
})