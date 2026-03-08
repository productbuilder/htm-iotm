# Timemap Contributor

Timemap Contributor is a Web Component for collecting community contributions for a Timemap project. It supports media uploads plus metadata, contact details, and consent in a single embeddable flow.

## What it is

- Web Component (`timemap-contributor`)
- embeddable in any website
- framework-agnostic
- supports media uploads
- supports metadata, consent and contact information
- customizable via HTML attributes and CSS

## Basic Usage

```html
<script type="module" src="/src/app/index.js"></script>

<timemap-contributor
  api-base-url="https://example-api.org"
  project-id="heritage-project"
  locale="en">
</timemap-contributor>
```

The widget renders itself inside the `timemap-contributor` element.

## Demo

A consumer-style demo is available at `/demo/index.html`.

Open this page to see how a host application can embed the widget in a realistic integration.

## Documentation

Usage documentation is available at `/docs/index.html`.

It covers attributes, configuration, styling, and integration patterns.

## Repository Structure

```text
src/app/     -> widget implementation
demo/        -> example consumer integration
docs/        -> usage documentation
index.html   -> simple landing page
```

## Styling

- The widget uses Shadow DOM.
- Styling can be customized with CSS custom properties.
- Exposed parts can be targeted with `::part()`.

## Development

This repository contains a standalone Web Component with no framework dependencies.

You can open `demo/index.html` locally for integration testing, or import the component into your own project.

## License

TBD
