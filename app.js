function soumettreFormulaire(event) {
    event.preventDefault();
    const nombre = parseInt(document.getElementById('nombre').value);
    if (nombre >= 1 && nombre <= 1000) {
        afficherSequence(nombre);
    } else {
        alert("Le nombre doit être entre 1 et 1000 !");
    }
}

function afficherSequence(nombre) {
    document.getElementById('formulaire').style.display = 'none';
    document.getElementById('sequence').style.display = 'block';
    genererSequence(nombre);
}

function genererSequence(nombre) {
    let compteur = 0;
    const interval = setInterval(() => {
        if (compteur >= nombre) {
            clearInterval(interval);
            return;
        }

        fetch('https://api.prod.jcloudify.com/whoami')
            .then(response => {
                if (response.ok) {
                    document.getElementById('output').innerText += `${compteur + 1}. Forbidden\n`;
                    compteur++;
                } else if (response.status === 403) {
                    document.getElementById('output').innerText += 'Captcha détecté. Résolvez-le pour continuer.\n';
                }
            })
            .catch(error => {
                console.error('Erreur de requête:', error);
            });
    }, 1000);
}
