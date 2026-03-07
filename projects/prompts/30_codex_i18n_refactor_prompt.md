# Codex Task: Refactor i18n and Add Consumer Example

You are working in an existing Node.js repository.

## Task

Refactor the current internationalization setup in `src/app` and add a
consumer-style example implementation.

## Context

The widget already exists and already has i18n support for English and
Dutch. However, the current i18n setup needs improvement in three ways:

1.  Text is still too app-internal. It should become possible for a
    consuming application to externalize and override text if needed.
2.  The translation structure is currently grouped by language, for
    example:
    -   `en: { ... }`
    -   `nl: { ... }` This should be inverted so translations are
        grouped by text item/key first, with language values nested
        under each item.
3.  We need a dedicated example consumer setup that shows how an
    external site would import and use the widget, including custom i18n
    text overrides.

This is an incremental refactor of the current implementation, not a
rewrite.

## Important design goals

-   Keep all technical code, architecture, comments, class names, file
    names, and implementation details in English
-   Keep the widget implementation lightweight
-   Keep the directory structure flat where possible
-   Do not introduce unnecessary abstractions or third-party i18n
    libraries
-   Make the app easier to consume externally

## Repository convention

Keep the existing Productbuilder-style structure in `src/app`. Do not
introduce nested directories unless clearly justified.

Current structure already includes:

    src/app/
    - index.html
    - index.js
    - app.js
    - config.js
    - components/
    - css/
    - js/
    - img/

## New requirement

Add an example consumer setup in a separate flat directory, for example:

    src/example/

or another similarly simple flat directory name if that fits the repo
better.

Do not create deeply nested example structures.

------------------------------------------------------------------------

# Main refactor goals

## 1. Externalizable text configuration

Refactor the widget so that user-facing text is no longer only an
internal app concern.

The widget should support text definitions from an external source in a
consumer-friendly way.

Desired outcome:

-   the widget has a default internal translation set
-   a consumer can provide custom text overrides
-   the widget merges external text overrides with internal defaults
-   fallback behavior remains safe and predictable

You may choose a practical API for this, but prefer something simple and
realistic for embeddable widget consumption.

Examples of acceptable consumer usage:

``` javascript
const widget = document.querySelector("iotm-participation-widget");
widget.translations = customTranslations;
```

or

``` javascript
window.IOTM_PARTICIPATION_WIDGET_CONFIG = {
  translations: customTranslations
};
```

Avoid unrealistic or over-complicated APIs.

------------------------------------------------------------------------

## 2. Translation structure refactor

Change the translation structure from language-first to key-first.

### Current undesired shape

``` javascript
{
  en: {
    buttons: { next: "Next" }
  },
  nl: {
    buttons: { next: "Volgende" }
  }
}
```

### Desired shape

``` javascript
{
  buttons: {
    next: {
      en: "Next",
      nl: "Volgende"
    }
  }
}
```

Or an equivalent key-first structure that keeps related language values
together per text item.

Requirements:

-   group translations by semantic item/key first
-   place `en` and `nl` together under each item
-   keep it readable and maintainable
-   make it easier to compare/edit both language values for one item
-   keep lookup practical and not overly complex

------------------------------------------------------------------------

## 3. Consumer-style example implementation

Create a separate example setup that demonstrates how a consuming site
would actually use the widget.

The example should include:

-   an `index.html`
-   an i18n/messages file or config file showing how a consumer can
    override text
-   importing the widget
-   rendering the widget as a consumer would
-   passing or applying custom translations in a realistic way
-   showing locale selection
-   making it obvious how the widget can be embedded on a third-party
    site

Example scenarios:

-   English widget using defaults
-   Dutch widget using defaults
-   English or Dutch widget with custom override such as:
    -   custom title
    -   custom intro text
    -   custom button label
    -   custom consent explanation

------------------------------------------------------------------------

# Implementation expectations

### A. Refactor translation source

-   Introduce or refactor the translation source into a dedicated file
-   Convert existing English/Dutch text into the new key-first structure
-   Ensure all user-facing widget text still comes from the translation
    system

### B. Add translation resolution utilities

Implement a simple i18n utility layer that can:

-   resolve active language from locale
-   look up a translation by key
-   support fallback to English
-   merge default messages with consumer overrides
-   safely handle partial overrides

### C. Consumer override support

Requirements:

-   consumer can define only a subset of translations
-   widget merges overrides into defaults
-   untranslated keys still fall back correctly

### D. Example directory

Suggested structure:

    src/example/
    - index.html
    - index.js
    - i18n.js

Keep this structure flat and simple.

### E. Accessibility

Ensure translated or overridden text is used in:

-   labels
-   validation messages
-   aria-labels
-   modal labels
-   status text
-   empty states
-   error messages
-   confirmation text

------------------------------------------------------------------------

# Locale behavior

Retain and verify locale behavior:

-   locales starting with `en` → English
-   locales starting with `nl` → Dutch
-   unknown locale → English fallback

------------------------------------------------------------------------

# Success criteria

The task is successful if:

1.  The translation structure is key-first with language nested per item
2.  The widget has internal defaults plus external override support
3.  A consumer can override only selected text entries
4.  English and Dutch still both work fully
5.  Fallback behavior is safe
6.  All visible widget text uses the translation system
7.  There is a separate consumer-style example directory
8.  The implementation remains simple and maintainable

------------------------------------------------------------------------

# Deliverables

After implementation provide:

-   list of files changed
-   chosen override API
-   how fallback behavior works
-   how consumers should use the example implementation
