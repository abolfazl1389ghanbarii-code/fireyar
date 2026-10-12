'use strict';
const $=s=>document.querySelector(s);
const E=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function boot(){
  try{
    const response=await fetch('/api/public',{headers:{accept:'application/json'}});
    if(!response.ok)throw new Error('Public data unavailable');
    const d=await response.json(),s=d.settings||{};
    const brand=(s.brand||'آتش افرا').replace(/آتش[‌‍-]?آفرا/g,'آتش افرا');
    document.title=s.seo_title||`${brand} | سیستم‌های اعلام حریق و خدمات برق`;
    const description=document.querySelector('meta[name="description"]');
    if(description&&s.seo_description)description.content=s.seo_description;
    ['brand','footerBrand'].forEach(id=>{const el=$('#'+id);if(el)el.textContent=brand;});
    const footerBrandText=$('#footerBrandText');if(footerBrandText)footerBrandText.textContent=brand;
    $('#heroTitle').textContent=s.hero_title||'ایمنی، سرمایهٔ زندگی شماست.';
    $('#heroSubtitle').textContent=s.hero_subtitle||'طراحی، اجرا و نگهداری سیستم‌های اعلام حریق و ارائه خدمات برق ساختمان و صنعت، با توجه به نیاز هر پروژه.';
    $('#aboutTitle').textContent=s.about_title||'ایمنی، با اجرای درست آغاز می‌شود.';
    $('#aboutBody').textContent=s.about_body||'آتش افرا با تمرکز بر خدمات فنی اعلام حریق و برق، به دنبال ارائه راهکارهایی متناسب با نیاز هر پروژه است.';
    const cityEl=$('#city'),phoneEl=$('#phone');
    cityEl.textContent=s.city||'';phoneEl.textContent=s.phone||'';
    cityEl.closest('.contactDetail').hidden=!s.city;
    phoneEl.closest('.contactDetail').hidden=!s.phone;
    $('.contactDetails').hidden=!(s.city||s.phone);
    const socials=[{key:'instagram_url',label:'اینستاگرام',cls:'instagram',icon:'◎'},{key:'telegram_url',label:'تلگرام',cls:'telegram',icon:'➤'},{key:'bale_url',label:'بله',cls:'bale',icon:'✓'}];
    $('#socialLinks').innerHTML=socials.filter(x=>/^https?:\/\//i.test(s[x.key]||'')).map(x=>'<a class="socialLink '+x.cls+'" href="'+E(s[x.key])+'" target="_blank" rel="noopener noreferrer" aria-label="'+x.label+'" title="'+x.label+'"><span class="socialLogo" aria-hidden="true">'+x.icon+'</span><span>'+x.label+'</span></a>').join('');
    $('#servicesGrid').innerHTML=(d.services||[]).map((x,i)=>`<article class="card"><div class="n">${String(i+1).padStart(2,'0')}</div><h3>${E(x.title)}</h3><p>${E(x.body)}</p></article>`).join('')||'<p class="emptyState">اطلاعات خدمات در حال تکمیل است.</p>';
    $('#projectsGrid').innerHTML=(d.projects||[]).map(x=>`<article class="project">${x.image?`<img src="${E(x.image)}" alt="${E(x.title)}" loading="lazy" onerror="this.style.display='none'">`:''}<div class="pb"><h3>${E(x.title)}</h3><p>${E(x.meta||'پروژه')}</p>${x.body?`<p>${E(x.body)}</p>`:''}</div></article>`).join('')||'<p class="emptyState lightEmpty">نمونه‌پروژه‌ها در حال تکمیل هستند.</p>';
    $('#educationGrid').innerHTML=(d.education||[]).map(x=>'<a class="project educationCard" href="/education.html?id='+x.id+'">'+(x.image?'<img src="'+E(x.image)+'" alt="'+E(x.title)+'" loading="lazy">':'')+'<div class="pb"><h3>'+E(x.title)+'</h3><p>'+E(x.meta||'آموزش')+'</p><span class="educationRead">مطالعه آموزش ←</span></div></a>').join('')||'<p class="emptyState">مطالب آموزشی به‌زودی اضافه می‌شوند.</p>';
  }catch(e){console.warn('FireEyar public content could not be loaded:',e);}
}
$('#year').textContent=new Date().getFullYear();
const menuToggle=$('#menuToggle'),siteNav=$('#siteNav');
menuToggle?.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');});
siteNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{siteNav.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');menuToggle?.setAttribute('aria-label','باز کردن منو');}));
const form=$('#form');
form.onsubmit=async e=>{
  e.preventDefault();const msg=$('#msg');msg.textContent='در حال ارسال درخواست...';msg.style.color='#a7f3d0';
  try{const r=await fetch('/api/inquiry',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const j=await r.json();if(!r.ok)throw new Error(j.error||'ارسال درخواست ناموفق بود.');msg.textContent='درخواست شما با موفقیت ثبت شد.';form.reset();}
  catch(x){msg.textContent=x.message||'ارتباط برقرار نشد؛ لطفاً دوباره تلاش کنید.';msg.style.color='#ff9a8e';}
};
boot();
