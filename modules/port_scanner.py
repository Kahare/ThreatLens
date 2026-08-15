import socket


def scan_ports(domain):
    """
    Scan a defined list of common TCP ports.

    Args:
        domain (str): Target hostname.

    Returns:
        list: Open ports and detected services.
    """

    common_ports = {
        21: "FTP",
        22: "SSH",
        23: "Telnet",
        25: "SMTP",
        53: "DNS",
        80: "HTTP",
        110: "POP3",
        143: "IMAP",
        443: "HTTPS",
        3306: "MySQL"
    }

    open_ports = []

    print("\n[*] Starting TCP port scan...")

    for port, service in common_ports.items():

        sock = socket.socket(
            socket.AF_INET,
            socket.SOCK_STREAM
        )

        sock.settimeout(1)

        try:
            result = sock.connect_ex((domain, port))

            if result == 0:

                print(f"[OPEN] {port} - {service}")

                open_ports.append({
                    "port": port,
                    "service": service
                })

        except socket.error as error:

            print(
                f"[!] Error scanning port "
                f"{port}: {error}"
            )

        finally:

            sock.close()

    print("[+] Port scan completed")

    return open_ports