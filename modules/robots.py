import requests
from urllib.parse import urljoin


def check_robots(target):
    """
    Check for the presence and contents of robots.txt.

    Args:
        target (str): Base target URL.

    Returns:
        dict: robots.txt analysis results.
    """

    print("\n[*] Checking robots.txt...")

    results = {
        "found": False,
        "url": None,
        "status_code": None,
        "disallowed_paths": [],
        "issues": []
    }

    robots_url = urljoin(target, "/robots.txt")
    results["url"] = robots_url

    try:
        response = requests.get(
            robots_url,
            timeout=5,
            headers={
                "User-Agent": "VulnScanner/1.0"
            }
        )

        results["status_code"] = response.status_code

        # --------------------------------
        # ROBOTS.TXT FOUND
        # --------------------------------

        if response.status_code == 200:

            results["found"] = True

            print(f"[FOUND] robots.txt: {robots_url}")

            lines = response.text.splitlines()

            for line in lines:

                line = line.strip()

                if line.lower().startswith("disallow:"):

                    path = line.split(":", 1)[1].strip()

                    if path:

                        results["disallowed_paths"].append(path)

                        print(
                            f"[INFO] Disallowed path: {path}"
                        )

            # --------------------------------
            # POTENTIALLY SENSITIVE PATHS
            # --------------------------------

            sensitive_keywords = [
                "admin",
                "backup",
                "private",
                "config",
                "database",
                "login",
                "secret",
                "internal"
            ]

            for path in results["disallowed_paths"]:

                lower_path = path.lower()

                for keyword in sensitive_keywords:

                    if keyword in lower_path:

                        results["issues"].append({
                            "issue":
                                "Potentially sensitive path exposed "
                                "in robots.txt",
                            "severity":
                                "Low",
                            "evidence":
                                path,
                            "recommendation":
                                "Do not rely on robots.txt to protect "
                                "sensitive resources. Use proper "
                                "authentication and access controls."
                        })

                        break

        # --------------------------------
        # ROBOTS.TXT NOT FOUND
        # --------------------------------

        elif response.status_code == 404:

            print("[INFO] robots.txt not found")

        else:

            print(
                f"[INFO] robots.txt returned "
                f"HTTP {response.status_code}"
            )

    except requests.exceptions.Timeout:

        print("[-] robots.txt request timed out")

    except requests.exceptions.ConnectionError:

        print("[-] Could not connect while checking robots.txt")

    except requests.exceptions.RequestException as error:

        print(f"[-] robots.txt request error: {error}")

    print("[+] robots.txt check completed")

    return results