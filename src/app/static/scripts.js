$(document).ready(function() {
    // Funktion zur Ausführung der Betrugsvorhersage
    function makePrediction() {
        var formData = $('#predictionForm').serialize();

        $.ajax({ // AJAX-Request wird verwendet um den eingebegebenen Text an den Server zu senden (in unserem Fall die Flask-App)
            type: 'POST', // Verwende POST-Methode
            url: '/predict', // URL, an die die Daten gesendet werden sollen
            data: formData, 
            success: function(response) {
                $('#predictionResult').text(response.prediction_text);
                
                var percentageString = response.prediction_text.match(/(\d+(\.\d+)?%)/); // Suche nach einer Zahl mit Prozentzeichen
                var percentage = percentageString ? parseFloat(percentageString[0]) : 0; // Konvertiere den Wert in eine Zahl
            
                // Prüfe, ob die Wahrscheinlichkeit größer als 1% ist
                if (percentage > 1) {
                    // Zeige die Warnung nur einmal an
                    if($('#fraudAlert').length === 0) {
                        $('#predictionResult').after('<div id="fraudAlert" style="color: red;">Es könnte sich bei dieser Transaktion um eine betrügerische Handlung handeln, diese erfordert weitere Analysen ihrerseits!</div>');
                        resultPosition = $('#fraudAlert').offset().top; // Speichere die Position der Warnung
                    }
                } else {
                    // Entferne die Warnung, falls sie existiert und die Bedingung nicht mehr zutrifft
                    $('#fraudAlert').remove();
                }
                $('html, body').animate({ // Scrolle zur Ergebnis-Anzeige
                    scrollTop: resultPosition - 20 // Etwas Platz über dem Ziel für bessere Sichtbarkeit
                }, 500);
            },
            error: function(error) {
                console.log(error);
                alert('Ein Fehler ist aufgetreten');
            }
        });
    }

    $('#predictButton').on('click', function() {
        makePrediction();
    });

    $('#clearButton').on('click', function() {
        // Clear all input fields in the form
        $('#predictionForm').find('input[type=text], textarea').val('');
        // Clear the prediction result
        $('#predictionResult').empty();
        // Remove the fraud alert message if it exists
        $('#fraudAlert').remove();
    });

    // JavaScript um JSON zu parsen und in die Felder einzufügen
    $('#jsonSubmitButton').on('click', function() {
        var jsonInput = $('#jsonInput').val();
        try {
            var data = JSON.parse(jsonInput); // Versuche den eingegebenen Text als JSON zu parsen
            for (var key in data) { // Iteriere über alle Eigenschaften des Objekts 
                if (data.hasOwnProperty(key)) { // Prüfe, ob das Objekt die Eigenschaft besitzt
                    var input = $('input[name="' + key + '"]'); // Suche nach dem Input-Feld mit dem Namen der Eigenschaft
                    if (input) { 
                        input.val(data[key]); // Füge den Wert der Eigenschaft in das Input-Feld ein
                    }
                }
            }
        } catch (e) {
            alert('Ungültiges JSON!');
            return;
        }

    makePrediction();
    });
});
