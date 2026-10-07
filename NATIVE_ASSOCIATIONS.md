# Native passkey domain associations

Traefik serves two exact HTTPS paths on `juvantia.org`, backed by the existing
static site. Its route forces an upstream JSON Accept header to avoid the site's
markdown negotiation and sets the response Content-Type to application/json.
The static-server configuration and landing-page interface are unchanged.

## Android development

`assetlinks.json` associates `org.juvantia.app.dev` with the SHA-256 certificate
verified from the user's installed development APK and the local emulator APK.
Both APKs use the same certificate. Only its public fingerprint is committed.
This debug identity is development-only and does not authorize `org.juvantia.app`.

When replacing the APK's signing certificate, verify its actual package and
fingerprint with Android SDK `apksigner verify --print-certs` before changing the
association. Never publish a guessed fingerprint or a keystore.

## iOS acceptance is pending

The AASA currently has an empty `webcredentials.apps` array, granting no iOS
credential access. The real Apple Team ID has not been supplied. Before iPhone
acceptance, add `<actual Team ID>.org.juvantia.app.dev`, verify the development
client's `webcredentials:juvantia.org` entitlement, deploy, and check Apple's
association CDN. An empty array is not completed iOS configuration.

## Verification

Run the normal site build and verify both files exist in `dist/.well-known`.
After deployment, both HTTPS endpoints must return 200 with application/json,
valid JSON, and no redirects. Also check an Accept: text/markdown request returns
the actual association JSON. Android requires physical-device passkey acceptance;
successful HTTP checks alone do not prove operating-system domain verification.
