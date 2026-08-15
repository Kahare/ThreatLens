def check_cookies(response):
    """
    Analyse cookies returned by the target website.

    Args:
        response: HTTP response object from requests.

    Returns:
        dict: Cookie security analysis results.
    """

    print("\n[*] Checking cookie security...")

    results = {
        "cookies_found": [],
        "issues": []
    }

    # Get cookies from the HTTP response
    cookies = response.cookies

    if not cookies:
        print("[INFO] No cookies detected")
        return results

    for cookie in cookies:

        cookie_name = cookie.name

        secure = cookie.secure
        httponly = cookie.has_nonstandard_attr("HttpOnly")
        samesite = cookie.get_nonstandard_attr("SameSite")

        print(f"\n[COOKIE] {cookie_name}")

        cookie_info = {
            "name": cookie_name,
            "secure": secure,
            "httponly": httponly,
            "samesite": samesite
        }

        results["cookies_found"].append(cookie_info)

        # --------------------------------
        # SECURE FLAG
        # --------------------------------

        if secure:
            print("[FOUND] Secure flag")
        else:
            print("[WARNING] Secure flag missing")

            results["issues"].append({
                "cookie": cookie_name,
                "issue": "Secure flag missing",
                "severity": "Medium"
            })

        # --------------------------------
        # HTTPONLY FLAG
        # --------------------------------

        if httponly:
            print("[FOUND] HttpOnly flag")
        else:
            print("[WARNING] HttpOnly flag missing")

            results["issues"].append({
                "cookie": cookie_name,
                "issue": "HttpOnly flag missing",
                "severity": "Medium"
            })

        # --------------------------------
        # SAMESITE ATTRIBUTE
        # --------------------------------

        if samesite:
            print(f"[FOUND] SameSite: {samesite}")

        else:
            print("[WARNING] SameSite attribute missing")

            results["issues"].append({
                "cookie": cookie_name,
                "issue": "SameSite attribute missing",
                "severity": "Low"
            })

    print("\n[+] Cookie security check completed")

    return results