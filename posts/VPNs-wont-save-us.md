---
title: "VPNs: When will they save us, and when wont they?"
date: "2024-10-17"
---

We have all seen segments on Youtube and platforms like it advertising that you are "safer" online when using a VPN. This can be true as we will see, but usually only in very specific circumstances. In this post we will dive into these claims and show when VPNs will, and will not save you.

# The Claims

Most of the common claims by VPN companies in these segments claim VPNs will protect you in cases similar to these:
- Accessing sensitive data (like a bank account) over public wifi
- Securing sensitive work communications when working remotely
- Preventing network admins from monitoring your traffic

# The Technical Reality

Before diving into each claim, it's important to understand that VPNs and HTTPS use the same fundamental encryption technology - typically TLS (Transport Layer Security). When you connect to a website using HTTPS, you're already creating an encrypted tunnel between your device and that website's server. Similarly, when you use a VPN, you're creating an encrypted tunnel to the VPN server.

With that in mind let's examine each claim with real-world scenarios:

## Case Study 1: Banking on Public WiFi

### The Case
Sarah is working from a local coffee shop and needs to check her bank account. She's concerned about the security of the public WiFi network.

With HTTPS:
- Her connection to the bank is automatically encrypted
- The coffee shop's network can see she's connecting to bankofamerica.com
- Nobody can intercept her login credentials or account details
- The bank's certificate validates she's on the real website

With VPN:
- Adds a second layer of encryption (unnecessary since HTTPS already encrypts)
- Hides the fact she's accessing a bank from the coffee shop
- Shifts trust from coffee shop to VPN provider
- Still relies on HTTPS for actual security

### Verdict
The only thing the VPN provides for Sarah in this case is hiding what bank she uses. Even on a public network there is simply no way to see any of the data Sarah is sending to any site if they are using HTTPS

## Case Study 2: Remote Work Access

John needs to access his company's internal documentation system from home.

With HTTPS alone:
- Can't access internal systems behind corporate firewall
- External services (email, cloud apps) remain secure
- No way to reach private network resources

With Corporate VPN:
- Creates secure tunnel into company network
- Enables access to internal resources
- Enforces company security policies
- Protects non-HTTPS internal traffic

Verdict: VPN is essential here for access control, but not security.

## Case Study 3: Monitoring Prevention

Lisa works at a university and wants to prevent IT from seeing her browsing.

With HTTPS:
- IT can see which sites she visits
- Cannot see specific pages or content
- Cannot intercept any encrypted data
- DNS queries visible to network

With VPN:
- IT only sees connection to VPN server (Which can be and often is blocked anyway)
- VPN provider can see all traffic instead
- Trading one observer for another
- Still protected by HTTPS anyway

Verdict: In this case, the VPN only shifts visibility from IT to VPN provider, HTTPS handles actual security with or without the VPN. 

# The Bottom Line

VPNs use the same encryption technology as HTTPS but serve a fundamentally different purpose. While HTTPS protects the content of your communication, VPNs primarily hide who you're communicating with. For most security concerns, modern HTTPS is sufficient protection. VPNs are most valuable when you need to:

1. Access resources on private networks
2. Hide your browsing patterns from local observers
3. Protect non-HTTPS traffic (increasingly rare)

Before purchasing a VPN subscription for security, consider whether HTTPS already provides the protection you need.