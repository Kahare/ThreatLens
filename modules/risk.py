def calculate_risk(*module_results):
    """
    Combine findings from scanner modules and calculate
    an overall risk score and severity level.

    Args:
        *module_results:
            Dictionaries returned by scanner modules.

    Returns:
        dict: Overall risk assessment.
    """

    print("\n[*] Calculating overall risk...")

    severity_scores = {
        "Informational": 0,
        "Low": 1,
        "Medium": 3,
        "High": 6,
        "Critical": 10
    }

    findings = []
    total_score = 0

    severity_counts = {
        "Informational": 0,
        "Low": 0,
        "Medium": 0,
        "High": 0,
        "Critical": 0
    }

    # --------------------------------
    # COLLECT ISSUES FROM MODULES
    # --------------------------------

    for result in module_results:

        if not isinstance(result, dict):
            continue

        issues = result.get("issues", [])

        for issue in issues:

            if not isinstance(issue, dict):
                continue

            severity = issue.get(
                "severity",
                "Informational"
            )

            # Normalise unexpected severity names
            if severity not in severity_scores:
                severity = "Informational"

            score = severity_scores[severity]

            finding = {
                "issue": issue.get(
                    "issue",
                    "Unknown issue"
                ),
                "severity": severity,
                "score": score,
                "evidence": issue.get(
                    "evidence"
                ),
                "recommendation": issue.get(
                    "recommendation"
                )
            }

            findings.append(finding)

            total_score += score

            severity_counts[severity] += 1

    # --------------------------------
    # DETERMINE OVERALL RISK LEVEL
    # --------------------------------

    if severity_counts["Critical"] > 0:
        risk_level = "CRITICAL"

    elif severity_counts["High"] > 0:
        risk_level = "HIGH"

    elif total_score >= 15:
        risk_level = "HIGH"

    elif total_score >= 7:
        risk_level = "MEDIUM"

    elif total_score >= 1:
        risk_level = "LOW"

    else:
        risk_level = "INFORMATIONAL"

    # --------------------------------
    # SORT FINDINGS BY SEVERITY
    # --------------------------------

    findings.sort(
        key=lambda finding: finding["score"],
        reverse=True
    )

    results = {
        "risk_score": total_score,
        "risk_level": risk_level,
        "total_findings": len(findings),
        "severity_counts": severity_counts,
        "findings": findings
    }

    # --------------------------------
    # DISPLAY SUMMARY
    # --------------------------------

    print(f"[+] Total Findings: {len(findings)}")
    print(f"[+] Risk Score: {total_score}")
    print(f"[+] Overall Risk Level: {risk_level}")

    print("\nFinding Summary:")

    for severity, count in severity_counts.items():
        print(f"  {severity}: {count}")

    print("[+] Risk calculation completed")

    return results