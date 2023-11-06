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
        $('#predictionForm').find('input[type=text], textarea').val('');
        $('#predictionResult').empty();
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
