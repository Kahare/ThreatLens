import socket
import ssl
from datetime import datetime, timezone


def check_ssl(domain, port=443):
    """
    Check basic SSL/TLS certificate information for a target.

    Args:
        domain (str): Target hostname.
        port (int): HTTPS port. Default is 443.

    Returns:
        dict: SSL/TLS certificate results.
    """

    print("\n[*] Checking SSL/TLS certificate...")

    results = {
        "available": False,
        "valid": False,
        "tls_version": None,
        "issuer": None,
        "subject": None,
        "expires": None,
        "days_remaining": None,
        "issues": []
    }

    context = ssl.create_default_context()

    try:
        with socket.create_connection(
            (domain, port),
            timeout=5
        ) as sock:

            with context.wrap_socket(
                sock,
                server_hostname=domain
            ) as secure_socket:

                results["available"] = True

                # TLS version
                tls_version = secure_socket.version()
                results["tls_version"] = tls_version

                print(f"[+] TLS Version: {tls_version}")

                # Certificate information
                certificate = secure_socket.getpeercert()

                if not certificate:
                    print("[-] Certificate information unavailable")

                    results["issues"].append({
                        "issue": "Certificate information unavailable",
                        "severity": "Medium"
                    })

                    return results

                # --------------------------------
                # SUBJECT
                # --------------------------------

                subject = dict(
                    item
                    for group in certificate.get("subject", [])
                    for item in group
                )

                common_name = subject.get(
                    "commonName",
                    "Unknown"
                )

                results["subject"] = common_name

                print(
                    f"[+] Certificate Subject: "
                    f"{common_name}"
                )

                # --------------------------------
                # ISSUER
                # --------------------------------

                issuer = dict(
                    item
                    for group in certificate.get("issuer", [])
                    for item in group
                )

                issuer_name = issuer.get(
                    "commonName",
                    "Unknown"
                )

                results["issuer"] = issuer_name

                print(
                    f"[+] Certificate Issuer: "
                    f"{issuer_name}"
                )

                # --------------------------------
                # EXPIRATION
                # --------------------------------

                expiry_string = certificate.get(
                    "notAfter"
                )

                if expiry_string:

                    expiry_date = datetime.strptime(
                        expiry_string,
                        "%b %d %H:%M:%S %Y %Z"
                    ).replace(tzinfo=timezone.utc)

                    current_time = datetime.now(
                        timezone.utc
                    )

                    days_remaining = (
                        expiry_date - current_time
                    ).days

                    results["expires"] = (
                        expiry_date.isoformat()
                    )

                    results["days_remaining"] = (
                        days_remaining
                    )

                    print(
                        f"[+] Certificate expires in "
                        f"{days_remaining} days"
                    )

                    if days_remaining < 0:

                        results["issues"].append({
                            "issue":
                                "SSL certificate has expired",
                            "severity":
                                "High"
                        })

                    elif days_remaining <= 30:

                        results["issues"].append({
                            "issue":
                                "SSL certificate expires within 30 days",
                            "severity":
                                "Medium"
                        })

                results["valid"] = True

                print(
                    "[+] SSL/TLS certificate validation passed"
                )

    except ssl.SSLCertVerificationError as error:

        print(
            f"[-] Certificate verification failed: "
            f"{error}"
        )

        results["issues"].append({
            "issue":
                "SSL certificate verification failed",
            "severity":
                "High"
        })

    except ssl.SSLError as error:

        print(f"[-] SSL/TLS error: {error}")

        results["issues"].append({
            "issue":
                "SSL/TLS connection error",
            "severity":
                "Medium"
        })

    except socket.timeout:

        print("[-] SSL/TLS connection timed out")

        results["issues"].append({
            "issue":
                "SSL/TLS connection timed out",
            "severity":
                "Low"
        })

    except socket.gaierror:

        print("[-] Could not resolve hostname")

        results["issues"].append({
            "issue":
                "Hostname resolution failed",
            "severity":
                "Low"
        })

    except OSError as error:

        print(
            f"[-] Could not establish SSL/TLS "
            f"connection: {error}"
        )

    print("[+] SSL/TLS check completed")

    return results