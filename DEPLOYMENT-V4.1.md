# FireEyar V4.1 — Cloudflare Workers بدون R2

این نسخه برای Cloudflare Workers ساخته شده و وابستگی R2 حذف شده است.

## معماری
- Workers + Static Assets: سایت و API
- D1: اطلاعات سایت، خدمات، پروژه‌ها و درخواست‌های تماس
- KV: نشست (Session) پنل مدیریت
- Static Assets: تصاویر پروژه‌ها داخل `public/images/projects/`

## چرا R2 حذف شد؟
R2 برای نگهداری تصاویر در این نسخه اجباری نیست. تصاویر پروژه‌ها به‌صورت Static Asset داخل خود پروژه قرار می‌گیرند. بنابراین این نسخه هیچ `r2_buckets`، binding با نام `IMAGES` یا endpoint `/media/` ندارد.

## منابع موردنیاز در Cloudflare
1. D1 با نام `fireeyar-db`
2. KV Namespace برای Session، مثلاً `fireeyar-sessions`

R2 لازم نیست.

## اجرای دیتابیس
پس از اتصال D1 به Worker، فایل `schema.sql` را یک‌بار روی دیتابیس Remote اجرا کنید. اگر از Wrangler استفاده می‌کنید:

```bash
npx wrangler d1 execute fireeyar-db --remote --file=schema.sql
```

## Deploy
```bash
npm install
npx wrangler deploy
```

Cloudflare همچنین امکان اتصال مستقیم GitHub/GitLab به Workers را دارد؛ در آن حالت با هر push می‌توان Build و Deploy خودکار انجام داد.

## تصاویر پروژه
تصاویر واقعی را داخل:

`public/images/projects/`

قرار دهید و در پنل مدیریت برای هر پروژه مسیر آن را وارد کنید، مثلاً:

`/images/projects/project-01.jpg`

اگر تصویر نداشته باشید، پروژه بدون تصویر نمایش داده می‌شود.

## پنل مدیریت
`/admin/`

در اولین ورود، حساب مدیر ساخته می‌شود. رمز عبور حداقل ۱۰ کاراکتر باشد.

## نکات امنیتی
- رمز عبور به‌صورت SHA-256 hash در D1 ذخیره می‌شود. برای استقرار حساس و حرفه‌ای‌تر، در نسخه بعدی می‌توانیم PBKDF2/Argon2 و rate limiting اضافه کنیم.
- Sessionها در KV با TTL یک‌روزه نگهداری می‌شوند.
- پاسخ‌های API دارای `no-store` و چند security header پایه هستند.
- اطلاعات شخصی، شماره تماس، سابقه، پروژه یا نظر ساختگی به‌عنوان واقعیت اضافه نشده است و placeholderها حفظ شده‌اند.
