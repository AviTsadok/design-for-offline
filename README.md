# Designing Mobile Apps for Offline

Companion site for Avi Tsadok's SwiftCon Berlin talk: concept pages, further reading, feedback form, books and contact.

Live at **https://avitsadok.github.io/design-for-offline/**. QR codes are in `assets/qr.png` (black on white), `assets/qr-dark.png` (for dark slides) and `assets/qr.svg`.

Plain static HTML, no build step. The page registers a service worker (`sw.js`) so it keeps working offline after the first visit.
