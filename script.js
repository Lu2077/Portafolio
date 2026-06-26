// Espera a que todo el HTML de la página esté completamente cargado en memoria
window.addEventListener('DOMContentLoaded', () => {
    
    const cubo = document.getElementById('miCubo');
    const container = document.getElementById('warpContainer');
    const numeroEstrellas = 40; // Cantidad de ráfagas en pantalla
    
    let estaArrastrando = false;
    let rotacionX = -30;
    let rotacionY = 45;
    let ultimoXMouse, ultimoYMouse;

    // 1. GENERADOR DE ESTRELLAS CON CONTROL DE SEGURIDAD
    if (container) {
        for (let i = 0; i < numeroEstrellas; i++) {
            const estrella = document.createElement('div');
            estrella.className = 'estrella-linea';
            
            // Ángulo de abanico aleatorio en 360 grados
            const angulo = Math.random() * 360;
            // Inclinación matemática para abrir las ráfagas hacia la periferia
            const inclinacion = (Math.random() * 20) + 15; 
            // Desfase de tiempo para una transición fluida e infinita
            const retraso = Math.random() * 1.5;

            // Inyectamos las variables personalizadas al CSS
            estrella.style.setProperty('--angulo', `${angulo}deg`);
            estrella.style.setProperty('--inclinacion', `${inclinacion}deg`);
            estrella.style.animationDelay = `${retraso}s`; // Se eliminó la línea inválida styleWith

            container.appendChild(estrella);
        }
    }

    // 2. CONTROL INTERACTIVO DEL CUBO
    if (cubo) {
        // Inicializamos la posición del cubo en el espacio 3D
        cubo.style.transform = `rotateX(${rotacionX}deg) rotateY(${rotacionY}deg)`;

        cubo.addEventListener('mousedown', (e) => {
            estaArrastrando = true;
            ultimoXMouse = e.clientX;
            ultimoYMouse = e.clientY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!estaArrastrando) return;
            
            const deltaX = e.clientX - ultimoXMouse;
            const deltaY = e.clientY - ultimoYMouse;
            
            // El factor 0.4 reduce sutilmente la velocidad para un control más suave
            rotacionY += deltaX * 0.4; 
            rotacionX -= deltaY * 0.4;
            
            cubo.style.transform = `rotateX(${rotacionX}deg) rotateY(${rotacionY}deg)`;
            
            ultimoXMouse = e.clientX;
            ultimoYMouse = e.clientY;
        });

        window.addEventListener('mouseup', () => {
            estaArrastrando = false;
        });
    }
});
