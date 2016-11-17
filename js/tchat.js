(function () {
    function sendXhr(oEvent) {
        var oXhrSend = new XMLHttpRequest(); // création de la requete
        oXhrSend.open("POST", 'http://cam.ldnr.fr/~sebastienloubet/javascript/projet/php/tchat.php'); // ouverture du xhr
        /*        oXhrSend.addEventListener('load', function () { // écouteur sur xhr de lévènement load  
                        if ((oXhrSend.status >= 200) && (oXhrSend.status < 400)) { // on regarde le statut de xhr
                            getMessages(); // si le statut est bon alors on appelle la fonction recuperer
                        }
        });*/
        var oFormData = new FormData(); // déclaration formdata avec new
        oFormData.append("pseudo", document.getElementById("pseudo").value); // on ajoute la valeur de pseudo dans formdata
        oFormData.append("message", document.getElementById("message").value); // on ajoute la valeur de message dans formdata
        oXhrSend.send(oFormData); // envoi de la requete xhr avec la méthode send qui prend en paramètre FormData
        document.getElementById("message").value = ''; //On vide le message
        oEvent.preventDefault(); // empeche le rafraichissement de la page à chaque click
    }

    function getMessages(oXhr) {
        if (oXhr.readyState == 4 || oXhr.readyState == 0) { //chekc if the previous request is done or if the request was never opened
            oXhr.open("GET", 'http://cam.ldnr.fr/~sebastienloubet/javascript/projet/php/tchatContent.php'); // ouverture du xhr
            oXhr.send(null); // envoie de la requete xhr qui n'a aucun paramètre
        }
    }

    function initialize() { // Note that this encapsulation is not required as the code would be in the IIFE anyway
        var oXhrMessages = new XMLHttpRequest(); // pour avoir une et une seule requete xhr pour rafraichir le tchat
        oXhrMessages.addEventListener('load', function () { // écouteur sur xhr de lévènement load  
            if ((oXhrMessages.status >= 200) && (oXhrMessages.status < 400)) { // on regarde le statut de xhr
                document.getElementById("tchat").innerHTML = oXhrMessages.responseText; // dans l'id tchat on insère ce qui y a dans textContent.htm
            }
        });
        document.addEventListener("DOMContentLoaded", function () {
            getMessages(oXhrMessages)
        }); // quand la page vas s'ouvrir on récupère ce qui y a dans le chat
        document.getElementById('tchatForm').addEventListener('submit', sendXhr); // on ajoute un écouteur d'évènement sur l'id form à chaqque submit on appelle la fonction sendXhr
        var secondId = setInterval(function () {
            getMessages(oXhrMessages)
        }, 1000); // on déclare une variable qui sera affectée par un setInterval qui prend en paramètre Refresh et il rafraichira toutes les secondes
    }
    //Main code
    initialize();
})();