from flask import Flask, render_template, request, jsonify
from chatgpt import chat_gpt_json

app = Flask(__name__)


prompt_template = """
Create an idea for a Wild Magic surge effect for DND 5e. Do not copy directly from the Wild Magic table, but instead create a new wild magic surge effect. The description should be concise, matching with the style of existing wild magic table effects.
  
The spell effects should match the following characteristics:
Character level: {character_level}
Spell level: {spell_level}
Effect type: {effect_type}
Incorporate the following theme(s): {themes}

Your response will be in JSON format with the following fields:

{{
    "title": "Title of wild magic surge",
    "description": "Wild magic surge effect"
}}
"""

@app.route('/')
def hello_world():
    return render_template("generator.html")

@app.route('/generate', methods=['POST'])
def add_message():
    data = request.json
    prompt = prompt_template.format(**data)
    print(prompt)
    response_json = chat_gpt_json(prompt)
    print(response_json)
    return jsonify(response_json)


if __name__ == '__main__':
    app.run(debug=True)