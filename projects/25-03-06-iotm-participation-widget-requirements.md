# IOTM Participatie Widget -- Eerste Plan / Requirements

## 1. Doel van de app

De webapp wordt een **embedbare widget** die derden in hun website
kunnen plaatsen. De widget biedt een portaal waarin bezoekers
erfgoed-gerelateerde content kunnen aanleveren:

-   foto's
-   video's
-   geluidsfragmenten
-   begeleidende tekst en metadata
-   contactgegevens
-   toestemmingen rond rechten en publiek gebruik

Het doel is burgerparticipatie rondom erfgoed te ondersteunen door een
eenvoudige manier te bieden om materiaal bij te dragen.

------------------------------------------------------------------------

## 2. Productvisie

De eerste versie wordt bewust **zo simpel mogelijk** opgezet:

-   één hoofdcomponent als app shell
-   optioneel enkele subcomponenten
-   renderbaar in vrijwel elke host-frontend
-   communicatie met een REST API backend
-   focus op uploaden, informeren en verzamelen van contactgegevens
-   Nederlands als primaire taal

------------------------------------------------------------------------

## 3. Scope van fase 1

### In scope

-   Embedbare web-component
-   App shell met:
    -   header
    -   sidebar
    -   viewport
    -   modals/dialogs
-   Upload-flow voor media
-   Formulier voor metadata en contactgegevens
-   Toestemmingsstappen voor rechten en publiek gebruik
-   Koppeling met REST API backend
-   HTML attributes voor configuratie
-   Shadow DOM
-   Styling via CSS custom properties en `::part`
-   Responsive gedrag binnen parent container
-   Integratiedocumentatie voor derden

### Nog niet per se in fase 1

-   annotatiefuncties
-   social login
-   moderatie-interface
-   uitgebreide zoekfunctionaliteit
-   meertaligheid buiten NL

------------------------------------------------------------------------

## 4. Conceptuele architectuur

### 4.1 Frontend

Een **custom element** als hoofdcomponent:

`<iotm-participation-widget>`

Deze component: - draait in Shadow DOM - leest configuratie uit HTML
attributes - reflecteert attributes ↔ properties - schaalt naar de
afmetingen van de parent - bevat de shell en de basisstates

### 4.2 Backend-koppeling

De widget communiceert met een REST API backend voor:

-   ophalen van configuratie
-   uploaden van bestanden
-   versturen van metadata
-   vastleggen van toestemmingen
-   opslaan van contactgegevens

### 4.3 Hostingmodel

De widget moet werken in:

-   plain HTML
-   CMS-sites
-   React/Vue/Angular apps
-   statische websites
-   server-rendered websites

------------------------------------------------------------------------

## 5. Functionele requirements

### 5.1 Basisstructuur

#### Header

Functie: - titel / context van het participatieproject - eventueel
logo - status of stapnaam

#### Sidebar

Functie: - navigatie tussen stappen - tonen van voortgang

#### Viewport

Functie: - hoofdinhoud van de actieve stap - formulieren -
upload-interface - informatieve teksten - bevestigingsscherm

#### Dialogs / Modals

Functie: - uitleg over auteursrecht - privacy- of consentinformatie -
foutmeldingen - bevestigingen

------------------------------------------------------------------------

### 5.2 Gebruikersflow (MVP)

1.  **Introductie**
2.  **Upload media**
3.  **Beschrijving / metadata**
4.  **Rechten en toestemming**
5.  **Contactgegevens**
6.  **Controle en bevestiging**

------------------------------------------------------------------------

## 6. Niet-functionele requirements

### Techniek

-   Node.js repository
-   Web Components
-   Shadow DOM
-   Framework-onafhankelijk
-   REST API integratie
-   HTML attributes voor configuratie
-   Attributes reflecteren naar properties

### Layout

-   Widget neemt afmetingen van parent container aan
-   Responsive gedrag
-   Sidebar kan op mobiel veranderen naar compact patroon

### Styling

-   CSS custom properties
-   `::part` selectors
-   Shadow DOM isolatie
-   eenvoudige theming

### Toegankelijkheid

-   semantische HTML
-   toetsenbordnavigatie
-   correcte labels
-   duidelijke foutmeldingen

### UX

-   Nederlandstalig
-   eenvoudige taal
-   duidelijke stappen
-   zichtbare voortgang

------------------------------------------------------------------------

## 7. API requirements

### Minimale endpoints

    POST /uploads
    POST /submissions
    GET /config
    GET /health

### Data in submission

-   bestand of upload-referentie
-   mediatype
-   titel
-   omschrijving
-   metadata
-   naam inzender
-   e-mail
-   rechtenverklaring
-   toestemming voor publiek gebruik
-   timestamp

------------------------------------------------------------------------

## 8. Juridische requirements

De app moet:

-   gebruiker informeren over auteursrechten
-   expliciete toestemming vragen voor publiek gebruik
-   bevestiging vragen dat gebruiker rechten bezit
-   uitleg geven waarom contactgegevens nodig zijn

------------------------------------------------------------------------

## 9. Componentvoorstel

### Hoofdcomponent

`iotm-participation-widget`

Interne onderdelen:

-   header
-   sidebar
-   viewport
-   modal layer

### Optionele subcomponenten

-   `iotm-upload-form`
-   `iotm-consent-form`
-   `iotm-contact-form`
-   `iotm-modal`

------------------------------------------------------------------------

## 10. Configureerbare attributes

Voorbeelden:

    api-base-url
    project-id
    locale
    theme
    allow-video
    allow-audio
    allow-image
    max-file-size
    organization-name
    header-title

------------------------------------------------------------------------

## 11. Stylingplan

### CSS Custom Properties

-   kleuren
-   spacing
-   fonts
-   radius
-   borders

### CSS Parts

    shell
    header
    sidebar
    viewport
    content
    modal
    modal-backdrop
    button
    input
    upload-dropzone

------------------------------------------------------------------------

## 12. Wireframe

### Desktop

    +------------------------------------------------------+
    | Header                                               |
    +----------------------+-------------------------------+
    | Sidebar              | Viewport                      |
    | - stap 1             | inhoud                        |
    | - stap 2             | formulieren                   |
    | - stap 3             | uploads                       |
    +----------------------+-------------------------------+

### Mobiel

-   header bovenaan
-   sidebar → drawer of tabs
-   viewport onder header
-   modals fullscreen

------------------------------------------------------------------------

## 13. Repository documentatie

### Voor ontwikkelaars

-   projectstructuur
-   build en run instructies
-   component API
-   styling

### Voor integrerende partijen

-   embed instructies
-   configuratie via attributes
-   backend koppeling
-   styling voorbeelden

------------------------------------------------------------------------

## 14. MVP requirements

### Must have

-   embedbare web component
-   header / sidebar / viewport shell
-   modals
-   REST API connectie
-   upload van media
-   metadata formulier
-   contactformulier
-   rechtenconsent
-   CSS theming
-   documentatie

### Should have

-   voortgang in sidebar
-   drag & drop uploads
-   foutafhandeling

### Could have

-   subcomponenten
-   backend configuratie
-   image preview
-   toekomstige IIIF / annotatie integratie

------------------------------------------------------------------------

## 15. Aanbevolen ontwerpkeuzes

1.  Begin met één custom element als shell
2.  Stap-gebaseerde flow
3.  Dunne API-adapter
4.  Consent als apart domeinonderdeel
5.  Shadow DOM + CSS vars + parts
6.  Integratiedocumentatie vanaf dag 1
