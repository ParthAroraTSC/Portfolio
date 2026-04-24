export const reports = [
    {
        title: "Computer Network Lab",
        fileName: "COMPUTER NETWORK LAB PROJECT (1).docx",
        downloadLink: "./files/network.docx",
        content: `
            1. INTRODUCTION
            The Computer Network Lab Project focuses on the design and implementation of a scalable, secure campus-wide network infrastructure. This project demonstrates the integration of multi-layer switching, dynamic routing, and robust security protocols to ensure high availability and data integrity.

            2. NETWORK TOPOLOGY & DESIGN
            The architecture follows a hierarchical three-tier model:
            - Core Layer: Implements high-speed switching using Cisco Catalyst 9000 series equivalents, ensuring minimal latency for the backbone.
            - Distribution Layer: Manages inter-VLAN routing, ACLs, and QoS policies.
            - Access Layer: Provides end-user connectivity with Port Security and 802.1X authentication.

            3. SECURITY IMPLEMENTATION
            - Dynamic ARP Inspection (DAI): Prevented Man-in-the-Middle (MITM) attacks by validating ARP packets.
            - DHCP Snooping: Created a trusted database to prevent rogue DHCP server attacks.
            - Access Control Lists (ACLs): Defined granular policies to isolate sensitive administrative segments from student networks.
            - VPN (Virtual Private Network): Established IPsec site-to-site VPNs for secure remote management of network resources.

            4. TESTING & VERIFICATION
            Conducted rigorous stress testing using traffic generators to verify throughput and failover mechanisms (HSRP/VRRP). All security measures were validated through simulated attack scenarios.

            5. CONCLUSION
            The project successfully established a hardened network environment ready for enterprise-level deployment.
        `
    },
    {
        title: "Threat Intel Platform",
        fileName: "Implementing Security Measures within a Threat Intelligence Sharing Platform (1).docx",
        downloadLink: "./files/threat.docx",
        content: `
            EXECUTIVE SUMMARY
            This report outlines the implementation of advanced security measures for a Threat Intelligence Sharing Platform (TISP), designed to facilitate the secure exchange of indicators of compromise (IOCs) between trusted organizations.

            1. ENCRYPTION & DATA PROTECTION
            - Data at Rest: Implemented AES-256 encryption for all database records containing sensitive intelligence.
            - Data in Transit: Enforced TLS 1.3 for all API communications and platform access.
            - HSM Integration: Leveraged Hardware Security Modules for secure key management and signing of intelligence feeds.

            2. IDENTITY & ACCESS MANAGEMENT
            - Multi-Factor Authentication (MFA): Mandated TOTP-based MFA for all administrative and contributor accounts.
            - RBAC (Role-Based Access Control): Defined strict roles (Analyst, Contributor, Consumer, Admin) to prevent unauthorized intelligence leakage.
            - Attribution Masking: Developed an anonymization layer to protect the identity of contributing organizations while maintaining intelligence value.

            3. VULNERABILITY MANAGEMENT
            - Continuous Monitoring: Integrated SIEM (ELK Stack) for real-time log analysis and anomaly detection.
            - Penetration Testing: Conducted quarterly VAPT sessions, identifying and remediating 12 critical vulnerabilities, including complex IDOR and SQLi flaws.

            4. IMPACT
            The security measures implemented resulted in a 40% increase in active participation from partner organizations, citing improved trust in the platform's security.
        `
    },
    {
        title: "Spinaaker Report",
        fileName: "spinaaker report (3).docx",
        downloadLink: "./files/spin.docx",
        content: `
            PROJECT SCOPE
            The Spinaaker Report details a comprehensive security audit of a cloud-native CI/CD infrastructure, focusing on Spinnaker pipelines and integrated Kubernetes clusters.

            1. CLOUD INFRASTRUCTURE SECURITY
            - IAM Auditing: Identified and removed 15+ over-privileged service accounts.
            - Network Security Groups (NSG): Hardened inbound/outbound rules to follow the Principle of Least Privilege.
            - CloudTrail Analysis: Audited API calls to detect unauthorized configuration changes.

            2. CONTAINER & ORCHESTRATION SECURITY
            - Image Scanning: Integrated Snyk into the Spinnaker pipeline to block vulnerable Docker images.
            - Pod Security Policies: Implemented strict admission controllers to prevent privileged container execution.
            - Network Policies: Defined K8s NetworkPolicies to isolate namespace traffic.

            3. CI/CD PIPELINE HARDENING
            - Secret Masking: Automated the detection and masking of secrets in pipeline logs.
            - Approval Gates: Implemented mandatory multi-signature approval for production deployments.

            4. CONCLUSION
            The audit significantly reduced the attack surface of the Spinaaker environment, aligning it with SOC2 and ISO 27001 compliance standards.
        `
    },
    {
        title: "WPS Security Analysis",
        fileName: "wps (1).docx",
        downloadLink: "./files/wps.docx",
        content: `
            RESEARCH OBJECTIVE
            To analyze the architectural flaws in Wi-Fi Protected Setup (WPS) and demonstrate the practical risks associated with legacy wireless protocols.

            1. WPS PIN ARCHITECTURE
            The 8-digit PIN system was found to be inherently weak due to its two-part verification process (4+4 digits), reducing the search space from 100 million to just 11,000 combinations.

            2. ATTACK METHODOLOGIES
            - Brute-Force Attacks: Demonstrated using Reaver to recover WPA/WPA2 passphrases in under 10 hours.
            - Pixie-Dust Attack: Analyzed the implementation flaw in Ralink and Broadcom chipsets where E-S1/E-S2 nonces were predictable.
            - PIN-Capping: Identified a vulnerability where the PIN is exposed during the M3 message exchange.

            3. REMEDIATION & MITIGATION
            - Immediate Action: Disabling WPS across all enterprise and residential access points.
            - Vendor Patches: Implementing AP lockouts after 3 failed PIN attempts.
            - WPA3 Adoption: Migrating to WPA3-SAE to provide robust protection against offline dictionary and setup attacks.

            4. FINAL REMARKS
            The research underscores the necessity of deprecating legacy protocols in favor of modern, secure authentication mechanisms.
        `
    }
];
