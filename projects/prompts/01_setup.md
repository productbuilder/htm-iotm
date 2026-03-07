You are working in an existing Node.js repository.

Task:
Implement in `src/app` a first working MVP of an embeddable web component for the “Timemap Uploader / IOTM Participation Widget”, based on the requirements below and the project conventions.

Important repository convention:
Use the frontend structure we always use at Productbuilder inside `src/app`. Keep the structure flat and do not create nested directories unless absolutely necessary. Use this structure:

src/app/
- index.html
- index.js
- app.js
- config.js
- components/
- css/
- js/
- img/

And inside those directories:
- `css/index.css`
- JS scripts/classes in `js/`
- subcomponents in `components/`
- no extra nested folders inside `components`, `css`, `js`, or `img`

If you believe extra directories are truly necessary, mention that first in your output as a proposal, but do not create them unless needed.

App goal:
Build a framework-agnostic, embeddable widget as a custom element that allows users to submit heritage-related contributions:
- photos
- videos
- audio recordings
- description / metadata
- contact details
- rights / consent information

Technical foundations:
- Use Web Components
- Use Shadow DOM
- Use a custom element as the main app shell
- Framework-agnostic
- Must work in plain HTML and in other frontend environments
- REST API integration via fetch
- Attributes should reflect to properties where relevant
- Styling via CSS custom properties and `::part`
- Responsive behavior inside the parent container
- All component UI text must be in English
- Include accessibility considerations
- Build an MVP: simple, clean, and maintainable

Main component name:
Use this custom element:
`iotm-participation-widget`

Important functional scope for phase 1:
- App shell with:
  - header
  - sidebar
  - viewport
  - modal/dialog layer
- Step-based flow:
  1. Introduction
  2. Upload media
  3. Description / metadata
  4. Rights and consent
  5. Contact details
  6. Review and confirmation
- REST API backend integration
- Form validation
- Basic error handling
- Drag and drop upload can be implemented as a simple MVP version
- No social login
- No moderation interface
- No annotation features
- No advanced search functionality
- No multilingual support yet

Minimum API endpoints:
- `GET /config`
- `GET /health`
- `POST /uploads`
- `POST /submissions`

Submission data should support at least:
- uploaded file reference or file
- media type
- title
- description
- metadata
- contributor name
- email
- rights declaration
- consent for public use
- timestamp

Configuration via HTML attributes:
Support at least these attributes on the custom element:
- `api-base-url`
- `project-id`
- `locale`
- `theme`
- `allow-video`
- `allow-audio`
- `allow-image`
- `max-file-size`
- `organization-name`
- `header-title`

Where appropriate:
- read values from attributes
- expose corresponding properties
- reflect changes where it makes sense

Styling requirements:
Use CSS custom properties and `::part` so host applications can theme the widget.
Provide at least these parts:
- `shell`
- `header`
- `sidebar`
- `viewport`
- `content`
- `modal`
- `modal-backdrop`
- `button`
- `input`
- `upload-dropzone`

Use CSS custom properties for at least:
- colors
- spacing
- fonts
- border radius
- borders

Layout:
Desktop:
- header on top
- sidebar on the left
- viewport on the right

Mobile:
- header on top
- sidebar becomes a compact pattern, for example tabs or a drawer-like pattern
- viewport below the header
- modals fullscreen or close to fullscreen

Accessibility:
- semantic HTML
- correctly associated labels
- clear error messages
- keyboard navigation
- accessible buttons and inputs
- accessible modal open/close behavior
- reasonable focus management for an MVP

UX:
- all visible interface text must be in English
- clear step labels
- visible progress
- simple instructions
- clear validation and error messages

Architecture expectations:
- Start with one custom element as the shell
- Keep the API layer thin and separate
- Treat consent as its own logical domain concern
- Keep components simple and reusable
- Avoid over-engineering
- Do not introduce an external framework dependency unless it already exists in the repository
- Prefer plain ES modules

Expected directory/file responsibilities:
1. `src/app/index.html`
   - simple demo/host page
   - contains an example embed of `<iotm-participation-widget>`
   - shows configuration through HTML attributes

2. `src/app/index.js`
   - bootstrap entry
   - registers component(s)
   - imports global CSS or bootstrap logic where appropriate

3. `src/app/app.js`
   - main component `IotmParticipationWidget`
   - Shadow DOM
   - state management for steps
   - render logic
   - attribute/property handling
   - event handlers
   - validation and navigation

4. `src/app/config.js`
   - default configuration
   - attribute-to-default mapping
   - step configuration
   - UI label constants if useful

5. `src/app/components/`
   - flat file structure only, no nested folders
   - optional subcomponents such as:
     - upload form component
     - consent form component
     - contact form component
     - modal component
   - keep this limited and practical

6. `src/app/js/`
   - utility scripts / classes
   - for example:
     - API client
     - validators
     - helpers
     - state helpers
   - also keep this flat, no nested directories

7. `src/app/css/index.css`
   - global/demo styles
   - host page styling
   - any demo page layout styling
   - component-specific Shadow DOM styles can live inside the component if that is cleaner

8. `src/app/img/`
   - use only if really needed
   - do not add placeholder images unless necessary

Important implementation details:
- Make the widget usable without a mock backend server, but structure the code as if a real backend is connected
- Add a clean API client that supports:
  - `getConfig()`
  - `health()`
  - `uploadFile(file, extraData?)`
  - `submitSubmission(payload)`
- Build in error handling for network failures
- If the backend is unavailable, show a clear status or error state in the widget
- Use `FormData` for uploads
- Use JSON for submissions
- Add simple client-side validation:
  - at least 1 upload required
  - title or description required if appropriate
  - contributor name required
  - valid email required
  - rights declaration checkbox required
  - public use consent checkbox required
- Build a review/confirm step showing all collected data
- After successful submission, show a confirmation screen

State model:
Keep at least this state:
- currentStep
- config
- loading states
- API status / errors
- uploaded files
- metadata form values
- consent values
- contact values
- submission status

Upload behavior:
- `allow-image`, `allow-video`, and `allow-audio` must influence accepted file types
- respect `max-file-size`
- show a list of selected files
- show a simple image preview if that can be done lightly
- for video/audio, file name display is enough if full preview is too heavy

Consent / legal:
Ensure the widget:
- explains that the contributor must own the rights or have permission
- explicitly asks for consent for public use
- explains why contact details are needed

Code documentation:
- Add clear comments where architecture decisions matter
- Keep code readable and maintainable
- Do not over-comment, but include useful implementation notes

What I expect from you:
1. First inspect the existing repository structure around `src/app`
2. Only change what is necessary for this app
3. Create or update files inside `src/app`
4. Make sure the widget can be tested locally through `index.html`
5. Keep the implementation small, practical, and production-minded

Important output requirements:
- Perform the implementation directly in code
- Create the necessary files
- Keep naming consistent
- Keep the structure flat
- Do not add unnecessary dependencies
- Do not create nested component subfolders
- Avoid abstractions for hypothetical future scenarios
- Focus on a solid MVP

Functional summary:

Product:
- embeddable participation widget for heritage submissions

Shell:
- header
- sidebar
- viewport
- modal layer

User flow:
1. Introduction
2. Upload media
3. Description / metadata
4. Rights and consent
5. Contact details
6. Review and confirmation

Must have:
- embeddable web component
- header/sidebar/viewport shell
- modals
- REST API connection
- media upload
- metadata form
- contact form
- rights/consent form
- CSS theming
- integration-friendly structure

Should have:
- progress in sidebar
- drag and drop
- error handling

Could have:
- subcomponents
- backend config loading
- image preview

Very important:
All user-facing text inside the component, demo page, labels, buttons, headings, instructions, validation messages, modal copy, and confirmation messages must be written in English only.

Now implement the app.