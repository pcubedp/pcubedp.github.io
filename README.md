# Parth Patel — Personal Blog

Personal portfolio and blog. Built with Jekyll, hosted on GitHub Pages.

**Live:** https://pcubedp.github.io

---

## Adding a blog post

Create a file in `_posts/` named `YYYY-MM-DD-post-title.md`:

```yaml
---
title: "Your Post Title"
date: 2026-04-01
tags: [compilers]        # one tag: compilers, systems, PL theory, reading, misc
layout: post
---

Write your post in Markdown here.
```

Push and it appears automatically.

## Adding / editing projects

Edit `_data/projects.yml` — no HTML needed:

```yaml
- name: your-project
  lang: Rust
  desc: One or two sentences about what it does.
  tag: compilers
  url: https://github.com/pcubedp/your-project
```

## Updating personal info

Edit `_config.yml` — name, email, github handle.

## Local dev

```bash
eval "$(ssh-agent -s)" && ssh-add ~/.ssh/archlinux
bundle install
bundle exec jekyll serve
```

Site runs at http://localhost:4000

## Deploy

```bash
git add .
git commit -m "your message"
git push
```

GitHub Pages rebuilds automatically. Live in ~60 seconds.
