## Pulsar Engine

**Rebuilding game engines from scratch because game devs deserve better**

### What is this? 

Pulsar Engine started from a simple frustration: existing game engines carry decades of technical debt and design compromises that just don't make sense anymore. So I decided to build one from the ground up in Rust, questioning every assumption along the way.

This isn't about cloning Unity or Unreal.  It's about asking "what if we designed this today?" and actually following through. 

### The interesting parts

**Architecture that doesn't compromise**  
The entire engine is built as modular Rust crates—no monolithic black boxes. The asset management system automatically indexes everything, watches for file changes in real-time, and provides O(1) lookups with full-text search. Every operation is type-safe, transactional, and thread-safe by default.

**Multiplayer editing that actually works**  
Most engines bolt on collaboration as an afterthought.  Pulsar includes a production-grade multiplayer editing service built into the core. It handles NAT traversal with UDP hole punching, uses the Noise protocol for end-to-end encryption, and implements CRDTs for conflict-free collaborative data structures. Think Google Docs, but for building games.

**UI built on GPUI**  
The editor interface is built on GPUI—a modern, GPU-accelerated UI framework.  It's fast, responsive, and doesn't rely on ancient widget systems from the 90s. 

**Spatial systems designed for scale**  
Large open worlds aren't an afterthought. The spatial partitioning and world simulation systems are designed from day one to handle massive environments efficiently. 

### State of Pulsar

Let's be honest: you can't ship a commercial game with Pulsar yet. It's experimental, under heavy development, and currently Windows-only while we work through some architectural changes. This is an active learning project—the kind where you discover what works by actually building it.

But that's the point. The goal isn't to rush to feature parity with 20-year-old engines. It's to build something fundamentally better, even if it takes time.

### Development philosophy

Everything happens in the open. The code is public, development discussions happen on Discord and GitHub, and the architecture is documented as we build it. I'm not interested in creating another closed ecosystem—this is about exploring what's possible with modern systems design and Rust's safety guarantees.

Currently sitting at 215 stars and 15 forks, with an active community of developers who are equally frustrated with the status quo. 

### Technical highlights

- 99.4% Rust (with small amounts of Python, WGSL, and Tree-sitter Query for tooling)
- MIT licensed and fully open source
- Prometheus metrics and OpenTelemetry tracing built-in on the server side
- QUIC-based relay with horizontal scaling support for multi-user editing in real time over the internet
- Automatic dependency management and guided setup

Want to see the messy details? Check out the full source at [Far-Beyond-Pulsar/Pulsar-Native](https://github.com/Far-Beyond-Pulsar/Pulsar-Native).