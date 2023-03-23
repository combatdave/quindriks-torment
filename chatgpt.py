import json
import openai
from typing import Dict
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.environ['OPENAI_API_KEY']

# def load_prompt_template(file_path: str) -> str:
#     with open(file_path, 'r', encoding='utf-8') as file:
#         return file.read()

def chat_gpt_json(prompt: str) -> Dict:
    message = chat_gpt(prompt)
    try:
        return json.loads(message, strict=False)
    except Exception as e:
        print("==================================")
        print("Error parsing JSON:")
        print(message)
        print("==================================")
        raise e

def chat_gpt(prompt: str) -> Dict:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return response.choices[0].message.content