$(document).ready(function() {
    // Funktion zur Steuerung der Eingabemethoden
    function toggleInputMethod(method) {
        if (method === 'json') {
            $('#manualInputFields').hide();
            $('.tab, #DatenEinfuegen').show();
            $('#jsonSubmitButton, #clearButton').show();
        } else if (method === 'manual') {
            $('#manualInputFields, #predictButton').show(); // Zeige manuelle Eingabefelder und Vorhersage-Button
            $('.tab, .tabcontent').hide();
            $('#jsonSubmitButton, #clearButton').hide();
        }
    }

    // Event-Listener für die Änderung der Eingabemethode
    $('input[name="inputMethod"]').on('change', function() {
        toggleInputMethod($(this).val());
    });

    // Setze "Manueller Input" als Standardmethode beim Laden der Seite
    $('#manualInputMethod').prop('checked', true);
    toggleInputMethod('manual');

    // Funktion zur Ausführung der Betrugsvorhersage
    function makePrediction(dataObject) {
        console.log("Sending prediction request with data:", dataObject);
        $.ajax({
            type: 'POST',
            url: '/predict',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(dataObject),
            success: function(response) {
                console.log(response);
                $('#predictionResult').text(response.prediction_text);

                var percentageString = response.prediction_text.match(/(\d+(\.\d+)?%)/);
                var percentage = percentageString ? parseFloat(percentageString[0]) : 0;

                if (percentage > 30) {
                    if ($('#fraudAlert').length === 0) {
                        $('#predictionResult').after('<div id="fraudAlert" style="color: red;">Es könnte sich bei dieser Transaktion um eine betrügerische Handlung handeln, diese erfordert weitere Analysen Ihrerseits!</div>');
                    }
                } else {
                    $('#fraudAlert').remove();
                }
                $('html, body').animate({
                    scrollTop: $('#fraudAlert').offset().top - 20
                }, 500);
            },
            error: function(error) {
                console.log(error);
                alert('Ein Fehler ist aufgetreten');
            }
        });
    }

    function getFormDataAsObject() {
        var formData = {};
        $('#predictionForm').find('input').each(function() {
            if (this.name && this.value) {
                formData[this.name] = this.value;
            }
        });
        return formData;
    }
    // Event-Handler für den manuellen Vorhersage-Button
    $('#manualPredictButton').on('click', function() {
        var dataObject = getFormDataAsObject();
        makePrediction(dataObject);
    });

    // Event-Handler für den Datei-Vorhersage-Button
    $('#filePredictButton').on('click', function() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var dataObject = JSON.parse(e.target.result);
                makePrediction(dataObject);
            };
            reader.readAsText(file);
        }
    });

    // Event-Handler für den Vorhersage-Button
    $('#predictButton').on('click', function() {
        var dataObject = getFormDataAsObject();
        makePrediction(dataObject);
    });

    // Event-Handler für den manuellen Vorhersage-Button
    $('#manualPredictButton').on('click', function() {
        var dataObject = getFormDataAsObject();
        makePrediction(dataObject);
    });



    // Event-Handler für den Löschen-Button
    $('#clearButton').on('click', function() {
        $('.container').find('input[type=text], textarea').val(''); // Löschen aller Textfelder und Textareas
        $('#predictionResult').empty();
        $('#fraudAlert').remove();
    });

    // Event-Handler für den Löschen-Button im "Daten Einfügen"-Tab
    $('#jsonClearButton').on('click', function() {
        $('#jsonInput').val(''); // Löschen des JSON-Input-Feldes
        $('#predictionResult').empty();
        $('#fraudAlert').remove();
    });

    // Event-Handler für den Löschen-Button im "Daten Einladen"-Tab
    $('#fileClearButton').on('click', function() {
        $('#predictionResult').empty(); // Löschen des Vorhersageergebnisses
        $('#fraudAlert').remove(); // Entfernen des Betrugsalarms, falls vorhanden
        $('#fileInput').val(''); // Löschen der ausgewählten Datei
        $('#fileNameDisplay').text(''); // Löschen des angezeigten Dateinamens
    });


    // Funktion zum Zuweisen von JSON-Daten zu Formularfeldern
    function assignJsonToFields(jsonInput) {
        try {
            var data = JSON.parse(jsonInput);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var input = $('input[name="' + key + '"]');
                    if (input.length) {
                        input.val(data[key]);
                    }
                }
            }
        } catch (e) {
            alert('Ungültiges JSON!');
        }
    }

    // Event-Handler für den JSON-Upload-Button
    $('#jsonSubmitButton').on('click', function() {
        var jsonInput = $('#jsonInput').val();
        if (!jsonInput.trim()) {
            alert('Bitte geben Sie JSON-Daten ein.');
            return;
        }
    
        try {
            var dataObject = JSON.parse(jsonInput);
            makePrediction(dataObject);
        } catch (e) {
            alert('Ungültiges JSON! Bitte überprüfen Sie die Eingabe.');
        }
    });

    // Funktion zum Öffnen von Tabs
    function openTab(tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).style.display = "block";
        // Entfernen der aktiven Klasse für alle Tabs und Hinzufügen zur aktuellen
        $('.tablinks[data-target="' + tabName + '"]').addClass('active');
    }
    $('.tablinks').click(function() {
        var target = $(this).data('target');
        openTab(target);
    });

    // Setzt den initialen Tab
    openTab('DatenEinfuegen');

    document.getElementById('showResultButton').addEventListener('click', function() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var dataObject = JSON.parse(e.target.result);
                makePrediction(dataObject); // Verwenden Sie Ihre existierende Vorhersagefunktion
            };
            reader.readAsText(file);
        }
    });
    

    // Tab-Funktionalität
    document.querySelectorAll('.tablinks').forEach(function(tab) {
        tab.onclick = function(evt) {
            var target = this.getAttribute('data-target');
            if(target){
                openTab(evt, target);
            }
        };
    });
});

function showFileName() {
    var fileInput = document.getElementById('fileInput');
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    var showResultButton = document.getElementById('showResultButton');

    if (fileInput.files.length > 0) {
        if (fileNameDisplay) { // Überprüfen, ob das Element existiert
            fileNameDisplay.textContent = fileInput.files[0].name;
        }
        if (showResultButton) { // Überprüfen, ob das Element existiert
            showResultButton.style.display = 'inline-block';
        }
    }
}

