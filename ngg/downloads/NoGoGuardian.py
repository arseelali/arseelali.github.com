# Build: build OR pyinstaller --onefile --icon=GoGuardian.ico GoGuardian.py
import sys
import subprocess
import winreg as reg
import ctypes
from colorama import init, Fore, Style
from datetime import datetime

init(autoreset=True)

INTERNET_OPTION_SETTINGS_CHANGED = 39
INTERNET_OPTION_REFRESH = 37

HKCU = reg.HKEY_CURRENT_USER
INET_KEY_PATH = r"Software\Microsoft\Windows\CurrentVersion\Internet Settings"

requests = 1
maxSuggestedRequests = 10_000

def disable_user_proxy():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        with reg.OpenKey(HKCU, INET_KEY_PATH, 0, reg.KEY_SET_VALUE) as k:
            # Disable manual proxy
            reg.SetValueEx(k, "ProxyEnable", 0, reg.REG_DWORD, 0)
            # Disable auto-detect
            reg.SetValueEx(k, "AutoDetect", 0, reg.REG_DWORD, 0)
            
            try:
                reg.DeleteValue(k, "AutoConfigURL")
            except FileNotFoundError:
                pass  # value doesn't exist, ignore
        print(f"{Style.BRIGHT + Fore.GREEN}({now}  | [✓] Proxy settings have been disabled.")
    except Exception as e:
        print(f"{Fore.RED}({now}  | [!] Error disabling proxy: {e}")
    refresh_internet_settings()

def refresh_internet_settings():
    wininet = ctypes.windll.wininet
    wininet.InternetSetOptionW(0, INTERNET_OPTION_SETTINGS_CHANGED, None, 0)
    wininet.InternetSetOptionW(0, INTERNET_OPTION_REFRESH, None, 0)

while True:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        subprocess.run(
            ["wmic", "process", "where", "name='TheGoGuardianApp.exe'", "call", "terminate"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        print(f"{Style.BRIGHT + Fore.BLUE}({now}) | Termination request {requests} sent")
        disable_user_proxy()
        requests += 1
    except KeyboardInterrupt:
        sys.exit()
    except Exception:
        print(f"{Fore.RED}({now} || {Exception}")
    
    if requests > maxSuggestedRequests and requests % 5 == 0:
        print(f"{Fore.YELLOW}({now}) || WARNING! Script has exceeded {requests - maxSuggestedRequests} termination requests over the suggested limit ({maxSuggestedRequests}). Please restart the script soon to avoid overload.")
