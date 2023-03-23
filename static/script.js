$(document).ready(function() {
    // localStorage.removeItem("history");
    let history = []
    let history_string = localStorage.getItem('history');
    if (history_string !== null) {
        history = JSON.parse(history_string);
    }
    update_history();
    let useAdvancedOptions = false;

    $('#fetchData').on('click', async function() {
        await generate_new();
    });

    async function generate_new() {
        $("#fetchData").prop("disabled", true);
        $("#fetchData").html("Surging...");

        try {
            const character_level = $('#characterLevel').val();
            const spell_level = $('#spellLevel').val();
            const effect_type = $('#effectType').val();
            const themes = $('#themes').val().split(',');

            let params = null;
            if (useAdvancedOptions) {
                params = {};
                params.character_level = character_level;
                params.spell_level = spell_level;
                params.effect_type = effect_type;
                params.themes = [themes];
            }

            const result = await fetch_new_wildmagic(params);

            history.push(result);
            localStorage.setItem('history', JSON.stringify(history));

            update_history();

            $('#responseTitle').html(result.title);
            $('#responseDescription').html(result.description);
        } catch (error) {
            console.error('Error fetching data:', error);
            $('#responseContainer').html('Error fetching data. Please check the console.');
        }

        $("#fetchData").prop("disabled", false);
        $("#fetchData").html("Generate!");
    }

    async function update_history() {
        $('#historyList').html('');
        console.log(history);
        $.each(history, function(index, value) {
            var title = value.title;
            var description = value.description;
            var element = $('<div>');
            var title_element = $('<h2>').text(title);
            var description_element = $('<p>').text(description);
            element.append(title_element, description_element);
            $('#historyList').prepend(element);
        });
    }

    async function fetch_new_wildmagic(dataToSend) {
        let data = await fetch("/generate", {
                credentials: "same-origin",
                mode: "same-origin",
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            })
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    console.log("Status: " + resp.status)
                    return Promise.reject("server")
                }
            })
            .catch(err => {
                if (err === "server") return
                console.log(err)
            })

        return data;
    }

    $("#toggleAdvancedOptions").on("click", function() {
        $(".advancedOptions").slideToggle();
        useAdvancedOptions = !useAdvancedOptions;
    });

    generate_new();
});