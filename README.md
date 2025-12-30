# Sachin — Dev Blog

> Engineering notes, systems, and real-world code.

Personal engineering blog built with Next.js, MDX, and Tailwind CSS. Use this repository to track notes on software engineering, distributed systems, and learnings from building real-world applications.

## Features

- **MDX Support**: Write content in Markdown component support.
- **Syntax Highlighting**: Code blocks highlighted using [Shiki](https://shiki.style/).
- **Dark Mode**: Built-in dark mode support (default) using `next-themes`.
- **RSS Feed**: Automatic RSS feed generation.
- **Performance**: Optimized with Next.js App Router and React Server Components.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: MDX (`next-mdx-remote`, `gray-matter`)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components (ThemeToggle, Tag, etc.).
- `content/blog/`: MDX files for blog posts.
- `lib/`: Utility functions and constants.
- `public/`: Static assets.

## content

To add a new blog post, create a `.mdx` file in `content/blog/` with the following frontmatter:

```yaml
---
title: "Post Title"
date: "2024-03-20"
description: "Brief description of the post."
tags: ["react", "nextjs"]
---
```

## License

MIT © [Sachin Pasi](https://sachinpasi.com)
