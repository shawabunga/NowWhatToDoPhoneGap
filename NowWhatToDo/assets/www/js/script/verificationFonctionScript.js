//Verifier les champs des formulaires en js et colorie le champ si incorrect 
function surligne(champ, erreur) {
    if (erreur)
        champ.style.backgroundColor = "#fba";
    else
        champ.style.backgroundColor = "";
}

//Indique si le champ est correct 
function verifNom(champ) {
    if (champ.value.length < 2 || champ.value.length > 30) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifString(champ) {
    if (champ.value.length < 2 || champ.value.length > 100) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifMdp(champ)
{
    if (champ.value.length < 0 || champ.value.length > 15 || champ.value.length == 0) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifMdpBis(champ)
{
    if (champ.value != document.getElementById("password").value) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifEmail(champ) {
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(champ.value)) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifAge(champ) {
    if (champ.value < 0 || champ.value > 150 || champ.value.length == 0) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifCodePostal(champ)
{
    if (champ.value.length < 0 || champ.value.length > 5 || champ.value.length == 0) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}

function verifTelephone(champ)
{
    if (champ.value.length < 0 || champ.value.length > 20 || champ.value.length == 0) {
        surligne(champ, true);
        return false;
    }
    else {
        surligne(champ, false);
        return true;
    }
}