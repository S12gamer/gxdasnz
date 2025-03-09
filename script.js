function generateText() {
    const selectoraValue = document.getElementById('selectora').value;
    const selectorbValue = document.getElementById('selectorb').value;
    const selectorcValue = document.getElementById('selectorc').value;
    const selectordValue = document.getElementById('selectord').value;
    const selectoreValue = document.getElementById('selectore').value;
    const selectorfValue = document.getElementById('selectorf').value;
    const selectorgValue = document.getElementById('selectorg').value;
    const selectorhValue = document.getElementById('selectorh').value;
    const selectorxdValue = document.getElementById('selectorxd').value;

    // Texto base
    const baseText = "Buenas noches.";
    const basiText = "Comparto rol de operadores para mañana";
    const baxText = "🚚🚛🚚🚛🚚🚛";
    const basText = "7:00 AM:";
    const bsText = "9:00 AM:";
    const saseText = "Gracias.";
    const sasoText = "@⁨Alan Nuevo⁩ ⁩ ⁩  @⁨Thalia Huerta Univercidad⁩ @⁨Ana  Medina ⁩ @⁨Don Jose Medina⁩ ⁩ ⁩  @⁨Alan Nuevo⁩ @⁨Josue Nuevo⁩ @⁨Thalia Huerta Univercidad⁩ @⁨Axel V Polanco⁩ ⁩ @⁨Itzela⁩ @⁨Carlitos Medina⁩ ⁩ @⁨Julio Olv ⁩⁩ @⁨Itzela⁩ @⁨Carlitos Medina⁩ @⁨Axel V Polanco⁩@⁨Edmundo Paez";
    const generatedText = `${baseText} \n${basiText}\n${selectorxdValue} ${baxText}\n\n${basText}\n${selectoraValue}\n${selectorbValue}\n${selectorcValue}\n${selectordValue} \n${bsText} \n${selectoreValue}\n${selectorfValue}\n${selectorgValue}\n${selectorhValue} \n${saseText}\n\n\n${sasoText}`;

    return generatedText;
}

function shareOnWhatsApp(text) {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    document.getElementById('whatsapp-share').setAttribute('href', url);
}

document.getElementById('generate-button').addEventListener('click', function() {
    const generatedText = generateText();
    document.getElementById('text-output').innerText = generatedText;
    shareOnWhatsApp(generatedText);
});