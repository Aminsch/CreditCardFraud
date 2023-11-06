$(document).ready(function() {
    // Funktion zur Ausführung der Betrugsvorhersage
    function makePrediction() {
        var formData = $('#predictionForm').serialize();

        $.ajax({ // AJAX-Request wird verwendet um den eingebegebenen Text an den Server zu senden (in unserem Fall die Flask-App)
            type: 'POST',
            url: '/predict',
            data: formData,
            success: function(response) {
                $('#predictionResult').text(response.prediction_text);
                
                var percentageString = response.prediction_text.match(/(\d+(\.\d+)?%)/);
                var percentage = percentageString ? parseFloat(percentageString[0]) : 0;
            
                // Prüfe, ob die Wahrscheinlichkeit größer als 1% ist
                if (percentage > 1) {
                    // Zeige die Warnung nur einmal an
                    if($('#fraudAlert').length === 0) {
                        $('#predictionResult').after('<div id="fraudAlert" style="color: red;">Es könnte sich bei dieser Transaktion um eine betrügerische Handlung handeln, diese erfordert weitere Analysen ihrerseits!</div>');
                        resultPosition = $('#fraudAlert').offset().top;
                    }
                } else {
                    // Entferne die Warnung, falls sie existiert und die Bedingung nicht mehr zutrifft
                    $('#fraudAlert').remove();
                }
                $('html, body').animate({
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
            var data = JSON.parse(jsonInput);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var input = $('input[name="' + key + '"]');
                    if (input) {
                        input.val(data[key]);
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
