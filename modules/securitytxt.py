import requests
from urllib.parse import urljoin


def check_security_txt(target):
    """
    Check for the presence of a security.txt file.

    Args:
        target (str): Base target URL.

    Returns:
        dict: security.txt analysis results.
    """

    print("\n[*] Checking security.txt...")

    results = {
        "found": False,
        "url": None,
        "status_code": None,
        "contacts": [],
        "expires": None,
        "policy": None,
        "issues": []
    }

    security_url = urljoin(
        target,
        "/.well-known/security.txt"
    )

    results["url"] = security_url

    try:
        response = requests.get(
            security_url,
            timeout=5,
            headers={
                "User-Agent": "VulnScanner/1.0"
            }
        )

        results["status_code"] = response.status_code

        # --------------------------------
        # SECURITY.TXT FOUND
        # --------------------------------

        if response.status_code == 200:

            results["found"] = True

            print(
                f"[FOUND] security.txt: "
                f"{security_url}"
            )

            lines = response.text.splitlines()

            for line in lines:

                line = line.strip()

                # Ignore comments and blank lines
                if not line or line.startswith("#"):
                    continue

                if ":" not in line:
                    continue

                field, value = line.split(":", 1)

                field = field.strip().lower()
                value = value.strip()

                # --------------------------------
                # CONTACT
                # --------------------------------

                if field == "contact":

                    results["contacts"].append(
                        value
                    )

                    print(
                        f"[INFO] Security Contact: "
                        f"{value}"
                    )

                # --------------------------------
                # EXPIRATION
                # --------------------------------

                elif field == "expires":

                    results["expires"] = value

                    print(
                        f"[INFO] Expires: {value}"
                    )

                # --------------------------------
                # SECURITY POLICY
                # --------------------------------

                elif field == "policy":

                    results["policy"] = value

                    print(
                        f"[INFO] Security Policy: "
                        f"{value}"
                    )

            # --------------------------------
            # CHECK CONTACT FIELD
            # --------------------------------

            if not results["contacts"]:

                results["issues"].append({
                    "issue":
                        "security.txt does not contain "
                        "a Contact field",
                    "severity":
                        "Low",
                    "recommendation":
                        "Add a valid Contact field so "
                        "security researchers know how "
                        "to report vulnerabilities."
                })

                print(
                    "[WARNING] No security contact found"
                )

            # --------------------------------
            # CHECK EXPIRATION FIELD
            # --------------------------------

            if not results["expires"]:

                results["issues"].append({
                    "issue":
                        "security.txt does not contain "
                        "an Expires field",
                    "severity":
                        "Low",
                    "recommendation":
                        "Add an Expires field to the "
                        "security.txt file."
                })

                print(
                    "[WARNING] No expiration field found"
                )

        # --------------------------------
        # SECURITY.TXT NOT FOUND
        # --------------------------------

        elif response.status_code == 404:

            print("[INFO] security.txt not found")

            results["issues"].append({
                "issue":
                    "security.txt file not found",
                "severity":
                    "Informational",
                "recommendation":
                    "Consider publishing a security.txt "
                    "file containing vulnerability "
                    "reporting contact information."
            })

        else:

            print(
                f"[INFO] security.txt returned "
                f"HTTP {response.status_code}"
            )

    except requests.exceptions.Timeout:

        print(
            "[-] security.txt request timed out"
        )

    except requests.exceptions.ConnectionError:

        print(
            "[-] Could not connect while checking "
            "security.txt"
        )

    except requests.exceptions.RequestException as error:

        print(
            f"[-] security.txt request error: "
            f"{error}"
        )

    print("[+] security.txt check completed")

    return results