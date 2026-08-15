def check_server_info(response):
    """
    Inspect HTTP response headers for exposed server
    and technology information.

    Args:
        response: requests.Response object.

    Returns:
        dict: Server information and disclosure findings.
    """

    print("\n[*] Checking server information disclosure...")

    results = {
        "server": None,
        "powered_by": None,
        "other_headers": {},
        "issues": []
    }

    headers = response.headers

    # --------------------------------
    # SERVER HEADER
    # --------------------------------

    server = headers.get("Server")

    if server:
        results["server"] = server

        print(f"[FOUND] Server: {server}")

        results["issues"].append({
            "issue": "Server header exposes server information",
            "severity": "Low",
            "evidence": server,
            "recommendation":
                "Consider reducing or removing detailed server "
                "version information from HTTP responses."
        })

    else:
        print("[INFO] Server header not exposed")

    # --------------------------------
    # X-POWERED-BY HEADER
    # --------------------------------

    powered_by = headers.get("X-Powered-By")

    if powered_by:
        results["powered_by"] = powered_by

        print(f"[FOUND] X-Powered-By: {powered_by}")

        results["issues"].append({
            "issue": "X-Powered-By header exposes technology information",
            "severity": "Low",
            "evidence": powered_by,
            "recommendation":
                "Remove or suppress the X-Powered-By header where possible."
        })

    else:
        print("[INFO] X-Powered-By header not exposed")

    # --------------------------------
    # OPTIONAL INFORMATION HEADERS
    # --------------------------------

    interesting_headers = [
        "Via",
        "X-AspNet-Version",
        "X-AspNetMvc-Version"
    ]

    for header in interesting_headers:

        value = headers.get(header)

        if value:
            results["other_headers"][header] = value

            print(f"[FOUND] {header}: {value}")

            results["issues"].append({
                "issue":
                    f"{header} header exposes technology information",
                "severity": "Low",
                "evidence": value,
                "recommendation":
                    f"Review whether the {header} header is required "
                    "and suppress unnecessary version information."
            })

    print("[+] Server information check completed")

    return results