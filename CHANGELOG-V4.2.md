# FireEyar V4.2

- Removed the public "مدیریت" link from the main website header.
- Added `noindex,nofollow,noarchive` to `/admin/`.
- Reworked project management to collect title, type, description and image.
- Added client-side image compression before saving project images.
- Added public `/api/project-image/:id` delivery for published project images stored in D1.
- Kept existing D1/KV bindings and authentication architecture.
- No R2 dependency.
