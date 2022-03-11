function sendMessage(name, phone, text, modal, formBtn, close) {
    formBtn.disabled = true;
    let targetDiv = document.getElementById("contact-form-send").getElementsByClassName("form-alert")[0];
    if (name === '' || phone === '') {
        targetDiv.innerHTML = "<div class=\"failed\">Validation errors occurred. Please confirm the fields and submit it again.</div>";
        document.getElementById('inputName').classList.add('invalid');
        document.getElementById('inputPhone').classList.add('invalid');
        formBtn.disabled = false;
        return false;
    } else {
        document.getElementById('inputName').classList.remove('invalid');
        document.getElementById('inputPhone').classList.remove('invalid');
        targetDiv.innerHTML = "";
        let url = "https://api.telegram.org/" +
            "bot5292707749:AAH1KcgstAEsIjA1Wboo3nyYKF7HvUcgM_0" +
            "/sendMessage?chat_id=@yomaezayavki&text=";

        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let time = new Date().toLocaleString();
        let language = Intl.DateTimeFormat().resolvedOptions().locale;

        let message = '' +
            '👔️ Name: ' + name + '%0A' +
            '📩 Email: ' + phone + '%0A' +
            '🗺 TimeZone: ' + timezone + '%0A' +
            '🕐 Time: ' + time + '%0A' +
            '🎓 Language: ' + language + '%0A' +
            '💬️ Message: ' + text
        url += message;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    toggleModal(modal, formBtn, close, 'Спасибо! Ваше сообщение успешно отправлено!');
                    clearMessage();
                    formBtn.disabled = false;
                } else {
                    toggleModal(modal, formBtn, close, `<div style="color:#dd4142 ">Ошибка! Ваше сообщение не отправлено!</div>`);
                    formBtn.disabled = false;
                }
            }
        };

        xhr.send();
    }
}

function toggleModal(modal, formBtn, close, content) {
    document.getElementById('modal-content').innerHTML = content;
    modal.style.display = "block";

    close.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function clearMessage() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputPhone').value = '';
    document.getElementById('inputText').value = '';
}
