(function () {
    function checkLengthString(sText, iMin, iMax) { // return true if the length of sText is >= iMin and <iMax if iMax is defined
        if (typeof (sText) !== 'string') showError('In function checkLengthString sText is not a string.'); // must have the first argument as text and the second must be defined
        if (iMin === undefined) showError('In function checkLengthString iMin is null.');
        var iLength = sText.length;
        if (iMax === undefined) {
            if (iLength >= iMin) return true;
            return false;
        } else {
            if (iLength > iMin && iLength < iMax) return true;
            return false;
        }
    }

    function testName() { //Le nom devra comporter au moins 2 lettres et au plus 50.
        var bTest = checkLengthString(document.getElementById('name').value, 2, 50);
        showErrorMessage(bTest, 'name');
        return bTest;
    }

    function testFirstName() { //Le prénom devra comporter au moins 2 lettres et au plus 50. 
        var bTest = checkLengthString(document.getElementById('firstname').value, 2, 50);
        showErrorMessage(bTest, 'firstname');
        return bTest;
    }

    function testNickName() { //Le pseudo devra comporter au moins 6 caractères.
        var bTest = checkLengthString(document.getElementById("nickname").value, 6);
        showErrorMessage(bTest, 'nickname');
        return bTest;

    }

    function testPwd() { //Le mot de passe devra comporter au moins 8 caractères.
        var bTest = checkLengthString(document.getElementById("pwd").value, 8);
        showErrorMessage(bTest, 'pwd');
        return bTest;
    }

    function testAddress() { //L'adresse comportera au plus 100 caractères
        var bTest = checkLengthString(document.getElementById("address").value, -1, 100);
        showErrorMessage(bTest, 'address');
        return bTest;
    }

    function testCity() { //La ville contient au plus 50 caractères. 
        var bTest = checkLengthString(document.getElementById("city").value, -1, 50);
        showErrorMessage(bTest, 'city');
        return bTest;
    }

    function testConfirm() { //Le mot de passe devra âtre vérifié avec une seconde entrée à comparer à la première.
        var bTest = ((document.getElementById('pwd')).value === (document.getElementById('confirm')).value)
        showErrorMessage(bTest, 'confirm');
        return bTest;
    }

    function testZIPCode() { //Le code postal contient exactement 5 chiffres.
        var bTest = ((document.getElementById('ZIPCode')).value.match(/^[0-9]{5}$/) !== null);
        showErrorMessage(bTest, 'ZIPCode');
        return bTest;
    }

    function checkDate(iDay, iMonth, iYear) {
        /* removing crazy values */
        if ((iDay <= 0) || (iMonth <= 0) || (iYear <= 0) || (iDay > 31) || (iMonth > 12)) return false;
        /* check the maximun number of days */
        var iMaxDay = 0;
        switch (iMonth) {
        case 4:
        case 6:
        case 9:
        case 11:
            iMaxDay = 30;
            break;
        default:
            iMaxDay = 31;
        }
        /* Fevrier */
        if (iMonth == 2) {
            iMaxDay = 28;
            if (((iYear % 4) == 0) && (!((iYear % 100) == 0) || ((iYear % 400) == 0))) iMaxDay = 29;
        }
        /* we test the max number of day */
        if (iDay > iMaxDay) return false;
        return true;
    }

    function testBirthday() { //Seule les personnes de 10 ans au moins pourront s'inscrire.
        var tDate = (document.getElementById('birthday').value).match(/[0-9]+/g), // return the numerical value of the match
            oDateNow = new Date(),
            bTest;
        if ((tDate === null) || (tDate.length !== 3) || (tDate[2].length !== 4) || (!checkDate(Number.parseInt(tDate[0]), Number.parseInt(tDate[1]), Number.parseInt(tDate[2])))) {
            bTest = false;
        } else {
            var iNbrAnnee = oDateNow.getFullYear() - Number.parseInt(tDate[2]),
                iNbrMois = oDateNow.getMonth() + 1 - Number.parseInt(tDate[1]),
                MaxNbrAnnee = 10;
            if (iNbrAnnee < 10) { // if the number of year is lower than 10 then it is false
                bTest = false;
            } else {
                if (iNbrAnnee == 10) { //if the number of year is exactly 10 then it is the month difference that determine the results
                    if (iNbrMois < 0) {
                        bTest = false;
                    } else {
                        bTest = true;
                    }
                } else {
                    bTest = true;
                }
            }
        }
        showErrorMessage(bTest, 'birthday');
        return bTest;
    }

    function showErrorMessage(bTest, sText) { // show the corresponding error messages
        if (bTest) {
            (document.getElementById(sText + '_error')).classList.remove('show'); //Le css reprend la main
        } else {
            (document.getElementById(sText + '_error')).classList.add('show');
        }
    }


    function handleSubmit(e) {
        var tFunc = [testName, testFirstName, testNickName, testAddress, testBirthday, testCity, testPwd, testConfirm, testZIPCode],
            bTest = true;

        for (var i = 0; i < tFunc.length; i++) {
            if (!tFunc[i]()) {
                bTest = false
            };
        }

        if (!bTest) e.preventDefault();
    }

    function addListeners() {
        document.getElementById('name').addEventListener('input', testName);
        document.getElementById('firstname').addEventListener('input', testFirstName);
        document.getElementById('nickname').addEventListener('input', testNickName);
        document.getElementById('birthday').addEventListener('change', testBirthday);
        document.getElementById('pwd').addEventListener('input', testPwd);
        document.getElementById('confirm').addEventListener('input', testConfirm);
        document.getElementById('address').addEventListener('input', testAddress);
        document.getElementById('city').addEventListener('input', testCity);
        document.getElementById('ZIPCode').addEventListener('input', testZIPCode);
        document.getElementById('inscriptionForm').addEventListener('submit', handleSubmit);
    }
    addListeners();
})();

/*
1. Le nom devra comporter au moins 2 lettres et au plus 50.
2. Le prénom devra comporter au moins 2 lettres et au plus 50.
3. Le pseudo devra comporter au moins 6 caractères.
4. Le mot de passe devra comporter au moins 8 caractères.
5. Le mot de passe devra âtre vérifié avec une seconde entrée à comparer à la première.
6. Seule les personnes de 10 ans au moins pourront s'inscrire.
7. L'adresse comportera au plus 100 caractères
8. Le code postal contient exactement 5 chiffres.
9. La ville contient au plus 50 caractères.
*/