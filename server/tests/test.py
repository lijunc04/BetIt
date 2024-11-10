from openai import OpenAI
client = OpenAI()
import os
from dotenv import load_dotenv

import json
load_dotenv()
client.api_key = os.getenv("OPENAI_API_KEY")
print(client.api_key)

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Write a haiku about recursion in programming."
        }
    ],
    max_tokens=10
)
mes = completion.choices[0].message.content

print(json.dumps(mes))