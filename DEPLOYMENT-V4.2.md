# FireEyar V4.2 Deployment

No new Cloudflare binding is required. Keep the existing D1 binding `DB` and KV binding `SESSIONS`.

Project images are compressed in the browser and stored in the existing D1 `items.image` field. Images are served through `/api/project-image/:id` rather than included in `/api/public`.

The public header no longer contains a management link. `/admin/` remains available directly and is marked `noindex,nofollow,noarchive`.
