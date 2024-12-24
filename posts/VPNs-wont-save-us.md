---
title: "VPNs: When will they save us, and when won't they?"
date: "2024-12-24"
categories: ["Security"] 
tags: ["VPNs"]
---

# Addressing the issue

We have all seen segments on YouTube and platforms like it advertising that you are "safer" online when using a VPN. This can be true as we will see, but usually only in very specific circumstances. In this post we will dive into these claims and show when VPNs will, and will not save you.

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

### Verdict
The VPN used here is essential here for access control, but not security as long as we are using HTTPS.

## Case Study 3: Monitoring Prevention

Lisa works at a university and wants to prevent IT from seeing what sites she visits.

With HTTPS:
- IT can see which sites she visits (Not the data she sends them)
- Cannot see specific pages or content
- Cannot intercept any encrypted data
- DNS queries visible to network

With VPN:
- IT only sees connection to VPN server (Which can be and often is blocked anyway)
- VPN provider can see all traffic instead
- Trading one observer for another
- Still protected by HTTPS anyway

### Verdict
In this case, the VPN only shifts visibility from IT to VPN provider, HTTPS handles actual security with or without the VPN. 

# The Risk of VPNs

An often-overlooked concern with VPNs is that they create a single point of surveillance. While VPNs claim to protect privacy, routing all traffic through a single provider actually creates a perfect bottleneck for mass surveillance. Every site you visit, every connection you make, flows through your VPN provider's servers. This gives them complete visibility into your browsing patterns, relating them directly to you and your account effectively concentrating all your privacy risk in one place.

This concentration of data becomes particularly concerning when considering government surveillance. If a state actor compels or compromises a VPN provider, they gain immediate access to every user's complete browsing history. They can easily correlate users with their online activities and build comprehensive profiles of their internet usage. Historical logs, if kept by the VPN provider, could expose months or years of user behavior.

In contrast, standard HTTPS without a VPN distributes this trust across many individual websites. While each site knows when you visit them, no single entity can see your complete browsing pattern. This distribution of data makes mass surveillance significantly more challenging - a government would need to compromise multiple independent sites rather than just one VPN provider. Even if they succeed in monitoring one website, they can't see your interactions with other sites.

Criminal actors targeting VPNs pose similar risks. A compromised VPN provider gives attackers visibility into all user connections, potential access to login attempts across various sites, and the ability to track user locations and behaviors. They might even inject malicious content into the encrypted tunnel. This level of access makes VPN providers an attractive target for bad actors, turning a security tool into a potential vulnerability.

The fundamental issue is that using a VPN requires placing absolute trust in a single provider. While HTTPS also requires trust, it distributes that trust across many separate entities, significantly reducing the impact of any single compromise. Before investing in a VPN service consider whether you can really trust that "no logs" policy they claim to have. While considering that keep in mind the deceptive marketing tactics they have used as shown in the case studies.

# The Bottom Line

VPNs use the same encryption technology as HTTPS but serve a fundamentally different purpose. While HTTPS protects the content of your communication, VPNs primarily hide who you're communicating with. For security concerns HTTPS is plenty sufficient, and in most cases even more ideal than a VPN.