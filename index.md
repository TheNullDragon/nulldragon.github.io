---
layout: default
title: Home
---

# Welcome

Welcome to my vulnerability research blog.

This website focuses on:

- Reverse Engineering
- Binary Exploitation
- CVE Research
- Malware Analysis
- Fuzzing
- Windows Internals
- Linux Security

---

## Latest Posts

{% for post in site.posts %}

### [{{ post.title }}]({{ post.url }})

{{ post.excerpt }}

{% endfor %}
