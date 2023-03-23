$(document).ready(function() {
    $('#fetchData').on('click', async function() {
        await poop();
    });

    async function poop() {
        try {
            const result = await fetch_new_wildmagic();

            $('#responseTitle').html(result.title);
            $('#responseDescription').html(result.description);
        } catch (error) {
            console.error('Error fetching data:', error);
            $('#responseContainer').html('Error fetching data. Please check the console.');
        }
    }

    async function fetch_new_wildmagic() {
        const dataToSend = JSON.stringify({
            "character_level": 6,
            "spell_level": 3,
            "effect_type": "comedy",
            "themes": ["animals", "food"],
        });

        let data = await fetch("/generate", {
                credentials: "same-origin",
                mode: "same-origin",
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: dataToSend
            })
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    console.log("Status: " + resp.status)
                    return Promise.reject("server")
                }
            })
            .then(dataJson => {
                return dataJson;
            })
            .catch(err => {
                if (err === "server") return
                console.log(err)
            })

        return data;
    }

    poop();
});