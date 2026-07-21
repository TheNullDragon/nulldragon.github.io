---
title: "Setting Up a Fuzzing Environment with AFL++"
date: 2025-04-20
categories: [Fuzzing]
icon: terminal
excerpt: >-
  Step-by-step guide to setting up AFL++ on Linux and writing your
  first fuzzing harness.
---

AFL++ is a maintained, feature-rich fork of the original American
Fuzzy Lop. This post covers getting it installed and running your
first fuzz target on Linux.

## Installing AFL++

```bash
sudo apt-get update
sudo apt-get install -y build-essential python3-dev git
git clone https://github.com/AFLplusplus/AFLplusplus
cd AFLplusplus
make distrib
sudo make install
```

## Instrumenting Your Target

AFL++ ships compiler wrappers that instrument code at build time:

```bash
CC=afl-cc CXX=afl-c++ ./configure
make
```

## Writing a Harness

If your target isn't a standalone binary that reads from stdin, a
small harness is usually the cleanest path — a thin wrapper that
feeds a file's contents into the function you actually want to fuzz.

```c
int main(int argc, char **argv) {
    if (argc < 2) return 1;
    FILE *f = fopen(argv[1], "rb");
    // ... read into a buffer and call target_function(buf, len)
    return 0;
}
```

## Running the Fuzzer

```bash
afl-fuzz -i seeds/ -o findings/ -- ./harness @@
```

Seed your `seeds/` directory with a handful of small, valid inputs —
fuzzers work far better starting from something the target already
understands than from nothing at all.

## What's Next

Once you have a stable fuzzing loop running, the next step is
triaging crashes and minimizing test cases — topics for a future
post.
