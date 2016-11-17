(function () {
    var eInscriptionButton = document.getElementById('inscriptionButton'),
        eInscriptionForm = document.getElementById('inscriptionForm'),
        eConnexionButton = document.getElementById('connexionButton'),
        eConnexionForm = document.getElementById('connexionForm'),
        eTchatButton = document.getElementById('tchatButton'),
        eTchatContainer = document.getElementById('tchatContainer'),
        eGeneratorButton = document.getElementById('generatorButton'),
        eGeneratorContainer = document.getElementById('generatorContainer'),
        eGeneratorResult = document.getElementById('generatorResult'),
        eGenerateButton = document.getElementById('generateButton'),
        eCloseTchatButton = document.getElementById('closeTchatButton'),
        eCloseGeneratorButton = document.getElementById('closeGeneratorButton'),
        eShadow = document.getElementById('shadow');

    eTchatContainer.style.display = "none";
    eGeneratorContainer.style.display = "none";

    eInscriptionButton.addEventListener("click", showForm);
    eConnexionButton.addEventListener("click", showConnexion);
    eTchatButton.addEventListener("click", showTchat);
    eGeneratorButton.addEventListener("click", showGenerator);
    eGenerateButton.addEventListener("click", generateForm);
    eCloseTchatButton.addEventListener("click", closeTchat);
    eCloseGeneratorButton.addEventListener("click", closeGenerator);
    eShadow.addEventListener("click", hideForm);

    function showForm() {
        eInscriptionForm.style.display = "block";
        eShadow.style.display = "block";
    }
    
    function showConnexion(){
        connexionForm.style.display="block";
        shadow.style.display="block";
    }

    function hideForm() {
        eInscriptionForm.style.display = "none";
        eShadow.style.display = "none";
    }

    function showTchat() {
        if (eTchatContainer.style.display == "none") eTchatContainer.style.display = "block";
        else closeTchat();
    }

    function showGenerator() {
        if (eGeneratorContainer.style.display == "none") {
            eGeneratorContainer.style.display = "block";
            sizeGenerator();
        } else {closeGenerator();eGeneratorResult.classList.remove("generated");}
    }

    function closeTchat() {
        eTchatContainer.style.display = "none";
    }

    function closeGenerator() {
        eGeneratorContainer.style.display = "none";
    }

    function sizeGenerator() {
        
        eGeneratorResult.classList.add("generated");
    }
    
    function generateForm(){
        eGeneratorResult.classList.remove("generated");
        setTimeout(sizeGenerator,200);
    }
})();