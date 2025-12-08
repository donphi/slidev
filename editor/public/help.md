# Sli.dev Editor - Help Guide

Welcome to the Sli.dev Presentation Editor! This guide will help you create beautiful presentations using Markdown and CSS.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding the Editor](#understanding-the-editor)
3. [Writing Slides in Markdown](#writing-slides-in-markdown)
4. [Slide Separators (CRITICAL!)](#slide-separators-critical)
5. [Frontmatter Configuration](#frontmatter-configuration)
6. [Adding & Reducing Space](#adding--reducing-space)
7. [Tables](#tables)
8. [CSS Theme Customization](#css-theme-customization)
9. [Utility Classes](#utility-classes)
10. [Keyboard Shortcuts](#keyboard-shortcuts)
11. [Exporting to PDF](#exporting-to-pdf)

---

## Quick Start

**5-minute workflow:**

1. Select or create a presentation
2. Write your slides using `#` for titles and `---` between slides
3. Press **Ctrl+S** to save
4. Click **"Open Slides"** to preview
5. Click **"Export PDF"** when done

---

## Understanding the Editor

### The Three Panels

| Panel | What It Does |
|-------|--------------|
| **Left (Markdown)** | Write your slide content here |
| **Middle (CSS)** | Customize colors, fonts, spacing |
| **Right (Controls)** | Buttons to view and export your presentation |

### The Workflow

```
Edit Markdown → Save (Ctrl+S) → View in Slidev tab → Repeat
```

Changes are saved to the database and applied instantly to your Slidev preview.

---

## Writing Slides in Markdown

Markdown is a simple text format. Here's what you need to know:

### Headings

```markdown
# Main Title
Use this for slide titles (largest, gray by default)

## Section Heading  
Use this within slides (blue, prominent)

### Sub-heading
Use for smaller labels (dark, compact)
```

### Text Formatting

```markdown
**Bold text** makes text bold
*Italic text* makes text italic
~~Strikethrough~~ crosses out text
`inline code` shows code-style text
```

### Bullet Points

```markdown
- First point
- Second point
  - Nested point (indent with 2 spaces)
- Third point
```

### Numbered Lists

```markdown
1. First step
2. Second step
3. Third step
```

### Links

```markdown
[Click here](https://example.com)
```

---

## Slide Separators (CRITICAL!)

> ⚠️ **THIS IS THE MOST IMPORTANT CONCEPT!**
>
> If your slides don't work, 99% of the time it's because of incorrect separators.

Each slide is separated by three dashes **on their own line**:

```markdown
---
```

### Example: A Two-Slide Presentation

```markdown
---
title: My Presentation
---

# Welcome

This is slide 1.

---

# Second Slide

This is slide 2.

---

# Third Slide

And so on...
```

### ❌ Common Mistakes

**Wrong** - No blank lines around separator:
```markdown
Some content---More content
```

**Wrong** - Spaces before dashes:
```markdown
   ---
```

### ✅ Correct Format

```markdown
Some content on slide 1.

---

Content on slide 2.
```

**Rules:**
- Three dashes exactly: `---`
- On its own line
- Blank line before AND after (recommended)

---

## Frontmatter Configuration

The **first block** between `---` markers is special configuration (YAML format):

```yaml
---
theme: default
layout: intro
background: /img/background.png
title: My Presentation
class: dense text-sm
---
```

### Common Options

| Option | What It Does | Example Values |
|--------|--------------|----------------|
| `layout` | Slide template | `intro`, `default`, `cover`, `center` |
| `background` | Background image | `/img/background.png` |
| `title` | Presentation title | `Quarterly Report` |
| `class` | CSS classes for slide | `dense`, `text-sm`, `pull-sm` |

### Per-Slide Frontmatter

You can also configure individual slides:

```markdown
---
layout: cover
background: /img/special-bg.png
class: text-sm dense
---

# This Slide Has Its Own Settings

Custom layout and background just for this slide.
```

---

## Adding & Reducing Space

Your CSS theme provides precise control over vertical spacing.

### Adding Space (Push Content Apart)

| Method | Code | Effect |
|--------|------|--------|
| Line break | `<br>` | Adds small gap (default 4px) |
| Spacer div | `<div class="spacer"></div>` | Same as `<br>` |
| Multiple breaks | `<br><br><br>` | Stack for larger gaps |
| Custom height | `<div style="height: 20px"></div>` | Exact pixel height |

**Example:**
```markdown
# Title

<br>

Some content with extra space above.

<div class="spacer"></div>
<div class="spacer"></div>

More space above this line.
```

### Reducing Space (Pull Content Closer)

| Method | Code | Effect |
|--------|------|--------|
| Gap element | `<gap></gap>` | Pulls up (default -8px) |
| Pull class | `<div class="pull-sm">...</div>` | Pulls content up 8px |

**Pull Classes Available:**

| Class | Margin | Use For |
|-------|--------|---------|
| `pull-xs` | -4px | Tiny adjustment |
| `pull-sm` | -8px | Small adjustment |
| `pull-md` | -16px | Medium pull |
| `pull-lg` | -24px | Large pull |
| `pull-xl` | -32px | Maximum pull |

**Example - Reducing space after a heading:**
```markdown
# Title

<div class="pull-sm">

This content is pulled closer to the title.

</div>
```

**Example - Using gap elements:**
```markdown
## Heading

<gap></gap>
<gap></gap>

Content pulled up closer to the heading.
```

### Slide-Level Pull (in Frontmatter)

```yaml
---
class: pull-sm
---

# This Entire Slide Is Pulled Up
```

---

## Tables

Tables are created with pipes `|` and dashes `-`.

### Basic Table

```markdown
| Name | Role | Years |
|------|------|-------|
| Alice | CEO | 10 |
| Bob | CTO | 8 |
| Carol | CFO | 5 |
```

**Result:**

| Name | Role | Years |
|------|------|-------|
| Alice | CEO | 10 |
| Bob | CTO | 8 |
| Carol | CFO | 5 |

### Column Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |
```

- `:---` = Left align
- `:---:` = Center align
- `---:` = Right align

### Condensed Tables (For Large Data)

When you have lots of data, wrap your table in a size class:

```markdown
<div class="table-xs">

| Lots | Of | Columns | Here |
|------|----|---------|----- |
| data | data | data | data |
| data | data | data | data |

</div>
```

**Table Size Classes:**

| Class | Font Size | Padding | Best For |
|-------|-----------|---------|----------|
| `table-xs` | 0.5em | Very tight | Maximum data density |
| `table-sm` | 0.55em | Tight | Compact but readable |
| `table-md` | 0.6em | Normal | Slightly condensed |

### 💡 Pro Tip: AI-Generated Tables

Have data in Excel or CSV? Ask ChatGPT or Claude:

> "Convert this to a Markdown table:
> Name, Age, City
> John, 25, London
> Jane, 30, Paris"

Then paste the result directly into your slide!

---

## CSS Theme Customization

The middle panel shows your CSS theme. Here's what you can customize:

### Typography Variables

```css
:root {
  /* Main font for all text */
  --slidev-font-family: 'Nunito Sans', sans-serif;
  
  /* Code/monospace font */
  --slidev-code-font-family: 'Fira Code', monospace;
  
  /* Base font size (all rem values calculated from this) */
  --slidev-font-size-base: 18px;
  
  /* Paragraph text size */
  --slidev-font-size-p: 1.1rem;
}
```

### Color Variables

```css
:root {
  /* Primary accent (links, highlights, H2) */
  --slidev-theme-primary: #5d8392;
  
  /* Secondary accent */
  --slidev-theme-secondary: #42b883;
  
  /* Main body text */
  --slidev-text-color: #333;
  
  /* Table borders */
  --slidev-table-border-color: #ddd;
}
```

### Slide Padding (Content Safe Area)

```css
:root {
  --slide-padding-top: 2rem;
  --slide-padding-right: 4.1rem;
  --slide-padding-bottom: 2rem;
  --slide-padding-left: 4.1rem;
}
```

```
┌─────────────────────────────────────────────────────┐
│ ← padding-left          padding-right →            │
│     ┌─────────────────────────────────────┐        │
│  ↑  │                                     │   ↑    │
│ top │         YOUR CONTENT AREA           │  top   │
│  ↓  │                                     │   ↓    │
│     └─────────────────────────────────────┘        │
│ ← padding-left       padding-bottom →              │
└─────────────────────────────────────────────────────┘
```

### Heading Variables

**H1 (Main Titles):**
```css
:root {
  --h1-font-size: 2.5rem;
  --h1-color: #696d72;
  --h1-margin-top: 0.5rem;
  --h1-margin-bottom: 0;
  --h1-line-height: 1.2;
  --h1-font-weight: 700;
}
```

**H2 (Section Headings):**
```css
:root {
  --h2-font-size: 1.4rem;
  --h2-color: #5d8392;
  --h2-margin-top: 0.5em;
  --h2-margin-bottom: 0.5em;
  --h2-line-height: 1.3;
  --h2-font-weight: 700;
}
```

**H3 (Sub-headings):**
```css
:root {
  --h3-font-size: 1rem;
  --h3-color: #2d4047;
  --h3-margin-top: 0.1em;
  --h3-margin-bottom: 0.2em;
  --h3-font-weight: 700;
}
```

### Spacing Variables

```css
:root {
  /* Height of <br> and .spacer (POSITIVE = adds space) */
  --br-height: 4px;
  
  /* Height of <gap> element (NEGATIVE = reduces space) */
  --gap-height: -8px;
}
```

### Table Variables

```css
:root {
  --table-line-height: 1.1;
  --table-font-size: 0.6em;
  --table-cell-padding: 0.4rem;
}
```

### List Variables

```css
:root {
  --list-item-spacing: 0.5rem;
  --list-line-height: 1.5;
  --list-font-size: 1em;
}
```

### Confidential Label (Top-Right Watermark)

```css
:root {
  --confidential-top: 1.6rem;
  --confidential-bottom: auto;
  --confidential-left: auto;
  --confidential-right: 4.2rem;
  --confidential-font-size: 0.5rem;
  --confidential-color: #441313;
}
```

### Page Numbers (Bottom-Left)

```css
:root {
  --page-number-top: auto;
  --page-number-bottom: 1.6rem;
  --page-number-left: 4.2rem;
  --page-number-right: auto;
  --page-number-font-size: 0.4rem;
  --page-number-color: #666;
}
```

---

## Utility Classes

These pre-built classes can be added via frontmatter or directly in your markdown.

### List Density Classes

Use in frontmatter: `class: dense`

| Class | Spacing | Best For |
|-------|---------|----------|
| `dense` | 0.15rem | Maximum bullet density |
| `tight` | 0.25rem | Tight spacing |
| `compact` | 0.35rem | Slightly reduced spacing |

**Example:**
```yaml
---
class: dense
---

# Slide With Dense Bullets

- Point 1
- Point 2
- Point 3
- Point 4
- Point 5
```

### Font Size Classes

Use in frontmatter: `class: text-sm`

| Class | Size | Best For |
|-------|------|----------|
| `text-xs` | 0.75rem (12px) | Very small text |
| `text-sm` | 0.875rem (14px) | Compact slides |
| `text-base` | 1rem (16px) | Normal text |
| `text-lg` | 1.125rem (18px) | Larger text |

**Example - Combining classes:**
```yaml
---
class: text-sm dense pull-sm
---

# Compact Slide

Smaller text, tight bullets, pulled up slightly.
```

### Layout Classes

| Class | Effect |
|-------|--------|
| `layout-top-left` | Align content to top-left |
| `layout-center` | Center content both ways |
| `chart-container` | Container for charts (400px height, centered) |

---

## Keyboard Shortcuts

### In the Editor

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save presentation |
| `Escape` | Close any open modal |

### In the Presentation

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `o` | Overview mode (see all slides) |
| `f` | Toggle fullscreen |
| `d` | Toggle dark mode |
| `g` | Go to specific slide |

---

## Exporting to PDF / PPTX / PNG

### Method 1: Browser Export (Recommended)

1. Click **"Export"** button in the editor header
2. A new tab opens with Slidev's export interface
3. Choose your format: **PDF**, **PPTX**, or **PNG images**
4. Click **Download**

### Method 2: Print to PDF

1. Open your presentation in a new tab
2. Press `Ctrl/Cmd + P`
3. Select "Save as PDF" as the destination
4. Adjust margins/scale if needed
5. Save

---

## Images and Backgrounds

### Adding Images

```markdown
![Description](/img/my-image.png)
```

### Background Images (Per-Slide)

```yaml
---
background: /img/special-background.png
---
```

### HTML Image with Size Control

```html
<img src="/img/logo.png" width="200" />
```

### Background for All Slides

In your CSS theme:
```css
.slidev-layout:not(.intro) {
  background-image: url('/img/footer.png');
  background-size: cover;
}
```

---

## Scoped Styles (Per-Slide CSS)

Need custom CSS for just one slide? Use `<style scoped>`:

```markdown
---

# Custom Styled Slide

<style scoped>
h1 { color: red; }
p { font-size: 0.8em; }
</style>

This slide has a red title and smaller paragraphs.
```

---

## Custom Boxes and Callouts

Use HTML for special formatting:

### Info Box

```html
<div class="mt-8 p-4 bg-gray-100 rounded border-l-4 border-blue-500">
  <strong>Note:</strong> Important information here.
</div>
```

### Warning Box

```html
<div class="mt-4 p-4 bg-yellow-50 rounded border-l-4 border-yellow-500">
  <strong>Warning:</strong> Be careful about this.
</div>
```

---

## Troubleshooting

### "My slides aren't separating correctly"

✅ Check your `---` separators:
- Must be exactly three dashes
- Must be on their own line
- Add blank lines before and after

### "Styles aren't applying"

✅ After editing CSS, press **Save Theme** to save changes
✅ Refresh your Slidev preview tab

### "Table is too big for the slide"

✅ Wrap it in `<div class="table-xs">...</div>`
✅ Or use `class: text-sm` in frontmatter

### "Too much space between elements"

✅ Use `<gap></gap>` or `<div class="pull-sm">...</div>`
✅ Or use `class: dense` for bullet lists

### "Not enough space between elements"

✅ Use `<br>` or `<div class="spacer"></div>`
✅ Stack multiple for more space: `<br><br><br>`

---

## Need More Help?

- 📚 **Slidev Documentation**: [sli.dev](https://sli.dev)
- 💬 **Ask AI**: Copy your question and ask ChatGPT or Claude
- 🔍 **Look at your CSS**: The middle panel shows all available variables with comments

---

*Happy presenting! 🎉*
