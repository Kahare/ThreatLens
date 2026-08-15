from urllib.parse import urlparse

from modules.connection import check_connection
from modules.port_scanner import scan_ports
from modules.headers import check_security_headers
from modules.cookies import check_cookies
from modules.ssl_checker import check_ssl
from modules.server_info import check_server_info
from modules.redirects import check_redirects
from modules.robots import check_robots
from modules.securitytxt import check_security_txt
from modules.risk import calculate_risk
from modules.reports import generate_reports


def get_target():
    """
    Ask the user for a target and validate the URL.

    Returns:
        tuple:
            target URL
            hostname
    """

    print("=" * 60)
    print("BEGINNER VULNERABILITY SCANNER")
    print("=" * 60)

    target = input(
        "\nEnter target website "
        "(example: https://example.com): "
    ).strip()

    if not target:
        print("[-] No target entered.")
        return None, None

    # Add HTTPS if the user does not provide a scheme
    if not target.startswith(
        ("http://", "https://")
    ):
        target = "https://" + target

    parsed_url = urlparse(target)

    domain = parsed_url.hostname

    if not domain:
        print("[-] Invalid target.")
        return None, None

    return target, domain


def display_summary(
    target,
    domain,
    risk_results
):
    """
    Display the final vulnerability scan summary.
    """

    print("\n")
    print("=" * 60)
    print("SCAN SUMMARY")
    print("=" * 60)

    print(f"Target: {target}")
    print(f"Domain: {domain}")

    print(
        f"Overall Risk Level: "
        f"{risk_results.get('risk_level')}"
    )

    print(
        f"Risk Score: "
        f"{risk_results.get('risk_score')}"
    )

    print(
        f"Total Findings: "
        f"{risk_results.get('total_findings')}"
    )

    print("\nSeverity Breakdown")

    print("-" * 60)

    severity_counts = risk_results.get(
        "severity_counts",
        {}
    )

    for severity in [
        "Critical",
        "High",
        "Medium",
        "Low",
        "Informational"
    ]:

        count = severity_counts.get(
            severity,
            0
        )

        print(
            f"{severity}: {count}"
        )

    # --------------------------------
    # FINDINGS
    # --------------------------------

    print("\nDetected Findings")

    print("-" * 60)

    findings = risk_results.get(
        "findings",
        []
    )

    if not findings:

        print(
            "No security findings were detected "
            "by the configured checks."
        )

        return

    for index, finding in enumerate(
        findings,
        start=1
    ):

        print(
            f"\n{index}. "
            f"{finding.get('issue')}"
        )

        print(
            f"   Severity: "
            f"{finding.get('severity')}"
        )

        evidence = finding.get(
            "evidence"
        )

        if evidence:

            print(
                f"   Evidence: {evidence}"
            )

        recommendation = finding.get(
            "recommendation"
        )

        if recommendation:

            print(
                f"   Recommendation: "
                f"{recommendation}"
            )


def main():
    """
    Main vulnerability scanner controller.
    """

    target, domain = get_target()

    if not target or not domain:
        return

    print(
        f"\n[*] Starting vulnerability scan "
        f"for {domain}"
    )

    # ==========================================
    # CONNECTION CHECK
    # ==========================================

    response = check_connection(
        target
    )

    if response is None:

        print(
            "\n[-] Scan stopped because "
            "the target could not be reached."
        )

        return

    # ==========================================
    # PORT SCAN
    # ==========================================

    open_ports = scan_ports(
        domain
    )

    port_results = {
        "open_ports": open_ports,
        "issues": []
    }

    # Add findings for selected exposed services

    for port in open_ports:

        port_number = port.get(
            "port"
        )

        service = port.get(
            "service"
        )

        # --------------------------------
        # FTP
        # --------------------------------

        if port_number == 21:

            port_results[
                "issues"
            ].append({
                "issue":
                    "FTP service exposed",
                "severity":
                    "Medium",
                "evidence":
                    f"Port {port_number} - {service}",
                "recommendation":
                    "Disable FTP where possible "
                    "or use a secure alternative "
                    "such as SFTP."
            })

        # --------------------------------
        # TELNET
        # --------------------------------

        elif port_number == 23:

            port_results[
                "issues"
            ].append({
                "issue":
                    "Telnet service exposed",
                "severity":
                    "High",
                "evidence":
                    f"Port {port_number} - {service}",
                "recommendation":
                    "Disable Telnet and use an "
                    "encrypted protocol such as SSH."
            })

        # --------------------------------
        # SSH
        # --------------------------------

        elif port_number == 22:

            port_results[
                "issues"
            ].append({
                "issue":
                    "SSH service publicly accessible",
                "severity":
                    "Low",
                "evidence":
                    f"Port {port_number} - {service}",
                "recommendation":
                    "Review SSH access controls, "
                    "authentication settings and "
                    "network restrictions."
            })

        # --------------------------------
        # MYSQL
        # --------------------------------

        elif port_number == 3306:

            port_results[
                "issues"
            ].append({
                "issue":
                    "MySQL service exposed",
                "severity":
                    "High",
                "evidence":
                    f"Port {port_number} - {service}",
                "recommendation":
                    "Restrict database access to "
                    "trusted systems and avoid "
                    "direct public exposure."
            })

    # ==========================================
    # SECURITY HEADERS
    # ==========================================

    header_results = (
        check_security_headers(
            response
        )
    )

    # Convert missing headers into findings
    # so risk.py can process them.

    header_results.setdefault(
        "issues",
        []
    )

    for missing_header in (
        header_results.get(
            "missing",
            []
        )
    ):

        header_name = (
            missing_header.get(
                "header"
            )
        )

        description = (
            missing_header.get(
                "description"
            )
        )

        header_results[
            "issues"
        ].append({
            "issue":
                f"Missing security header: "
                f"{header_name}",
            "severity":
                "Low",
            "evidence":
                description,
            "recommendation":
                f"Review and configure the "
                f"{header_name} HTTP security "
                f"header where appropriate."
        })

    # ==========================================
    # COOKIE SECURITY
    # ==========================================

    cookie_results = (
        check_cookies(
            response
        )
    )

    # ==========================================
    # SSL/TLS
    # ==========================================

    ssl_results = (
        check_ssl(
            domain
        )
    )

    # ==========================================
    # SERVER INFORMATION
    # ==========================================

    server_results = (
        check_server_info(
            response
        )
    )

    # ==========================================
    # REDIRECTS
    # ==========================================

    redirect_results = (
        check_redirects(
            response
        )
    )

    # ==========================================
    # ROBOTS.TXT
    # ==========================================

    robots_results = (
        check_robots(
            target
        )
    )

    # ==========================================
    # SECURITY.TXT
    # ==========================================

    securitytxt_results = (
        check_security_txt(
            target
        )
    )

    # ==========================================
    # STORE ALL MODULE RESULTS
    # ==========================================

    module_results = {
        "ports":
            port_results,

        "headers":
            header_results,

        "cookies":
            cookie_results,

        "ssl":
            ssl_results,

        "server_info":
            server_results,

        "redirects":
            redirect_results,

        "robots":
            robots_results,

        "securitytxt":
            securitytxt_results
    }

    # ==========================================
    # RISK CALCULATION
    # ==========================================

    risk_results = calculate_risk(
        *module_results.values()
    )

    # ==========================================
    # DISPLAY SUMMARY
    # ==========================================

    display_summary(
        target,
        domain,
        risk_results
    )

    # ==========================================
    # GENERATE REPORTS
    # ==========================================

    report_paths = generate_reports(
        target=target,
        domain=domain,
        risk_results=risk_results,
        module_results=module_results
    )

    # ==========================================
    # COMPLETE
    # ==========================================

    print("\n")
    print("=" * 60)
    print("SCAN COMPLETED")
    print("=" * 60)

    print(
        f"TXT Report: "
        f"{report_paths.get('txt_report')}"
    )

    print(
        f"JSON Report: "
        f"{report_paths.get('json_report')}"
    )

    print(
        "\nUse this tool only against systems "
        "you own or have explicit permission "
        "to assess."
    )


if __name__ == "__main__":
    main()