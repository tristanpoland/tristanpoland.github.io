---
title: "The Rise of Tech Tribalism: When Tool Loyalty Trumps Pragmatism"
date: "2024-10-12"
---

## A brief introduction to the problem

In recent years, a concerning trend has emerged in the tech world: the rise of what we might call "tech tribalism." This phenomenon sees developers and teams aligning themselves with specific tools, languages, or frameworks with an almost political fervor, often at the expense of pragmatic decision-making and optimal problem-solving. Traditionally, the tech community has prided itself on rigorous testing and empirical comparisons to determine the best tools for specific jobs. However, we're increasingly seeing a shift away from this data-driven approach towards a more emotionally-charged, tribal mentality.

This tribalism manifests in various forms across the tech landscape. We see heated debates between Python and R enthusiasts in data science, or the ongoing JavaScript vs TypeScript discussions in web development. In the backend world, developers often passionately argue for their preferred language, be it Java, C#, or Ruby. The systems programming domain isn't immune either, with a growing rivalry between C++ and Rust advocates.

## One such example of tribalism in tech

Before we cover this I'll start off by saying this: I love the Ruby community! Ruby has been foundational in constructing some of the largest services we know today (Most notably GitHub) however even GitHub has been forced to rewrite performance critical portions of their platform (such as the searching system) in better performing more stable languages like Rust.

Recently I was sent a blog post that positivly blew my mind, and finally convinced me to write this post, it can be found [here](https://andymaleh.blogspot.com/2024/10/javascript-is-disease-ruby-is-cure.html) for those interested.

## One such example of tribalism in tech

Before we cover this I'll start off by saying this: I love the Ruby community! Ruby has been foundational in constructing some of the largest services we know today (Most notably GitHub) however even GitHub has been forced to rewrite performance critical portions of their platform (such as the searching system) in better performing more stable languages like Rust.

Recently I was sent a blog post that positively blew my mind, and finally convinced me to write this post, it can be found [here](https://andymaleh.blogspot.com/2024/10/javascript-is-disease-ruby-is-cure.html) for those interested.

This post is a perfect storm of tech tribalism, combining inflammatory language, baseless claims, and a healthy dose of cognitive dissonance. Let's break this down:

1. Biased language to sway the reader to their opinion: The author throws around terms like JavaScript being a "disease" and Ruby the "cure". They describe JS code as "ugly smelly mold" and contrast the "Hell of JavaScript" with the "Heaven" of Frontend Ruby.

2. Claims pulled out of thin air: "anyone who is not using Frontend Ruby in 2024 is at least half as productive" I would sure love to see a large data pool to back this up.

3. False dichotomy: The post presents a frankly ridiculous either/or scenario between Ruby and JavaScript. News flash: in the real world, we often use both languages because they each have their strengths.

4. Overgeneralization: The writer here waves their hand and dismisses all JavaScript frameworks as unnecessary in "Rubyland". Because clearly, the thousands of developers who've contributed to and use these frameworks daily are just wasting their time, I suppose?

5. Cherry-picking: The post goes on and on about the potential benefits of using Ruby for frontend development while conveniently ignoring Ruby's drawbacks or challenges.

6. Misrepresentation: They imply that using Ruby for frontend development is always superior, completely disregarding the massive ecosystem and performance optimizations available in JavaScript. As if JavaScript hasn't evolved since 1995.

Look, I get it. We all have our favorite technologies. After all I myself have mentioned Rust how many times since this post started? But this level of tribalism is just toxic. It's the kind of attitude that leads to developers with blinders on, unable to see the value in other tools and approaches.

In our field, change is the only constant. The most successful developers are the ones who can adapt, who can recognize the strengths of different technologies and use the right tool for the job. Spouting off this kind of divisive nonsense doesn't just make you look like an ass - it actively holds back progress in our industry.

Instead of this "my language can beat up your language" pre-k playground debate, how about we focus on building amazing things? Use Ruby where it shines. Use JavaScript where it excels even throw in some Rust or Go if that's what the project needs. At the end of the day, it's about creating solid, efficient solutions - not waving our language flags and shouting at the other devs.

## Lets look at some charts for once

![](/images/rise-of-tech-tribalism/table4.png)

When we look at some of the data collected in the table above in Table 4 [1], we see that these debates often (in fact nearly always) overlook crucial distinctions, particularly between compiled and interpreted languages. The table clearly shows a performance divide between these two categories, with compiled languages generally outperforming interpreted ones across various metrics.

Compiled languages like C, Rust, C++, and Go consistently rank at the top in terms of energy efficiency, execution time, and memory usage. This is not surprising, as compilation allows for extensive optimization before the code is run. On the other hand, interpreted languages like Python, Ruby, and PHP, while often praised for their ease of use and rapid development capabilities, lag significantly behind in performance metrics as would be expected.

However, it's important to note that this doesn't mean interpreted languages don't have their place. They often excel in scenarios where development speed, ease of maintenance, or specific ecosystem advantages outweigh raw performance needs. For instance, Python's extensive data science libraries make it a powerhouse for machine learning and data analysis tasks, despite its lower performance in general computing. It is also important to note however that ease of development is not an excuse for poor performance of a production application, while a language like Ruby may be helpful to draft a large scale backend, the production version should be as efficient and scalable as possible.

## Why it matters

The danger of tech tribalism lies in blindly advocating for a single language or framework without considering the specific needs of each project or organization. When we choose tools based on loyalty rather than suitability, we risk using poorly optimized solutions for our specific problems. For example, if a team chooses an interpreted language for a performance-critical backend application (as often happens with Ruby) simply because they're comfortable with it, they might be sacrificing significant efficiency gains that could be achieved with a compiled language or even a faster interpreted languages such as JavaScript.
To combat this trend, we need to return to a culture of rigorous testing and comparison, while also acknowledging the fundamental differences between language categories. This involves:

- Understanding the strengths and weaknesses of languages so you know what tool is right for the job.
- Conducting performance tests across different tools for your specific use case and perhaps even your specific hardware.
- Evaluating tools based on their strengths in particular scenarios rather than their overall popularity.
- Regularly reassessing our tool choices as both our needs and the tools themselves evolve.

## Real World Consequences

The importance of choosing the right tool for the job is illustrated by several high-profile cases in the tech industry. Twitter's switch from Ruby to Scala (Built on Java) for their backend services allowed them to handle their explosive growth more efficiently. This move aligns with the data, showcasing the performance benefits of moving from an interpreted to a compiled language for scale-intensive backend operations.

Similarly, Dropbox's decision to rewrite their core file-syncing engine in Rust led to dramatic improvements in performance and resource usage. This case demonstrates how even within the compiled language category, choosing a language with specific strengths (in Rust's case, memory safety and concurrency) can yield significant benefits for particular use cases.

These codebase rewrites come at a huge cost to those companies and is a huge workload for the employees. It is something that needs to be done when it is discovered that you have a better option as it nearly always dramatically decreases the codebase complexity, helps standardize the tech we use in different situations, and often improves runtime efficiency

## The result

To move away from tech tribalism and towards a more pragmatic approach, teams should cultivate expertise across both compiled and interpreted languages. This diverse skill set allows for more flexible and optimal tool selection based on project requirements. It's crucial to create spaces for honest, data-driven discussions about tool choices, where the focus is on solving problems effectively rather than advocating for a particular language category or specific tool.

By prioritizing pragmatism over tribalism, we can ensure that we're always using the best tools for the job, leading to more efficient, maintainable, and innovative solutions in the long run. The key is to recognize that while compiled languages generally offer superior performance for backend tasks, no single language or framework is superior in all contexts. The best choice depends on the specific requirements of the project at hand, balancing factors like performance, development speed, maintainability, and ecosystem support.

## Looking forward

As technology continues to evolve at a rapid pace, maintaining an open mind and a willingness to adapt our tool choices based on empirical evidence and project needs will be crucial for success in the ever-changing landscape of software development. By moving beyond tribal loyalties and embracing a nuanced, data-driven approach to language and tool selection, we can build more efficient, scalable, and effective software systems.

## Takeaways

If you take nothing else away from this post, take these:
- No tool is one-size-fits-all (yes even Rust and Ruby)
- Always question whether there is a better tool for the job
- Try new things, run tests, dont take folks online at their word that something is true (That includes me as well). Do research!!! 
- Dont blog about Javascript like it stole your lunch money unless you are going to back it up

## References:
[1] Pereira, R., Couto, M., Ribeiro, F., Rua, R., Cunha, J., Fernandes, J. P., & Saraiva, J. (2021). Energy efficiency across programming languages: How do energy, time, and memory relate? Full paper available at: https://haslab.github.io/SAFER/scp21.pdf