---
title: "Writing a toy compiler front-end in Rust"
date: 2026-03-01
tags: [compilers]
layout: post
---

I've been working through compiler theory and decided the best way to understand it was to build one. This covers the front-end: lexing and parsing a small expression language.

## The language

Nothing fancy — integer arithmetic, let bindings, and functions. Just enough to make the parsing interesting.

```
let x = 5 + 3 * 2 in x * x
```

## Lexing

Hand-rolled state machine. I tried a regex-based approach first but found it harder to reason about error recovery. The manual approach makes token boundaries explicit.

```rust
enum Token {
    Int(i64),
    Ident(String),
    Plus, Star, Let, In, Eq,
}
```

## Parsing

Recursive descent. Operator precedence took a few tries to get right — I kept accidentally making it left-recursive. Pratt parsing is probably the cleaner solution but I wanted to understand the naive version first.
