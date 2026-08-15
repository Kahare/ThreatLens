import requests


def check_connection(target):
    """
    Check whether the target website is reachable.

    Args:
        target (str): Target URL.

    Returns:
        requests.Response: HTTP response object.
    """

    print("\n[*] Checking website connection...")

    try:
        response = requests.get(
            target,
            timeout=5,
            allow_redirects=True,
            headers={
                "User-Agent": "VulnScanner/1.0"
            }
        )

        print("[+] Website is reachable")
        print(f"[+] Status Code: {response.status_code}")
        print(f"[+] Final URL: {response.url}")

        return response

    except requests.exceptions.Timeout:

        print("[-] Connection timed out")

    except requests.exceptions.ConnectionError:

        print("[-] Could not connect to target")

    except requests.exceptions.RequestException as error:

        print(f"[-] Request error: {error}")

    return None