def check_security_headers(response):
    """
    Check for recommended HTTP security headers.

    Args:
        response: HTTP response object from requests.

    Returns:
        dict: Header scan results.
    """

    print("\n[*] Checking HTTP security headers...")

    security_headers = {
        "Content-Security-Policy":
            "Helps reduce XSS and content injection attacks.",

        "Strict-Transport-Security":
            "Forces browsers to use HTTPS.",

        "X-Frame-Options":
            "Helps protect against clickjacking.",

        "X-Content-Type-Options":
            "Helps prevent MIME-type sniffing.",

        "Referrer-Policy":
            "Controls how much referrer information is shared."
    }

    results = {
        "found": [],
        "missing": []
    }

    for header, description in security_headers.items():

        if header in response.headers:

            print(f"[FOUND] {header}")

            results["found"].append({
                "header": header,
                "description": description,
                "value": response.headers[header]
            })

        else:

            print(f"[MISSING] {header}")

            results["missing"].append({
                "header": header,
                "description": description
            })

    return results