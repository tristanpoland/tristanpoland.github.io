---
title: "My Journey with the Legion Slim 7 16IRH8: A Rust, Unreal Engine, and Web Developer's Perspective"
date: "2025-04-10"
categories: ["Technology", "Development", "Hardware Review"]
tags: ["Legion Slim 7", "Rust Development", "Unreal Engine", "Web Development", "WSL", "Dev Containers"]
---

## Introduction

Back in January 2024, I finally bit the bullet and grabbed a Lenovo Legion Slim 7 16IRH8. It showed up about a week later, and I've been putting it through its paces ever since. As someone who constantly bounces between Rust coding, Unreal Engine game dev, and web projects, I needed something that wouldn't choke when I throw multiple workloads at it. Now, 15 months later, I figure it's time to share what living with this machine has really been like.

## The Specs: Built for Performance

Let's talk about what's under the hood:

- **Processor**: 13th Gen Intel Core i7-13700H (2.40 GHz base clock)
- **Graphics**: NVIDIA GeForce RTX 4060 Laptop GPU with 8GB VRAM
- **Memory**: 32GB DDR5 RAM running at 5600 MHz (16 GB of this was added after market for cost saving)
- **Storage**: 1.82TB total

## Rust Development Experience

For Rust work, compile times and IDE responsiveness make or break my productivity. The Legion hasn't disappointed.

### Compile Times

The 13700H with its mix of performance and efficiency cores really delivers when compiling Rust projects.

For my typical backend project with around 50 dependencies:
- Clean build: ~20 seconds
- Incremental builds: 2-5 seconds

Even after a year of hammering this thing daily, those times haven't budged. The parallel compilation in cargo absolutely flies on this CPU, especially with the larger codebases I've been tackling lately.

### IDE Performance

I mainly stick with VS Code and rust-analyzer for Rust work, and it just works:

- Code analysis happens basically instantly
- Autocomplete pops up right when I need it
- Background cargo check and clippy don't bog things down

Having 32GB of RAM means I never think twice about having my IDE, multiple terminals, Docker containers, and a dozen browser tabs with docs all running at once.

## Unreal Engine Game Development

This is where the Legion really earns its keep, and where that RTX 4060 justifies its existence.

### Editor Performance

The Unreal Editor runs surprisingly smooth, even with complex scenes. The i7-13700H paired with the RTX 4060 handles:

- Real-time lighting without the usual slideshow effect
- Smooth camera movement even in detailed environments
- Asset imports and shader compilation that don't make me want to get coffee

I've been building a first-person exploration game with some pretty detailed environments, and I'm consistently getting 90-120 FPS in the viewport with dynamic lighting on.

### Build Times

We all know Unreal builds can take forever, but the Legion keeps things moving:

- Full rebuilds: 10-15 minutes for my mid-sized project
- Incremental builds: Usually 1-2 minutes
- Shader compilation: Way faster than my old setup

Yeah, it gets hot during extended builds, but the cooling system manages to keep it from thermal throttling without sounding like a jet engine.

### Game Performance

When actually playing the game in-editor, the RTX 4060 holds up well:

- 80-100 FPS at 1080p with settings cranked
- 50-60 FPS at 1440p on my external monitor
- Ray tracing features are usable, though they do take a chunk out of performance

This level of performance means I can actually test the game properly without constantly wondering if performance issues are my code or just my laptop struggling.

## Development Environment: WSL + Dev Containers

The real game-changer in my workflow has been Windows Subsystem for Linux with dev containers. The Legion handles this setup beautifully.

### WSL Performance

The i7-13700H makes WSL virtualization feel almost native:

- My Ubuntu 22.04 WSL instance boots in seconds
- File operations between Windows and Linux don't grind to a halt
- It handles memory allocation smartly even when I'm pushing things

After a year of daily WSL use, performance is still rock-solid. I've upgraded through several WSL versions and Windows updates without any noticeable slowdown.

### Dev Container Integration

Dev containers have completely changed how I work, giving me consistent environments across all my projects:

- Docker containers spin up almost instantly
- Complex multi-container setups run without a hitch

My go-to setup includes:
- Rust containers with specific toolchains locked in
- Node.js containers with project-specific versions
- MySQL and Redis containers for backend work

The 32GB RAM means I'm regularly running 5-6 devcontainers (on top of a dozen or so other containers) alongside WSL without breaking a sweat. The SSD makes container image builds and volume mounts blazing fast.

The best part? Switching contexts between projects is trivial. I can jump from a Rust project to a web project with totally different container configs in under a minute. No more wasting hours reconfiguring my environment.

## Web Development Workflow

Web dev might seem lighter weight, but modern tooling can bring even good machines to their knees.

### Development Tools Performance

With my containerized setup, web development feels effortless:

- Hot reloading happens instantaneously in React, Vue, and Next.js
- TypeScript compilation finishes before I even notice it started
- Webpack and Vite builds happen in a fraction of the time they took on my old machine
- Browser devtools stay snappy even with complex component trees

The Legion handles all this multitasking without breaking stride. I regularly have multiple Docker containers, 20+ browser tabs, and several VS Code windows open with zero lag.

## Battery Life and Portability

This is where reality sets in. Gaming laptops and battery life have never been best friends.

The Legion Slim 7 is thinner than most gaming laptops, but "slim" is relative here. Battery life varies wildly depending on what I'm doing:

- Web development: 2-3 hours at best
- Rust development: 1.5-2.5 hours
- Unreal Engine: 1-2 hours if I'm lucky

After 15 months of daily use, the battery capacity has dropped about 7-10% from new. That's actually pretty decent considering how hard I push this thing.

## Long-Term Reliability and Maintenance

A year-plus of ownership gives me some perspective on durability:

- Clean those fans every 2-3 months, and keep an eye on the screws—they wear down easily with repeated removal
- Use a dab of threadlocker when putting screws back in
- Keep it away from pet hair and dust—the cooling system is sealed and nearly impossible to clean thoroughly once contaminated
- Watch what falls between the keys—anything that gets under them stays there unless you're ready for a full motherboard removal

### Thermal Performance Over Time

Despite daily torture, the cooling system has held up well. Bi-monthly fan cleaning has kept temperatures manageable. Under heavy load:

- CPU sits around 75-85°C during compilation
- GPU hovers at 70-85°C in Unreal Engine
- Fan noise is noticeable but bearable with headphones

#### Downsides

- Legions run hot. Period. This thing gets toastier than any laptop I've used before, which can't be great for longevity, though I haven't had any heat-related failures yet.
- The upper speaker grill area gets uncomfortably hot during heavy workloads. An external cooling pad makes a huge difference if you can use one.

### Hardware Reliability

After 15 months of constant use:
- The keyboard still feels great with no key issues (pretty impressive for how much code I've typed)
- The trackpad shows minimal wear, though one side sits slightly lower than the other after countless clicks
- Screen hinges are still rock solid with zero wobble
- All ports work flawlessly despite constant peripheral swapping
- Battery health is around 82% of original capacity

### Software Updates

Lenovo has been surprisingly good about BIOS and driver updates. I've gotten about 7 updates since purchase, each improving performance, security, or stability in noticeable ways.

### Nitpicks

- The aftermarket Windows installer utility messed up my PCI power settings, causing the GPU to sleep on battery. This makes Windows think the GPU crashed, so it restarts the display driver—resulting in annoying screen freezes. I'll post a fix in my next blog.
- Why can't I enable high performance mode on battery in Lenovo Vantage? This seems like an obvious feature.
- Linux support for Legion hardware is spotty at best. Come on, Lenovo.
- My Legion refuses to charge from my UGreen 48,000 mAh 300W battery pack, even though other laptops work fine with it. Not sure if that's UGreen's fault or Lenovo's.

## A Year+ Later

After 15+ months with the Legion Slim 7, I'm still impressed with how it handles my dev workloads. The upfront cost has definitely been worth it. For anyone juggling multiple development environments—especially resource-hungry ones like Unreal Engine—this laptop hits a sweet spot between power, portability, and reliability.

It's aged well, keeping pace as my projects have gotten more complex. Even with newer models sporting 14th Gen Intel chips and refreshed RTX cards, I don't feel any urgent need to upgrade—which says a lot about how well-specced this machine was from the start.

Would I recommend it to other devs in 2025? Absolutely, though you might want to check out the newest iteration if buying new. In hindsight, I'd probably recommend the AMD lineup over Intel for better performance and battery life (I briefly used a lower-spec AMD model and was seriously impressed with the fact that the battery seemed to last an eternity).