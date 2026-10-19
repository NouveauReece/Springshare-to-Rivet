## Known limitations

- **Sidenav dropdowns (`index6.html`)** use Bootstrap's behavior, not Rivet's. Visuals and focus/hover styles match `sidenav/_base.scss`, but Rivet's `Sidenav` class (`js/rivet-esm.js`) opens each list independently via `aria-expanded` + `hidden`, with no close on outside click or Escape. Bootstrap closes the other group, closes on outside click/Escape, and supports arrow-key focus. 
   > Matching Rivet would required a custom `<script>` that overrides Bootstrap's handlers.
- **Not restyled:** third-party embeds (LibChat iframe, TeachingBooks widgets), inline-styled user content (e.g. grey callout on `index6.html`), and the chat widget (`.s-lch-widget-float*`).
   > If we're interested in this, we'd have to investigate where frames are coming from and where we would put those styles. Happy to do this- just didn't know if it was out of scope or no.
- **Font Awesome icons** (`fa-print`, scroll-to-top) still use the old icon font; switching to Rivet SVG icons needs HTML changes.
   > Again, happy to investigate ways around this with CSS if you're interested
- **Notifications** haven't seen all the states for these
   > If you know some ways to get their notifications/toasts/errors to show up, would love to know bc I had a hard time finding if they had this / examples 
- **Home page sort dropdown** can't show Rivet's "selected" style because Springshare doesn't mark the current sort (`.active` / `aria-current`); the toggle text shows it instead.
- **`pagination.css`** assumes "previous" is in the first `<li>` and "next" in the last; a template with "Next" first would collapse its first line.

## Things that need `!important`
1. `rivet-custom-lb-az.css` (external, loads after our file) contains:
   - `a` and `a/button/input:focus-visible` in focus indicators
   - `.rvt-lockup__tab`
   - `.rvt-lockup__trident`
   - `rvt-footer-resources__heading`
   - `.rvt-button--small`
   - `.rvt-lockup__title/subtitle`
   - `a:focus-visible { display: inline-block }`
   - `#s-lib-public-header-title`
   - `h2`, `h3`
   - `.s-lg-label-moreinfo button.btn-link`
   - `padding: 4px 8px` on the print/login/support links
   - `min-height/min-width: 24px` on links and buttons
2. Inline `<style>` (`#s-lg-tabs-container …`, `.s-lib-box .s-lib-box-title`, `#mysched_*`)
3. Bootstrap utilities that are `!important` (`.border`, `.pt-2`, `.ps-3`, `.pe-3`, `.float-end`, `.me-3`) for the search button, footer meta rows and cell borders
4. Bootstrap transitions/animations on `.btn`, `.form-control` and `.nav-link`
5. Springshare gradients/background colors on:
   - `.btn-primary`
   - `s-lib-box-collapse-toggle`
   - Popper `.dropdown-menu` (`position`, `inset`, `transform`, `margin`).
6. Springshare floats / fixed widths
   - `#s-lg-guide-search-box`
   - `li { float: left }`, `.float-end`

# Typography (`typography.css`)
| Springshare | Rivet |
| --- | --- |
| `body.s-lg-guide-body` | `body` (Rivet base font, color, line-height) |
| `#s-lg-guide-name` / `h1` | `.rvt-prose h1` (`.rvt-ts-32`, regular) |
| `h2`-`h6` | `.rvt-prose` headings (23 / 20 / 18 / 18 / 18, regular, tight line-height) |
| `.s-lib-box-content a` | `.rvt-link` (kept `display: inline`; the site's `inline-block` target-size rule broke bullets on wrapped list links) |
| `.clearfix` content wrapper (children spacing) | `.rvt-prose` + `.rvt-flow` (1rem flow, 3rem before headings) |
| `code` | `.rvt-code` |
| `blockquote` | `.rvt-quote__text` |
| `hr` | `.rvt-hr` |
| `pre`, `kbd` | no Rivet equivalent (built from Rivet tokens) |

# Breadcrumbs (`breadcrumbs.css`)
| Springshare | Rivet |
| --- | --- |
| `ol.breadcrumb#s-lib-bc-list` | `.rvt-breadcrumbs` |
| `li.breadcrumb-item` | `.rvt-breadcrumbs li` |
| `li.breadcrumb-item.active` | `.rvt-breadcrumbs li:last-child` |

# Buttons (`buttons.css`)
| Springshare | Rivet |
| --- | --- |
| `.btn` | `.rvt-button` |
| `.btn-outline-secondary` | `.rvt-button--secondary` |
| `.btn-sm` | `.rvt-button--small` (14px, 1.5rem tall) |
| `.btn.btn-primary` | flat blue-500 primary `.rvt-button` (the gradient and `#006599 !important` are overridden) |
| `.s-lg-label-moreinfo button.btn.btn-link` ("more…"/"less…") | small secondary `.rvt-button`: see *Link / resource lists* |
| `.s-lib-profile-email a.btn` ("Email Me") | `.rvt-button.rvt-button--plain` with a mail icon |
| `#mysched_*` (Schedule Appointment; inline `<style>` by ID) | `.rvt-button.rvt-button--plain` with a calendar icon (needs `!important`) |

# Search within guides (`search.css`): Rivet header search panel
| Springshare | Rivet |
| --- | --- |
| `#s-lg-guide-header-search` | `.rvt-header-global__search` (lg: white, `--rvt-shadow-heavy`, 4px radius, `1rem 1.5rem` padding, `20rem` wide) |
| `form#s-lg-guide-search-form > .input-group` | `.rvt-input-group` |
| `input.form-control` | `.rvt-text-input.rvt-input-group__input` |
| `button.btn.btn-outline-secondary.border` | `.rvt-input-group__append .rvt-button` (primary; `.border` utility needs `!important`) |

The panel is always visible; Rivet's toggle button (`data-rvt-disclosure="search"`) can't be added without HTML changes.

# Forms (`forms.css`)
| Springshare | Rivet |
| --- | --- |
| `.form-control` | `.rvt-text-input` |
| `.input-group` | `.rvt-input-group` |
| `.input-group > .btn` | `.rvt-input-group__append .rvt-button` |

# Guide page navigation (`sidenav.css`)
| Springshare | Rivet |
| --- | --- |
| `ul.nav-pills.split-button-nav` | `.rvt-sidenav__list` |
| `li.nav-item` | `.rvt-sidenav__item` |
| `a.nav-link` | `.rvt-sidenav__link` |
| `a.nav-link.active` | `.rvt-sidenav__link[aria-current="page"]` (orange-000 background, crimson 4px bar) |
| `li.nav-item.dropdown` = `a.nav-link.s-lg-tab-top-link` + `a.s-lg-tab-drop.dropdown-toggle` + `ul.s-lg-subtab-ul.dropdown-menu` (`index6.html`) | Rivet *sidenav with dropdown*: `.rvt-sidenav__item-wrapper` link + `.rvt-sidenav__toggle` (black-200 chevron, hover blue-000, rotates 180° when `aria-expanded="true"`, orange-000 + crimson chevron beside the current page) and a nested list that is hidden until Bootstrap adds `.show`; opens inline instead of as a popup (Popper's inline `position`/`transform`/`margin` are overridden with `!important`) |
| `li.dropdown-item.active > ul.list-group.s-lg-boxnav > li.list-group-item > a` (a sub-page's box links, third level, `index8.html`) | a third nested `.rvt-sidenav__list` / `__item` / `__link`: the level-2 `<li>` is `flex-wrap: wrap` so the list drops below its link (`flex-basis: 100%`), `margin: 1rem 0 1rem 1rem`, 4px black-100 left rule per item, `.3rem .5rem .3rem 1rem` link padding; Bootstrap's list-group boxes neutralized. Without `flex-wrap` the level-3 list sat beside the level-2 link and squeezed it |
| `ul.s-lg-subtab-ul > li.dropdown-item > a.d-block` (sub-pages) | nested `.rvt-sidenav__list` / `__item` / `__link` (4px black-100 left rule, 1rem indent) |

Stacking follows `sidenav/_base.scss`: items have no vertical margin (Bootstrap's `.mb-1` utility added 4px per `<li>` and is zeroed with `!important`), the nested list is a block list with `margin: 1rem 0 1rem 1rem`, nested items have a 4px black-100 left rule and `.3rem` vertical link padding; the rules also apply to deeper levels. `index2.html` only has two levels (page + sub-pages).

Collapse behaviour: where the page already provides toggles (`index6.html`/`index8.html`: `a.s-lg-tab-drop.dropdown-toggle` + `ul.dropdown-menu`) Bootstrap collapses/expands the lists and they look like Rivet's sidenav dropdown. Where it doesn't (`index2.html`: plain `ul.s-lg-subtab-ul`) nested lists are always shown: Rivet's collapse needs a toggle `<button>` that can't be added without HTML changes, and a CSS-only hover version was tried and reverted.

The inline CSS's `border-left: 1px solid #bbb` on `a.s-lg-tab-drop:hover` is neutralized (the toggle has no border in any state in Rivet; only background, icon colour and the `.125rem` blue-400 outline change on hover/focus).

The inline CSS also re-states `font-weight: bold; padding: 4px 5px 4px 10px; width: 100%; float: left` for `a.s-lg-tab-top-link` and its `:hover`, which made dropdown-parent links (e.g. "Artists") bold and shifted on hover; the link keeps 14px / regular / `.5rem .5rem .5rem 1rem` in every state (doubled-class override).

Hover/focus: blue-500 text + underline (also on the current page). Inline CSS gave the active link a 1px border on hover (black flash); borders are 0 and transitions removed. The external stylesheet's `a` underline is overridden with `!important`.

# Boxes (`boxes.css`)
| Springshare | Rivet |
| --- | --- |
| `.s-lib-box.s-lib-box-std` | `.rvt-card` |
| `.s-lib-box-title` | `.rvt-card__title` (header strip) |
| `.s-lib-box-content` | `.rvt-card__content` |
| `.s-lib-box-container` | card wrapper / vertical spacing |
| `.s-lib-box-collapsible` > `h2.s-lib-box-title-collapsible > button.s-lib-box-collapse-toggle` (title + FA chevron; Bootstrap `collapse` on `.collapse.show`) | Rivet *Accordion* toggle inside the box header: full-width button, `1rem` padding, title 1.25rem regular black-500, plus icon (black-400; vertical bar hidden when `aria-expanded="true"` = minus), hover black-100 (the strip is already black-000), keyboard focus blue-000 with the blue-400 ring drawn inside the box (it clips overflow); no divider under the header while collapsed. Springshare paints the button crimson on `#edeceb` |
| `.s-lib-box` that contains `.s-lib-profile-container` | no chrome: no border, shadow, background or title strip (heading kept, centered, for a11y) |

# Tabs (`tabs.css`)
| Springshare | Rivet |
| --- | --- |
| `.s-lib-jqtabs` | `.rvt-tabs` |
| `ul.nav-tabs` | `.rvt-tabs__tablist` |
| `a.nav-link` | `.rvt-tabs__tab` |
| `a.nav-link.active` | `.rvt-tabs__tab[aria-selected="true"]` |
| `.tab-content > .tab-pane` | `.rvt-tabs__panel` |

# Accordion (`accordion.css`)
| Springshare | Rivet |
| --- | --- |
| `.accordion` | `.rvt-accordion` |
| `.accordion-item` | `.rvt-accordion__summary` |
| `.accordion-header` | (heading wrapper) |
| `button.accordion-button` | `.rvt-accordion__toggle` |
| `.accordion-body` | `.rvt-accordion__panel` |
| `.accordion-button::after` (Bootstrap chevron) | `.rvt-accordion__toggle-icon`: plus with a vertical bar (`__icon-bar`) that is hidden when expanded (minus), black-400, drawn with gradients |

# Tables (`tables.css`)
| Springshare | Rivet |
| --- | --- |
| `table.table` | `.rvt-table` |
| `table.table-striped` | `.rvt-table-stripes` |
| `.ck_border` (inline-bordered cells) | `.rvt-table-cells` (border color only, `!important`) |

# Link / resource lists (`link-lists.css`)
| Springshare | Rivet |
| --- | --- |
| `ul.s-lg-link-list` | `.rvt-list-plain` |
| `.s-lg-icons` (lock/access icon after a link) | inline icon + text: 1rem icon vertically centered on the link text, `.25rem` + the link's trailing space gap (Springshare's `margin-top: 16px` / li `padding: 5px 2px 0 0` / img `margin-bottom: 2px` removed with `!important`) |
| `button.s-lg-label-more` / `.s-lg-label-less` ("more…" / "less…", `.btn.btn-sm.btn-link`) | `.rvt-button.rvt-button--small.rvt-button--secondary` (14px, 1.5rem tall, `0 .375rem`, white, blue-100 border), `.5rem` below the description it belongs to; the pair is still toggled by jQuery with inline `display` |
| `li.s-lg-tn-li > div#s-lg-content-… > div.s-lg-tn > img.lg-tn` (resource with a cover thumbnail, `index9.html`) | thumbnail on the list's own left edge (Springshare's `margin-left: -15px` made images hang outside the box padding), 1rem to the text, .5rem below for wrapped text, 4px radius, rows 1.5rem apart; still a float because the text isn't wrapped in its own element. Only `.s-lg-tn-li` rows are affected |
| `.s-lg-database-desc`, `.s-lg-link-desc`, `.s-lg-content-more-info` | secondary text (`.rvt-ts-14`, black-400) |

# Profile (`profile.css`): modeled on Rivet people-list card
| Springshare | Rivet |
| --- | --- |
| `.s-lib-profile-container` | `.rvt-card` (centered stack; no box chrome) |
| `.s-lib-profile-image` / `img` | `.rvt-avatar.rvt-avatar--lg` + `.rvt-avatar__image` (128px circle, shrinks to the column) |
| `.s-lib-profile-name` | `.rvt-card__title` (20px regular) + circular arrow icon (`::after`, `box-sizing: content-box` so the circle is 2rem; Bootstrap's `border-box` had squashed it) |
| `.s-lib-profile-pronouns` | `.rvt-card__content` (top rule, black-400 text) |
| `.s-lib-profile-email a.btn`, `#mysched_*` | `.rvt-button--plain` with mail / calendar icons (`::before`), stacked, text wraps in narrow columns (the scheduling button can be in `.s-lib-profile-widget-la`, `-lc` or `-other`) |
| `.s-lib-profile-contact`, `-subjects` | `.rvt-card__meta` (14px, black-400, centered, 1rem above) |

Notes: the sidebar column is ~150-280px wide between 768px and 1100px; everything is `min-width: 0` / `max-width: 100%` so it never overlaps the main column (checked at 320-1100px). The two actions had inconsistent states because a generic `.btn` hover rule gave `#mysched_*` a dark border; both now share identical plain-button states.

# Prev/next + guide footer (`pagination.css`, `guide-footer.css`)
| Springshare | Rivet |
| --- | --- |
| `nav#s-lg-page-prevnext` | `.rvt-seriesnav` (black-100 rule above and below, 4rem above): https://rivet.iu.edu/layouts/preview/profile-page/single-column/ |
| `ul.pagination` / `li.page-item` | `.rvt-seriesnav` flex row (≥46.25em) / 50% halves with a black-100 divider; the empty placeholder `<li>` is hidden. Bar height matches Rivet (98px bar / 96px links): the Previous link's leading `<< ` sat alone on an extra empty line, which added 24px, so that first line is collapsed with `::first-line`; the divider is drawn as `border-left` on the second link only when both exist (`:has()` can't nest). Deviations from Rivet: (1) the 1.5rem side padding lives inside the link instead of on the halves, so the hover fill covers each whole half (Rivet leaves an unfilled strip beside the divider), and the arrow circles are inset 1.5rem from the bar's outer edges instead of touching them; (2) Rivet's `flex: 1 1 50%` makes a lone link stretch across the whole bar (measured on rivet.iu.edu: 776px of 776px); here a lone link keeps its half (`flex: 0 1 50%`; previous left, next right) |
| `a.page-link` (Previous / Next) | `.rvt-seriesnav__previous` / `__next` (1.5rem vertical padding, black-500 text, black-000 on hover); `strong` = `__label` (black-400); circular arrow = `__icon` (2rem, black-200 border, black-300 arrow) drawn with `::before` (previous, left) / `::after` (next, right); normal link focus ring |
| `#s-lib-footer-public`, `#s-lg-guide-header-attributes` | Rivet-styled meta list (black-400, `.rvt-ts-14`); floats replaced by flex rows that stack below 46.25em |
| `.s-lg-guide-label` | bold label |
| 24px target-size padding on print/login/support links | kept; links shifted `-8px` so text aligns |

The link text contains literal angle brackets (`<< Previous: …`, `Next: … >>`). They're hidden CSS-only with a `@font-face` restricted to `U+003C`/`U+003E` and `size-adjust: 0%` (zero-size glyphs), applied to `#s-lg-page-prevnext .page-link` only (the search-results pagination uses `<<`, `<`, `>`, `>>` as real labels). Browsers without `size-adjust`/`unicode-range` show the brackets next to the arrow icon.

# Layout (`layout.css`)
| Springshare | Rivet |
| --- | --- |
| `.container` | `.rvt-container-xl` (max-width 78.75rem) |
| `.s-lib-side-borders` | borders removed |
| `#s-lg-public-skiplink` | Rivet skip link (hidden until focused, white bg, `z-index: 999`, link focus ring) |

# Search results page (`search-results.css`): `srch.php` / `test3.html`
| Springshare | Rivet |
| --- | --- |
| `#s-lg-srch-local nav.navbar.bg-light.border.rounded` | Rivet search panel (`.rvt-header-global__search`): white, `--rvt-shadow-heavy`, 4px radius, `1rem 1.5rem` padding; the form fills it (Bootstrap's `col-md-9`, `pad-top-med`, `mb-3` neutralized). Rivet's other search pattern (people-list *Filter by search*: visible `.rvt-label` over a `.rvt-input`, no panel) has no visible label here because the page's label is `.sr-only` |
| `button.navbar-toggler` (mobile toggle for the search form) | circular `.rvt-global-toggle` look (2rem, black-200 border), only below 48em |
| `#s-lg-srch-form` input group + `button.btn.btn-light.border` | `.rvt-input-group` + primary `.rvt-button` |
| `.s-srch-result` / `-title` / `-meta` / `-highlights` / `-url` | result list: black-100 rule between results, 20px title, 14px black-400 meta/URL |
| `mark` (highlighted terms) | gold-100 background, black-500 text |
| `ul.pagination.pagination-sm` in results (`.page-item`, `.page-link`, `.active`, `.disabled`) | `.rvt-pagination` (2.5rem items; hover blue-000 + blue-500 underbar; current orange-000 + crimson underbar; disabled black-200); the `<<` `<` `>` `>>` glyph text is collapsed and replaced by Rivet's first / previous / next / last chevron icons (paths copied from the pagination docs, drawn with a mask so they follow the link colour); the aria-labels still name the links |
| `nav.float-end` pagination next to "Showing…" | flex row (Springshare's float made the first result wrap around it) |
| `fieldset.s-lg-facet-div` / `legend` | `.rvt-fieldset` / `.rvt-legend` |
| `.s-lg-facet-div-content` (fixed 300px scroll area, 60+ checkboxes) | bordered region (black-100, .5rem radius, like Rivet's scrollable table region); inner padding keeps the checkbox focus ring from being clipped (scroll shadows were tried and removed) |
| `.form-check` + `.form-check-input` + `.form-check-label` | `.rvt-checkbox` (hidden input, label `::before` box, blue-500 checked fill) |
| sort control: `div.dropdown > a.dropdown-toggle` ("Sorted By Relevance") | `.rvt-dropdown` toggle = small secondary `.rvt-button` with a 1rem chevron that rotates 180° when `aria-expanded="true"` (`dropdown/_base.scss`) |
| `ul.dropdown-menu > li > a.dropdown-item` | `.rvt-dropdown__menu` (white, 4px radius, `--rvt-shadow-standard`, min-width 12.5rem, `.5rem` vertical padding); items `.375rem 1rem`, hover blue-000 / blue-500, `.active` = `aria-current` look (4px crimson inset bar, orange-000, crimson text), keyboard focus = inset 2px blue-500 ring. Popper's inline `margin: 0` on the open menu is overridden (`!important`) to keep Rivet's `.5rem` gap under the toggle; menu text inherits the surrounding size (14px) like Rivet's. Behaviour (open/close, Escape returning focus, arrow keys) is Bootstrap's, checked on the live search page. Scoped to the results area so the sidenav dropdowns are untouched |
| `.dropdown-toggle-icon .caret` | Rivet chevron-down |

Note: `test3.html` renders its results with Springshare JS that is replaced by an empty result set when served locally; the results were checked from a copy with the scripts removed.

# Guide index pages (`guide-index.css`, `alerts.css`): `index4.html`
| Springshare | Rivet |
| --- | --- |
| `#s-lg-hp-nav` grey bar (`#e8e8e8`) | neutral panel (black-000, black-100 rule, 4px radius) |
| `.s-lg-index-nav-btn > button.btn[role=tab]` | `.rvt-button-segmented` of `.rvt-button--secondary`; `aria-selected="true"` = primary `.rvt-button` (first/last rounded, `-2px` overlap, focus z-index 1000) |
| `#search-guides` (label + input group) | `.rvt-input-group` with primary appended `.rvt-button` |
| `#s-lg-index-list .accordion` / `.accordion-button` (grey cards, `!important`) | `.rvt-accordion`: rule above/below, 1.25rem regular text, plus/minus icon |
| `.badge` (guide count) | `.rvt-badge` (black-100, pill, 14px medium) |
| `.s-lib-public-side-header h2` | 1.25rem regular heading with a black-100 rule |
| `.s-lg-hp-btn-section` / `.btn-info` | primary `.rvt-button` |
| `#s-lg-index-list-header` (`.text-muted`, `!important`) | black-500, 18px regular |
| `.alert.alert-info/-success/-warning/-danger` | `.rvt-alert--info/--success/--warning/--danger` (4px left rule, tinted bg, `.875rem`) |
| `#jquery-notification.jquery-notification-error` | `.rvt-alert--danger` |
| index/search footer (`#s-lib-footer-brand`, `-rights`, `-login-link`) | left-aligned flex row, stacks on mobile |
| `select.form-select` ("Display …") | `.rvt-select` (2.5rem, black-300 border, chevron, focus ring): in `forms.css` / `focus.css` |
| `#form-group-s-lg-guide-order .btn` ("Go") | primary `.rvt-button` |
| `.s-lib-box.s-lib-box-idx-guide-list` rows (bordered/shadowed cards) | plain list rows with a black-100 rule; title = medium link, updated date/views = 14px black-400 on the right (`.s-lg-gtitle` needs the full `.s-lib-box … .s-lg-gtitle` selector to beat Springshare's `display: inline`) |
| `.btn-help-popover` (guide info icon button) | plain blue icon button |

Note: `index4.html` / `index5.html` fill their list with Springshare JS that fails locally (it shows "Sorry, there was a problem loading the list"); the accordion/list was reviewed from a copy with the scripts removed. Rivet's `.rvt-accordion` source only specifies the bar-hiding behavior, not the icon artwork, so the plus is drawn with CSS gradients.

# Dialogs (`dialog.css`) for Springshare and jQuery UI
| Springshare / jQuery UI | Rivet |
| --- | --- |
| `.ui-dialog` | `.rvt-dialog` (white, 8px radius, `--rvt-shadow-heavy`, `max-width: 37.5rem`, 90% wide, centered with `top: 40%` + `translateY(-40%)`; jQuery UI's inline top/left/width/height overridden with `!important`) |
| `.ui-widget-overlay` | `data-rvt-dialog-darken-page` (black-base at .85) |
| `.ui-dialog-titlebar` / `.ui-dialog-title` | `.rvt-dialog__header` (1.5rem 1rem padding, black-100 rule) / `__title` (1.25rem bold) |
| `button.ui-dialog-titlebar-close` | `.rvt-dialog__close` (2rem square, 1rem icon, transparent, blue-500 on hover, white + blue-600 focus ring); the Font Awesome × is replaced by the exact close-icon path from rivet.iu.edu's dialog markup |
| `.btn.btn-primary` (the OK button) | flat blue-500 `.rvt-button`: Springshare paints a gradient and `background-color: #006599 !important` on `.btn-primary` |
| `.ui-dialog-content` (`#s-lib-alert`) | `.rvt-dialog__body` (1rem padding) |
| `.ui-dialog-buttonpane` / `.ui-dialog-buttonset` | `.rvt-dialog__controls` (black-000, rule above, buttons right-aligned from 30em, full-width below) |
| `.ui-resizable-handle` | hidden (Rivet dialogs aren't resizable/draggable) |

`index7.html` (a staff profile page): the page `h1` (`.s-lib-header h1`) follows the Rivet prose h1 (2rem regular); guide rows, profile column and sidebar headings reuse the earlier rules.

# Loading notification (`loading.css`)
| Springshare | Rivet |
| --- | --- |
| `#jquery-notification` | `.rvt-card--raised` (white, `--rvt-shadow-heavy`, 8px radius, 1.5rem padding) |
| `#jquery-notification-message > img` (ajax-loader.gif) | `.rvt-loader.rvt-loader--lg` spinner via `::before`; the GIF is visually hidden but its alt text stays |
| `#jquery-notification.jquery-notification-error` | `.rvt-alert--danger` (orange-000, 4px orange-500 left rule, orange-700 text) |
| inline `top`/`left` px (JS) | centered in the viewport (`50%` + `translate(-50%, -50%)`, `!important`) |

# Focus indicators (`focus.css`)
The Springshare stylesheet forces `outline: #101010 solid 2px !important; border-color: #101010 !important; box-shadow: none !important` on every `a`, `button`, `input`, `select` and `textarea` at `:focus-visible`, which replaced Rivet's rings. `focus.css` (imported last, `body`-prefixed, `!important`) restores the values from Rivet's source:
| Element | Rivet source | Focus style |
| --- | --- | --- |
| Links, tabs, sidenav links, breadcrumbs, header menu links, accordion toggle | `links/_base.scss`, `tabs`, `accordion`, `header-system/_header-menu.scss` | `outline: .125rem solid blue-400; outline-offset: .125rem` |
| `.btn` (primary) | `buttons/_base.scss` | `box-shadow: 0 0 0 .1rem white, 0 0 0 .25rem blue-400`, no outline |
| `.btn-outline-secondary`, profile plain buttons | `.rvt-button--secondary`, `.rvt-button--plain` | same ring with `.125rem` white inner ring |
| IUCAT `.rvt-cta--button` | `cta/_base.scss` | `.125rem` white + `.25rem` crimson-400 ring |
| `.form-control` | `inputs/_base.scss` | `outline: none; box-shadow: 0 0 0 .125rem blue-400` |
| jQuery tab panel | `tabs/_base.scss` | `outline: .125rem solid blue-500; outline-offset: -.125rem` |
| Skip link (`#s-lg-public-skiplink`) | `header-system/_header-wrapper.scss` | shown on focus, white bg, `z-index: 999`, link ring |
| `.form-select`, `.form-control` | `inputs/_base.scss` | box-shadow ring above (`.rvt-select`) |
| Sidenav dropdown toggle (`a.s-lg-tab-drop`) | `sidenav/_base.scss` `&__toggle` | `:hover` and `:focus` both: `.125rem` blue-400 outline, offset `.125rem`, blue-000 background (Rivet uses `:focus`, so it also shows after a click): in `sidenav.css` |
| Collapsible box toggle (`.s-lib-box-collapse-toggle`) | `accordion/_base.scss` | blue-400 outline drawn inside the box (negative offset), blue-000 background: in `boxes.css` |
| Sort dropdown toggle / items | `buttons/_base.scss` secondary, `dropdown/_base.scss` | secondary ring; items inset 2px blue-500: in `search-results.css` |
| "more…" / "less…" buttons | `buttons/_base.scss` secondary | secondary ring: in `link-lists.css` |
| Dialog close button | `dialog/_base.scss` `&__close` | `.125rem` white + `.25rem` blue-600 ring: in `dialog.css` |

Also: Bootstrap's `.btn`/`.form-control` `transition` is disabled (Rivet rings appear immediately), and Springshare's `a:focus-visible { display: inline-block }` is reverted for header links, CTA, lockup and buttons so focus doesn't shift layout.

# Header (`header.css`)
The markup is already Rivet; Springshare/Bootstrap rules leaked into it (16px links, underlines, extra item margin, arrow on the CTA). `header.css` restores the libraries.indiana.edu look.
| Springshare leak | Fix |
| --- | --- |
| `a` 16px / underline (`!important` external rule) | `.rvt-header-menu__link` 14px, no underline |
| `.rvt-lockup` underline | removed |
| `.rvt-lockup__tab` 64×64 square / trident 48×40 (external sheet) | Rivet sizes: tab 1.75×2.125rem (2.25×2.75rem ≥46.25em), trident 1.1875×1.4375rem (1.5×1.875rem) |
| `.rvt-lockup__trident` SVG path (different tracing than the live site) | path geometry replaced via CSS `d: path(...)` (live site's path); percent-encoded SVG background fallback only where `d` is unsupported |
| `.rvt-cta--button` arrow + 16px bold | `.rvt-cta--button` 14px medium, no arrow |
| `li` margin-right | `.rvt-header-menu__item` margin-right 0 |
| Desktop-only link padding/line-height applied at all widths | scoped to `min-width: 67.5em`; below that Rivet's mobile menu rules apply (row dividers, `.5rem` link padding, full-width CTA) |
| `<br>` in menu labels | hidden below 67.5em (theme rule) |

# Footer (`footer.css`)
The markup is already Rivet. Springshare's `a` underline (`!important`) and Rivet's `.rvt-button--plain` (declared after `.rvt-footer-resources__button`) broke the links and buttons.
| Problem | Fix (from rivet.css + libraries.indiana.edu theme CSS) |
| --- | --- |
| underlined footer links | `.rvt-footer-*__link/a`: no underline, underline on hover |
| "Databases A-Z" / "Give Now" blue text, no fill | `.rvt-c-footer-resources__button`: white fill, crimson text, `min-width: 12rem`, `.25rem 1rem` padding; hover gold-500 |
| focus ring | `a:focus { outline-color: #fff }` for footer links |
| external sheet: headings 24px, `.rvt-button--small` 19.2px/600 | restored: headings 18px (`margin-top` 1.5rem, 0 ≥46.25em), buttons 14px / 500 / 1.5rem tall |

The live-site button values (`min-width: 12rem`, gold hover) come from the libraries.indiana.edu theme CSS, not Rivet core. Some link labels differ from the live footer because that content lives in the HTML.

