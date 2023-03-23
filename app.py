from flask import Flask, render_template, request, jsonify
from chatgpt import chat_gpt_json, load_prompt_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("generator.html")

@app.route('/generate', methods=['POST'])
def generate_wild_magic():
    prompt_template = load_prompt_template("wild_magic_prompt.txt")
    advanced_settings_template = load_prompt_template("advanced_settings.txt")

    data = request.json
    if data is not None:
        settings = advanced_settings_template.format(**data)
        prompt = prompt_template.format(advanced_settings=settings)
    else:
        prompt = prompt_template

    response_json = chat_gpt_json(prompt)
    return jsonify(response_json)


if __name__ == '__main__':
    app.run(debug=True)