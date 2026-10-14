# Chloe Nails Wath

A static, English-language nail and beauty salon landing page. No framework or build step is required.

## Preview

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`. For GitHub Pages, publish this folder from the repository root; `index.html` is already at the root and all asset paths are relative. The supplied Word document and original menu photograph do not need to be published.

## Source of truth

All original files were read before implementation:

- `Tài liệu không có tiêu đề.docx`: salon details, language, beige palette, Instagram photography request and price updates. Embedded images are small decorative phone/location/clock icons, not salon photographs or logos.
- `f508136b0b84aac72e6e1b205a3ec4019bd947bb.jpg`: complete service menu and GBP prices.

Salon: **Chloe Nails Wath**. Address: **29–31 High Street, Wath-upon-Dearne, S63 7QQ**. Phone: **07481177919**. Email: **chloenailsandbeautywath@gmail.com**. Hours: **Monday–Saturday, 9:00 am–6:00 pm**.

Booking buttons open the supplied Setmore page at `https://chloenailswath.setmore.com/`. The phone number remains available with `tel:+447481177919` in contact details. Sunday hours, promotions, testimonials and experience claims have not been invented. Instagram and Facebook URLs retain the supplied account identities; tracking parameters were removed.

The Word document's latest changes override the photographed menu. The user confirmed that the website should keep the Word document's Monday–Saturday, 9:00 am–6:00 pm opening hours even though Setmore currently shows a different availability schedule. To allow booking during all advertised hours, update the Setmore schedule separately.

The following price updates apply:

| Service | Updated price |
| --- | --- |
| Nails take off | £15 |
| Fullset toes + gel | £45 |
| Signature pedicure | £45 |
| Classic pedicure | £40 |

“Fullset toes” in the Word note is applied to the menu's existing “Fullset toes + gel” line. “Pedicure with gel” (£40) and “Manicure with gel” (£30) remain as photographed. Signature and classic pedicures are added as named in Word. The “Gel nails from” prices and additional £5 for French tips are preserved; big toes nails remain £5 each.

## Photography and fonts

Photos are downloaded from the salon's public Instagram profile, optimized as local WebP images, and do not depend on expiring Instagram URLs. Individual post provenance and original dimensions are recorded in `assets/image-sources.json`. The interior photograph was only available as a 150px profile image, so it is not displayed at large scale. No stock or generated salon photos are used.

Cormorant Garamond and DM Sans are self-hosted Latin WOFF2 fonts. License files are in `assets/fonts/`. The small favicon and typographic wordmark were created for this website; they are not presented as an existing supplied logo.

## Behavior

- Accessible mobile navigation using a native dialog.
- Keyboard-accessible service tabs on desktop, mobile category accordions, individual Setmore booking buttons and a complete price list dialog.
- Gallery lightbox with previous/next buttons, arrow keys and Escape support.
- Real phone, email, social and directions links.
- Lazy-loaded images below the hero and a directions panel linking to the real address on Google Maps.
- Gentle reveal effects and reduced-motion support.
- Complete service information remains visible if JavaScript is disabled.

## Editing

Salon content and service prices are in `index.html`. The complete price list is built from those same service sections. Design tokens and responsive styles are in `css/style.css`; interactions are in `js/main.js`.
# Chloe-Nails-Wath
