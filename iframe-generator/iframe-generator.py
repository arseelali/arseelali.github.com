'''
This program was made by Arseel Ali.
Use this program responsibly.
'''

import sys

print("Terms and Conditions")
print("By using this program, you agree to the following:\n")
print("1. Educational Use Only")
print("\tThis program is for educational purposes only. Do not use it to bypass school or network restrictions.\n")
print("2. Compliance with Rules")
print("\tYou agree to follow your school’s policies, including the FBISD Code of Conduct. Any misuse of this program is your responsibility.\n")
print("3. Assumption of Risk")
print("\tThe author is not responsible for any consequences from using this program, including disciplinary actions or legal issues. You use this program at your own risk.\n")
print("4. No Warranty")
print("\tThis program is provided “as is,” with no guarantees of performance or security.\n")
print("By continuing and/or modifying this program, you acknowledge and accept these terms. If you do not agree, do not use the program.\n")
print("These terms and conditions can be found at https://arseelali.com/iframe-generator/\n")
toc = input("Do you agree to these terms and conditions? {y/n}: ").upper()
if toc == "Y" or toc == "YES":
    print()
else:
    print("Exiting...")
    sys.exit()
print("-----------------------------------------------\nInstructions:")
print("Enter a YouTube link in the following format:")
print("https://www.youtube.com/watch?v=XXXXXXXXXXX")
print("If your link does not have https://www. at the beginning, please add it")
print("To use this iFrame, go to Schoology, right click and click \"Inspect\" on any blank space on the website")
print("In the opened panel, look for any element and right click.")
print("Then click Edit as HTML. Select everything in the little box and delete it")
print("Paste the code provided and click the X icon at the top right of the panel.")

while True:
    print("-----------------------------------------------")
    print("-----------------------------------------------")
    print("-----------------------------------------------")
    userLink = input("Enter YouTube link as shown above >> ")
    vidId = userLink[32:]
    prefix = "<div style=\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;\"><iframe src=\"https://www.youtube.com/embed/"
    suffix = "?rel=0\" style=\"top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;\" allowfullscreen scrolling=\"no\" allow=\"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;\"></iframe></div>"
    print("Completed iFrame:\n")
    print(prefix + vidId + suffix)
    print("\nOperation Completed")
    cont = input("Press Enter to generate new iFrame or type Exit to exit >> ")
    if cont == "Exit":
        break
    else:
        continue
