// Fonction pour le chiffrement affine
function encryptAffine(message, a, b) {
    return message
        .toUpperCase()
        .replace(/[A-Z]/g, char => {
            const x = char.charCodeAt(0) - 65;
            const encrypted = (a * x + b) % 26;
            return String.fromCharCode(encrypted + 65);
        });
}

// Fonction pour le déchiffrement affine
function decryptAffine(message, a, b) {
    // Calcul de l'inverse modulaire de a
    const modInverse = (a, m) => {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) return x;
        }
        throw new Error("a et 26 ne sont pas coprimes !");
    };

    const aInv = modInverse(a, 26);
    return message
        .toUpperCase()
        .replace(/[A-Z]/g, char => {
            const x = char.charCodeAt(0) - 65;
            const decrypted = (aInv * (x - b + 26)) % 26;
            return String.fromCharCode(decrypted + 65);
        });
}

// Gestion des événements
document.getElementById("encrypt-btn").addEventListener("click", () => {
    const message = document.getElementById("message").value;
    const a = parseInt(document.getElementById("key-a").value);
    const b = parseInt(document.getElementById("key-b").value);

    try {
        const encrypted = encryptAffine(message, a, b);
        document.getElementById("output").innerText = encrypted;
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById("decrypt-btn").addEventListener("click", () => {
    const message = document.getElementById("message").value;
    const a = parseInt(document.getElementById("key-a").value);
    const b = parseInt(document.getElementById("key-b").value);

    try {
        const decrypted = decryptAffine(message, a, b);
        document.getElementById("output").innerText = decrypted;
    } catch (error) {
        alert(error.message);
    }
});
