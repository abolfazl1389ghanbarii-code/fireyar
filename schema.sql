CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT NOT NULL,title TEXT NOT NULL,body TEXT DEFAULT '',meta TEXT DEFAULT '',image TEXT DEFAULT '',sort_order INTEGER DEFAULT 0,published INTEGER DEFAULT 1,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS inquiries(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,phone TEXT NOT NULL,message TEXT DEFAULT '',status TEXT DEFAULT 'new',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS admins(id INTEGER PRIMARY KEY CHECK(id=1),username TEXT NOT NULL,password_hash TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO settings(key,value) VALUES
('brand','[نام برند / نام شما]'),('name','[نام و نام خانوادگی]'),('phone','[شماره تماس]'),('email','[ایمیل]'),('city','اصفهان'),
('hero_title','طراحی و اجرای سیستم‌های اعلام حریق و خدمات برق ساختمان و صنعتی'),
('hero_subtitle','ارائه خدمات تخصصی طراحی، نصب، راه‌اندازی، عیب‌یابی و نگهداری سیستم‌های اعلام حریق و اجرای خدمات برق ساختمان و تأسیسات الکتریکی.'),
('about_title','ایمنی، با اجرای درست آغاز می‌شود.'),
('about_body','[معرفی واقعی خود را از پنل مدیریت وارد کنید.]'),
('seo_title','سیستم اعلام حریق اصفهان | طراحی، اجرا و خدمات برق ساختمان و صنعتی'),
('seo_description','طراحی و اجرای سیستم اعلام حریق، راه‌اندازی، عیب‌یابی و نگهداری سیستم‌های ایمنی و خدمات برق ساختمان و صنعتی در اصفهان و مناطق اطراف.');
INSERT OR IGNORE INTO items(type,title,body,meta,sort_order) VALUES
('service','طراحی سیستم اعلام حریق','طراحی متناسب با کاربری و نیازهای ایمنی.','',1),
('service','اجرای سیستم اعلام حریق','نصب و اجرای تجهیزات و کابل‌کشی با دقت اجرایی.','',2),
('service','راه‌اندازی و تست','راه‌اندازی و بررسی صحیح عملکرد تجهیزات.','',3),
('service','عیب‌یابی و تعمیرات','بررسی خطاها و رفع اشکالات سیستم‌های موجود.','',4),
('service','سرویس و نگهداری','بازدید دوره‌ای و نگهداری سیستم.','',5),
('service','برق ساختمان','خدمات برق و تأسیسات الکتریکی ساختمان.','',6),
('service','برق صنعتی','خدمات برق پروژه‌های صنعتی.','',7),
('service','مشاوره فنی','بررسی اولیه و ارائه راهکار متناسب با پروژه.','',8),
('project','شرکت نفت سپاهان','[توضیح واقعی پروژه را وارد کنید.]','پروژه اعلام حریق',1),
('project','بیمارستان سوانح و سوختگی چمران','[توضیح واقعی پروژه را وارد کنید.]','پروژه اعلام حریق',2),
('project','ساختمان‌های اداری','[نام و مشخصات واقعی پروژه را وارد کنید.]','اداری',3),
('project','ساختمان‌های تجاری','[نام و مشخصات واقعی پروژه را وارد کنید.]','تجاری',4),
('project','ساختمان‌های مسکونی','[نام و مشخصات واقعی پروژه را وارد کنید.]','مسکونی',5);