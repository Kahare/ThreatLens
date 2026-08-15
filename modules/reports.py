import json
import os
from datetime import datetime


def generate_reports(
    target,
    domain,
    risk_results,
    module_results,
    reports_directory="reports"
):
    """
    Generate TXT and JSON vulnerability scan reports.

    Args:
        target (str):
            Full target URL.

        domain (str):
            Target hostname.

        risk_results (dict):
            Final output from risk.py.

        module_results (dict):
            Results returned by individual scanner modules.

        reports_directory (str):
            Directory where reports will be saved.

    Returns:
        dict:
            Paths to generated report files.
    """

    print("\n[*] Generating vulnerability reports...")

    # --------------------------------
    # CREATE REPORT DIRECTORY
    # --------------------------------

    os.makedirs(
        reports_directory,
        exist_ok=True
    )

    # --------------------------------
    # TIMESTAMP
    # --------------------------------

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    scan_time = datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    # Make domain filename-safe

    safe_domain = (
        domain
        .replace(":", "_")
        .replace("/", "_")
    )

    txt_filename = (
        f"{safe_domain}_{timestamp}.txt"
    )

    json_filename = (
        f"{safe_domain}_{timestamp}.json"
    )

    txt_path = os.path.join(
        reports_directory,
        txt_filename
    )

    json_path = os.path.join(
        reports_directory,
        json_filename
    )

    # ==========================================
    # TXT REPORT
    # ==========================================

    with open(
        txt_path,
        "w",
        encoding="utf-8"
    ) as report:

        report.write(
            "VULNERABILITY SCAN REPORT\n"
        )

        report.write(
            "=" * 60 + "\n\n"
        )

        # --------------------------------
        # SCAN INFORMATION
        # --------------------------------

        report.write(
            "SCAN INFORMATION\n"
        )

        report.write(
            "-" * 60 + "\n"
        )

        report.write(
            f"Target: {target}\n"
        )

        report.write(
            f"Domain: {domain}\n"
        )

        report.write(
            f"Scan Time: {scan_time}\n\n"
        )

        # --------------------------------
        # RISK SUMMARY
        # --------------------------------

        report.write(
            "RISK SUMMARY\n"
        )

        report.write(
            "-" * 60 + "\n"
        )

        report.write(
            f"Overall Risk Level: "
            f"{risk_results.get('risk_level', 'Unknown')}\n"
        )

        report.write(
            f"Risk Score: "
            f"{risk_results.get('risk_score', 0)}\n"
        )

        report.write(
            f"Total Findings: "
            f"{risk_results.get('total_findings', 0)}\n\n"
        )

        # --------------------------------
        # SEVERITY COUNTS
        # --------------------------------

        report.write(
            "SEVERITY BREAKDOWN\n"
        )

        report.write(
            "-" * 60 + "\n"
        )

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

            report.write(
                f"{severity}: {count}\n"
            )

        # --------------------------------
        # FINDINGS
        # --------------------------------

        report.write(
            "\nDETAILED FINDINGS\n"
        )

        report.write(
            "-" * 60 + "\n"
        )

        findings = risk_results.get(
            "findings",
            []
        )

        if not findings:

            report.write(
                "No security findings detected.\n"
            )

        else:

            for index, finding in enumerate(
                findings,
                start=1
            ):

                report.write(
                    f"\nFinding {index}\n"
                )

                report.write(
                    f"Title: "
                    f"{finding.get('issue', 'Unknown')}\n"
                )

                report.write(
                    f"Severity: "
                    f"{finding.get('severity', 'Unknown')}\n"
                )

                report.write(
                    f"Score: "
                    f"{finding.get('score', 0)}\n"
                )

                evidence = finding.get(
                    "evidence"
                )

                if evidence:

                    report.write(
                        f"Evidence: {evidence}\n"
                    )

                recommendation = finding.get(
                    "recommendation"
                )

                if recommendation:

                    report.write(
                        f"Recommendation: "
                        f"{recommendation}\n"
                    )

        # --------------------------------
        # MODULE SUMMARY
        # --------------------------------

        report.write(
            "\n\nMODULE SUMMARY\n"
        )

        report.write(
            "-" * 60 + "\n"
        )

        for module_name, result in module_results.items():

            report.write(
                f"\n[{module_name.upper()}]\n"
            )

            if isinstance(result, dict):

                issues = result.get(
                    "issues",
                    []
                )

                report.write(
                    f"Issues detected: "
                    f"{len(issues)}\n"
                )

            else:

                report.write(
                    "No structured results available.\n"
                )

        # --------------------------------
        # DISCLAIMER
        # --------------------------------

        report.write(
            "\n\nDISCLAIMER\n"
        )

        report.write(
            "-" * 60 + "\n"
        )

        report.write(
            "This scanner performs basic security checks "
            "and does not provide a complete vulnerability "
            "assessment. Testing should only be performed "
            "against systems you own or have explicit "
            "permission to assess.\n"
        )

    # ==========================================
    # JSON REPORT
    # ==========================================

    json_report = {
        "scan_information": {
            "target": target,
            "domain": domain,
            "scan_time": scan_time
        },

        "risk_summary": risk_results,

        "module_results": module_results
    }

    with open(
        json_path,
        "w",
        encoding="utf-8"
    ) as report:

        json.dump(
            json_report,
            report,
            indent=4,
            default=str
        )

    # --------------------------------
    # COMPLETE
    # --------------------------------

    print(
        f"[+] TXT report saved: "
        f"{txt_path}"
    )

    print(
        f"[+] JSON report saved: "
        f"{json_path}"
    )

    return {
        "txt_report": txt_path,
        "json_report": json_path
    }