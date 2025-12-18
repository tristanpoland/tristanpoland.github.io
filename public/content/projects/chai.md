## ChaiLauncher

**Because the default Minecraft launcher deserved to be replaced a decade ago**

### What it is

ChaiLauncher is a modern Minecraft launcher built with Tauri, React, and Rust that prioritizes what actually matters: clean UI, fast performance, and not feeling like software from 2012.

It's a cross-platform desktop application (Windows, macOS, Linux) that handles everything you'd expect from a launcher: account management, instance creation, mod installation, version selection but wrapped in an interface that doesn't make your eyes hurt.

### The technical angle

**Tauri architecture for native performance** 
The backend is Rust-powered through Tauri 2.8, which means actual native performance without Electron's memory bloat. Async operations with Tokio keep the UI responsive while downloading mods or launching instances. WebView-based rendering gives you modern web UI capabilities without shipping an entire Chromium instance.

**React frontend with real polish** 
Built with React 18, Tailwind CSS, Framer Motion for animations, and Radix UI for accessible components. The frontend isn't just functional, it's the kind of interface you'd actually want to use. Smooth transitions, thoughtful layouts, real-time progress indicators for downloads and installations.

**Microsoft OAuth integration** 
Secure authentication through Microsoft's OAuth flow. No sketchy credential storage, no workarounds. Proper integration with Minecraft's authentication system using the oauth2 crate on the Rust side.

**Libium for mod management** 
The mod management backend is powered by Libium, which handles Modrinth, CurseForge, and GitHub Releases. It includes manifest parsing for modpack formats, dependency resolution, version compatibility filtering, and automatic updates. The system can scan existing mod directories, hash files, and query APIs to identify and add mods to profiles automatically.

### What makes it better than the alternatives

The official Minecraft launcher is functional but dated. MultiMC and its forks are powerful but feel like developer tools, not user applications. Most custom launchers sacrifice either performance or aesthetics. 

ChaiLauncher splits the difference. Rust backend for reliability and speed. React frontend for modern UI patterns and smooth interactions. Clean design that doesn't try to reinvent interfaces people already understand.

Multiple instance support with independent mod configurations. Version selection across Minecraft releases. Server integration for multiplayer. Resource pack and shader pack management on the roadmap. Everything you need without feature bloat.

### The current state

Version 0.2.0. MIT licensed and fully open source. Active development with a clear roadmap: advanced mod features, custom modpack creation, shader management, and performance optimization tools are all in progress.

The codebase is split cleanly: TypeScript/React for the frontend (45. 4%), Rust for the backend (53%), with CSS for styling (1.2%). Vite for build tooling, PostCSS for CSS processing, ESLint for code quality. Standard modern web stack with Rust where it matters.

### Why it exists

The Minecraft modding community deserves better tools. Launchers shouldn't be an afterthought or a technical hurdle, they should be transparent infrastructure that gets out of the way and lets you play the game.

ChaiLauncher is what happens when you build a launcher with modern tooling and actually care about the user experience. No ads, no bloat, no compromises on performance or design.

Check it out at [Chai-Foundation/ChaiLauncher](https://github.com/Chai-Foundation/ChaiLauncher).