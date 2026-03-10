---
layout: post
title: "Writing a toy compiler front-end in Rust"
category: compilers
date: 2026-03-01
excerpt: "Notes on implementing a lexer and recursive descent parser from scratch — what tripped me up and what clicked."
---

I've been working through compiler theory and decided the best way to understand it was to build one. This covers the front-end: lexing and parsing a small expression language.

## The language

Integer arithmetic, let bindings, functions — just enough to make parsing interesting.

```
let x = 5 + 3 * 2 in x * x
```

## Lexing

Hand-rolled state machine. I tried regex-based first but found it harder to reason about errors. Manual makes token boundaries explicit.

```rust
enum Token {
    Int(i64),
    Ident(String),
    Plus, Star, Let, In, Eq,
}
```

## Parsing

Recursive descent. Operator precedence took a few tries — I kept making it left-recursive accidentally. Pratt parsing is probably cleaner but I wanted to understand the naive version first.
