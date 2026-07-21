---
title: "Heap Feng Shui: An Introduction"
date: 2025-05-18
categories: [Binary Exploitation]
icon: skull
excerpt: >-
  A beginner-friendly introduction to heap manipulation techniques,
  memory layout, and how attackers gain control.
---

Heap feng shui is the practice of deliberately arranging heap memory
so that a bug — a use-after-free, an overflow, a double-free — lands
you exactly where you want to be. This post walks through the basic
building blocks.

## Why Layout Matters

Modern heap allocators (ptmalloc, tcmalloc, jemalloc) all reuse freed
chunks. If an attacker can predict *which* chunk gets reused next,
a memory-safety bug that looks unexploitable on paper can become a
reliable primitive.

```c
void *a = malloc(0x68);
free(a);
void *b = malloc(0x68); // often == a
```

## Common Techniques

- **Chunk grooming** — allocating and freeing objects in a specific
  order to shape the free list before triggering the bug.
- **Tcache poisoning** — corrupting a freed chunk's forward pointer
  so the allocator hands back an attacker-chosen address.
- **House of \* techniques** — a family of well-known glibc heap
  exploitation primitives, each abusing a different allocator
  invariant.

## A Minimal Example

Given a use-after-free where a freed object is still referenced
elsewhere, grooming the heap so the next same-size allocation lands
in that freed slot lets you overwrite fields the program still
trusts — function pointers, size fields, or vtable pointers, for
example.

## Next Steps

Future posts in this series will cover tcache poisoning in more
depth, and how heap protections like safe-linking change (but don't
eliminate) these attacks.
