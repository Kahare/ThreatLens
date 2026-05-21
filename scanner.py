# Beginner Vulnerability Scanner
import requests
import socket
from urllib.parse import urlparse

# -----------------------------
# GET WEBSITE FROM USER
# -----------------------------

target = input("Enter website (example: https://example.com): ")

# Extract domain

parsed_url = urlparse(target)
domain = parsed_url.netloc

print("\nScanning:", domain)

# -----------------------------
# CONNECT TO WEBSITE
# -----------------------------

try:

  response = requests.get(target)

  print("\n[+] Website is reachable")
  print("Status Code:", response.status_code)

except:

  print("\n[-] Could not connect to website")

  exit()

# -----------------------------
# VARIABLES
# -----------------------------

risk_score = 0
vulnerabilities = []

# -----------------------------
# PORT SCANNING
# -----------------------------

print("\nScanning Common Ports...")

common_ports = [21, 22, 80, 443]

for port in common_ports:

  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  sock.settimeout(1)
  result = sock.connect_ex((domain, port))

  if result == 0:

    print(f"[OPEN] Port {port}")


    # Check risky ports

    if port == 21:

      vulnerabilities.append("FTP Port 21 is open")

      risk_score += 2

    elif port == 22:

      vulnerabilities.append("SSH Port 22 is open")

      risk_score += 1

  sock.close()

# -----------------------------
# SECURITY HEADER CHECK
# -----------------------------

print("\nChecking Security Headers...")

security_headers = [
  "Content-Security-Policy",
  "X-Frame-Options",
  "Strict-Transport-Security"
]

headers = response.headers

for header in security_headers:

  if header in headers:
    print(f"[FOUND] {header}")

  else:
    print(f"[MISSING] {header}")
    vulnerabilities.append(f"Missing Security Header: {header}")
    risk_score += 1

# -----------------------------
# FINAL RISK SCORE
# -----------------------------

print("\nFinal Risk Score:", risk_score)

# -----------------------------
# DISPLAY VULNERABILITIES
# -----------------------------

print("\nDetected Vulnerabilities:")

if len(vulnerabilities) == 0:

  print("No major vulnerabilities detected")



else:

  for vuln in vulnerabilities:

    print("-", vuln)

# -----------------------------
# ASK USER FOR REPORT NAME
# -----------------------------

filename = input("\nEnter report file name (example: report.txt): ")

# -----------------------------
# SAVE REPORT
# -----------------------------

report = open(filename, "w")
report.write("Website Vulnerability Scan Report\n")
report.write("---------------------------------\n\n")
report.write("Target: " + domain + "\n")
report.write("Risk Score: " + str(risk_score) + "\n\n")
report.write("Detected Vulnerabilities:\n")

if len(vulnerabilities) == 0:
  report.write("No major vulnerabilities detected\n")

else:

  for vuln in vulnerabilities:
    report.write("- " + vuln + "\n")


report.close()

print(f"\nReport saved as {filename}")