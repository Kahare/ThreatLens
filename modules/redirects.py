def check_redirects(response):
    """
    Analyse the HTTP redirect chain.

    Args:
        response: requests.Response object.

    Returns:
        dict: Redirect analysis results.
    """

    print("\n[*] Checking HTTP redirects...")

    results = {
        "redirect_count": 0,
        "redirect_chain": [],
        "final_url": response.url,
        "https_upgrade": False,
        "issues": []
    }

    # --------------------------------
    # REDIRECT HISTORY
    # --------------------------------

    redirect_history = response.history

    results["redirect_count"] = len(redirect_history)

    if redirect_history:

        print(
            f"[+] Redirects detected: "
            f"{len(redirect_history)}"
        )

        for redirect in redirect_history:

            location = redirect.headers.get(
                "Location",
                "Unknown"
            )

            redirect_info = {
                "status_code": redirect.status_code,
                "url": redirect.url,
                "location": location
            }

            results["redirect_chain"].append(
                redirect_info
            )

            print(
                f"[REDIRECT] {redirect.status_code} "
                f"{redirect.url} -> {location}"
            )

    else:

        print("[INFO] No redirects detected")

    # --------------------------------
    # FINAL URL
    # --------------------------------

    print(f"[+] Final URL: {response.url}")

    # --------------------------------
    # HTTP TO HTTPS UPGRADE
    # --------------------------------

    if redirect_history:

        first_url = redirect_history[0].url

        if (
            first_url.startswith("http://")
            and response.url.startswith("https://")
        ):

            results["https_upgrade"] = True

            print(
                "[+] HTTP traffic redirects to HTTPS"
            )

        elif first_url.startswith("http://"):

            print(
                "[WARNING] HTTP traffic does not "
                "upgrade to HTTPS"
            )

            results["issues"].append({
                "issue":
                    "HTTP does not redirect to HTTPS",
                "severity":
                    "Medium",
                "recommendation":
                    "Configure HTTP requests to redirect "
                    "to HTTPS."
            })

    # --------------------------------
    # EXCESSIVE REDIRECTS
    # --------------------------------

    if len(redirect_history) > 5:

        print(
            "[WARNING] Excessive redirect chain detected"
        )

        results["issues"].append({
            "issue":
                "Excessive HTTP redirect chain",
            "severity":
                "Low",
            "recommendation":
                "Reduce unnecessary redirects to improve "
                "performance and simplify request flow."
        })

    print("[+] Redirect check completed")

    return results