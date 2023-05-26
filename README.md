# Web Interface Guidelines

This document outlines a non-exhaustive list of details that make a good (web) interface. It is a living document, periodically updated based on learnings. Some of these may be subjective, but most apply to all websites.

The [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/) spec is deliberately not duplicated in this document. However, some accessibility guidelines may be pointed out. Contributions are welcome. Edit [this file](https://github.com/raunofreiberg/interfaces/blob/main/README.md) and submit a pull request.

## Interactivity

- Clicking the input label should focus the input field
- Inputs should be wrapped with a `<form>` to submit by pressing Enter
- Inputs should have an appropriate `type` like `password`, `email`, etc
- Inputs should disable `spellcheck` and `autocomplete` attributes most of the time
- Inputs should leverage HTML form validation by using the `required` attribute when appropriate
- Input prefix and suffix decorations, such as icons, should be absolutely positioned on top of the text input with padding, not next to it, and trigger focus on the input
- Toggles should immediately take effect, not require confirmation
- Buttons should be disabled after submission to avoid duplicate network requests
- Interactive elements should disable `user-select` for inner content
- Decorative elements (glows, gradients) should disable `pointer-events` to not hijack events

## Typography

- Fonts should have `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` applied for better Legibility.

-
  <details>
    <summary>Font weights below 400 should not be used</summary>
    <blockquote>
    
    Font weights below 400 are generally not recommended due to their light appearance which can compromise readability, particularly at smaller sizes. 
    
    However in scenarios where larger font sizes are used, lighter font weights might be acceptable and can enhance aesthetic appeal or hierarchy. It's important to consider legibility and accessibility in different viewing scenarios when choosing font weights. You should always prioritize readability over style.
    </blockquote>
  </details>

-
  <details>
    <summary>
    Create responsive typography using the CSS clamp() function.
    </summary>
    <blockquote>

    The [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) function takes three arguments: a minimum value, a preferred value, and a maximum value, e.g. `clamp(48px, 5vw, 72px)` for the `font-size` of a heading.
    Using the clamp function ensures that the typography remains legible on smaller screens while not becoming overwhelmingly large on bigger screens. Using the view port unit for the preferred value ensures the typography scales seamlessly, compared to media queries where resizing the browser would create sudden layout shifts.
    </blockquote>
  </details>

-
  <details>
    <summary>
    Font weight should not change on hover or selected state to prevent layout shift.
    </summary>
    <blockquote>
    The exception for this rule are fonts width a uniwidth system or monospaced fonts where the character width stays the same across all font-widths. Uniwidth fonts are fonts where each variation (light, bold, italic) has the same size for each letter.
    </blockquote>
  </details>

-
  <details>
    <summary>Fonts should be Subset based on the Content, Alphabet or relevant Language(s) for faster page load.</summary>
    <blockquote>

  Pay careful attention to font subsetting in these instances:

  1. When your interface includes user-input fields that could contain localized content.

  2. When users might utilize the browser's built-in translation feature on your web interface.

  For example, if you've subset your font only to include the English alphabet and users translate your page to German, characters like "ä", "ö", "ü", and "ß" will appear in the fallback font.

  Avoid extreme subsetting as the few kilobytes saved might not compensate for a degraded reading experience.

  A more advanced technique involves initially loading a small font subset and then loading the remaining glyphs on a delay or when the characters appear in the interface. 

  **Optimized font subsetting using Javascript:**
  ```html
    <head>
      <!-- Load a small subset of the font initially, notice the "text" query paramter at the end which will only load the characters "Hello" -->
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap&text=Hello">

      <!-- Add this script tag to load the rest of the glyphs after the page has loaded -->
      <script>
          window.onload = function() {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap';
            document.head.appendChild(link);
          };
      </script>
    </head>
  ```

  **Optimized font subsetting using CSS:**
  ```css
  @font-face {
    font-family: 'MyFont';
    src: url('MyFontSubset.woff2') format('woff2'); /* Subset font file */
    unicode-range: U+20-7E; /* Range for basic ASCII */
  }

  /* The full MyFont.woff2 will only be downloaded if characters outside of the basic ASCII range are used. */
  @font-face {
    font-family: 'MyFont';
    src: url('MyFont.woff2') format('woff2'); /* Full font file */
    unicode-range: U+80-FFFF; /* Rest of the unicode range */
  }
  ```
  </blockquote>
  </details>

-
  <details>
    <summary>Use Old Style Figures for Inline Numbers for better legibility.
    </summary>  
    <blockquote>
    Old style figures, or lowercase numbers, have varying heights and alignments, much like lowercase letters. When you have numbers inline with text, like in a paragraph, old style figures can blend in more naturally and disrupt the flow of text less than lining figures, or uppercase numbers.
    </blockquote>
  </details>

-
  <details>
    <summary>Use Proportional Figures in Tables and Lists.
    </summary>  
    <blockquote>
    Unlike old style figures which have varying heights and are suitable for running text, proportional figures all have the same height, which makes them line up better in tables and lists.
    </blockquote>
  </details>

-
  <details>
    <summary>Letter Spacing should be adjusted proportional to Font Size.
    </summary>  
    <blockquote>

    Just as line height needs to increase with font size to maintain readability, letter-spacing needs to decrease with font size. Larger font sizes naturally have more space between letters, and adding too much letter-spacing can disrupt the reading flow. 

    Most font designers optimise spacing of their fonts for the font-size 16px/pt. Leave letter-spacing here at default 0. Small-Caps or All-Caps text should generally have more leter-spacing.

    On dark backgrounds (darkmode), white characters appear tighter. To increase legibility increase letter-spacing.

    When adjusting letter-spacing should always also adjust line-height, as the vertical whitespace influences the look of your horizontal whitespace.

    [Read more about letter spacing in web interfaces here](https://www.webdesignerdepot.com/2020/07/the-designers-guide-to-letter-spacing/).
    </blockquote>
  </details>

-
  <details>
    <summary>
    Use Hanging Quotes: When using blockquotes or pull quotes, try to position quotation marks outside the text block. This is known as hanging quotes, and it can improve the overall visual alignment and rhythm of your text blocks.
    </summary>
    <blockquote>
    Here’s an example for blockquotes.

    ```css
    blockquote {
      position: relative;
      font-size: 1em;
      quotes: "“" "”" "‘" "’"; /* Specifies which quotation marks to use. The first two values specifies the first level of quotation embedding, the next two values specifies the next level of quote embedding, etc. */
    }

    blockquote::before {
      content: open-quote;
      position: absolute;
      font-size: 2em;
      top: -0.25em;
      left: -0.5em; /* Adjust based on font-size */
      color: #BBB; /* make the quote mark lighter, since it’s larger */
    }
    ```
    </blockquote>
  </details>


-
  <details>
    <summary>
    Consider “Typographic Color”. Typographic color is not referring to the actual color of text, typographic color is the overall gray value of a block of text. Aim for a uniform typographic color by avoiding overuse of bold or italic styles, and be careful with the use of white space.
    </summary>
    <blockquote>
    Here are some techniques to evaluate typographic color:
    
    1. Distance Yourself: Stand back from your screen. This helps you view the overall layout without being distracted by the details of the text. Alternatively, you can zoom out on your screen to achieve a similar effect.
    
    2. Squint Your Eyes: Squinting your eyes slightly blurs your vision, making it easier to see the overall 'color' or tone of the page. This can help highlight inconsistencies in typographic color where certain sections may appear darker or lighter than others.

    3. Print it out. Seriously! Get a good laser printer, print out your interfaces, hang them on a wall and evaluate from various distances.

    4. Look for Inconsistencies: Areas that look darker can indicate that there's too much text, the font is too heavy, or there's not enough line spacing. Conversely, areas that look too light might have too much white space, a font that's too light, or too much line spacing.

    5. Evaluate the Grayscale: If the design has colored text, converting the page to grayscale can also help evaluate the overall typographic color. Differences in color can sometimes deceive your eye, but evaluating in grayscale can give a better sense of the true contrast.
    </blockquote>
  </details>

-
  <details>
    <summary>
    Ensure sufficient contrast, but avoid stark one. Text should have sufficient contrast against its background to ensure it's readable by all users. 
    </summary>
    <blockquote>
    
    Stark contrast, such as `#000000` text on a `#FFFFFF` background, can be harsh on the eyes. Use Off-Black and Off-White Colors. If your interface is cold, use a slightly bluish off-black/ off-white. If your interface uses warm colors, use a slightly redish off-black/ off-white.
    </blockquote>
  </details>

-
  <details>
    <summary>
    Maintain a consistent vertical rhythm—the spacing and arrangement of text as the user scrolls down the page. This can be achieved with a baseline grid, ensuring the bottoms of your lines of text align across columns and containers.
    </summary>
    <blockquote>
  The below CSS creates a red line every 24px down the page. The pointer-events: none line is important because it makes the overlay non-interactive, so it won't interfere with any clickable elements on your page. In any modern framework you can conditionally add this style definition by checking if the mode is "dev" or not "production".

  ```css
  body::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 0, 0, 0),
      rgba(255, 0, 0, 0) 23px,
      rgba(255, 0, 0, 0.1) 24px
    );
  }
  ```
    </blockquote>
  </details>

-
  <details>
    <summary>
    Avoid Widows and Orphans
    </summary>
    <blockquote>

    A widow is a short line or single word at the end of a paragraph, and an orphan is a word or short line at the beginning or end of a column that is separated from the rest of the paragraph. Both can disrupt the reader's eye flow and should be avoided. Widow's are much more common, you can avoid them by replacing the last whitespace in every paragraph with a non-breaking whitespaces `&nbsp;` (if the two last words are shorter than 2/3 of the max line length e.g. 75 characters).

    </blockquote>
  </details>

-
  <details>
  <summary>Aim for an optimal line length of between 45-75 characters, including spaces, for better readability.
  </summary>
  <blockquote>

  **Balance text lines** [learn more](https://developer.chrome.com/blog/css-text-wrap-balance/)
  ```css
  text-wrap: balance
  ```

  **Use CSS characters to adjust line length**
  ```css
  /* Using the "ex" unit */ 
  p {
    max-width: 75ex; /* equal to the used x-height of the font*/
  }
  /* Using the "ch" unit */ 
  p {
    max-width: 75ch; /* ch: This unit represents the width of the glyph '0' (zero) of the element's font. Suitable for numeric interfaces */
  }
  /* Using the "lh" unit */ 
  p {
    line-height: 1.2; /* set line height */
    max-width: calc(1.2 * 0.5 * 75lh); /* lh: The 'lh' CSS unit represents the computed value of the 'line-height' property on the element on which it is used.
    Here we're assuming the average character width is half the line-height.
  */
  }

  ```
  </blockquote>
  </details>
  

## Motion

- Switching themes should not trigger transitions and animations on elements [^1]
- Animation duration should not be more than 200ms for interactions to feel immediate
- Animation values should be proportional to the trigger size:
  - Don't animate dialog scale in from 0 → 1, fade opacity and scale from ~0.8
  - Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so
- Actions that are frequent and low in novelty should avoid extraneous animations: [^2]
  - Opening a right click menu
  - Deleting or adding items from a list
  - Hovering trivial buttons
- Looping animations should pause when not visible on the screen to offload CPU and GPU usage

## Touch

- Hover states should not be visible on touch press, use `@media (hover: hover)` [^3]
- Font size for inputs should not be smaller than 16px to prevent iOS zooming on focus
- Inputs should not auto focus on touch devices as it will open the keyboard and cover the screen
- Apply `muted` and `playsinline` to `<video />` tags to auto play on iOS
- Disable `touch-action` for custom components that implement pan and zoom gestures to prevent interference from native behavior like zooming and scrolling

## Optimizations

- Large `blur()` values for `filter` and `backdrop-filter` may be slow
- Scaling and blurring filled rectangles will cause banding, use radial gradients instead
- Sparingly enable GPU rendering with `transform: translateZ(0)` for unperformant animations
- Toggle `will-change` on unperformant scroll animations for the duration of the animation [^4]
- Auto-playing too many videos on iOS will choke the device, pause or even unmount off-screen videos
- Bypass React's render lifecycle with refs for real-time values that can commit to the DOM directly [^5]
- [Detect and adapt](https://github.com/GoogleChromeLabs/react-adaptive-hooks) to the hardware and network capabilities of the user's device

## Accessibility

- Disabled buttons should not have tooltips, they are not accessible [^6]
- Box shadow should be used for focus rings, not outline which won’t respect radius [^7]
- Focusable elements in a sequential list should be navigable with <kbd>↑</kbd> <kbd>↓</kbd>
- Focusable elements in a sequential list should be deletable with <kbd>⌘</kbd> <kbd>Backspace</kbd>
- To open immediately on press, dropdown menus should trigger on `mousedown`, not `click`
- Use a svg favicon with a style tag that adheres to the system theme based on `prefers-color-scheme`
- Icon only interactive elements should define an explicit `aria-label`
- Tooltips triggered by hover should not contain interactive content
- Images should always be rendered with `<img>` for screen readers and ease of copying from the right click menu
- Illustrations built with HTML should have an explicit `aria-label` instead of announcing the raw DOM tree to people using screen readers
- Gradient text should unset the gradient on `::selection` state

## Design

- Optimistically update data locally and roll back on server error with feedback
- Authentication redirects should happen on the server before the client loads to avoid janky URL changes
- Style the document selection state with `::selection`
- Display feedback relative to its trigger:
  - Show a temporary inline checkmark on a successful copy, not a notification
  - Highlight the relevant input(s) on form error(s)
- Empty states should prompt to create a new item, with optional templates

[^1]: Switching between dark mode or light mode will trigger transitions on elements that are meant for explicit interactions like hover. We can [disable transitions temporarily](https://paco.me/writing/disable-theme-transitions) to prevent this. For Next.js, use [next-themes](https://github.com/pacocoursey/next-themes) which prevents transitions out of the box.
[^2]: This is a matter of taste but some interactions just feel better with no motion. For example, the native macOS right click menu only animates out, not in, due to the frequent usage of it.
[^3]: Most touch devices on press will temporarily flash the hover state, unless explicitly only defined for pointer devices with [`@media (hover: hover)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover).
[^4]: Use [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) as a last resort to improve performance. Pre-emptively throwing it on elements for better performance may have the opposite effect.
[^5]: This might be controversial but sometimes it can be beneficial to manipulate the DOM directly. For example, instead of relying on React re-rendering on every wheel event, we can track the delta in a ref and update relevant elements directly in the callback.
[^6]: Disabled buttons do not appear in tab order in the DOM so the tooltip will never be announced for keyboard users and they won't know why the button is disabled.
[^7]: As of 2023, Safari will not take the border radius of an element into account when defining custom outline styles. [Safari 16.4](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes) has added support for `outline` following the curve of border radius. However, keep in mind that not everyone updates their OS immediately.
