'use strict';
const $=s=>document.querySelector(s);
const E=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function boot(){
  try{
    const response=await fetch('/api/public',{headers:{accept:'application/json'}});
    if(!response.ok)throw new Error('Public data unavailable');
    const d=await response.json(),s=d.settings||{};
    const brand=s.brand||'آتش‌آفرا';
    document.title=s.seo_title||`${brand} | سیستم‌های اعلام حریق و خدمات برق`;
    const description=document.querySelector('meta[name="description"]');
    if(description&&s.seo_description)description.content=s.seo_description;
    ['brand','footerBrand'].forEach(id=>{const el=$('#'+id);if(el)el.textContent=brand;});
    const footerBrandText=$('#footerBrandText');if(footerBrandText)footerBrandText.textContent=brand;
    $('#heroTitle').textContent=s.hero_title||'ایمنی، سرمایهٔ زندگی شماست.';
    $('#heroSubtitle').textContent=s.hero_subtitle||'طراحی، اجرا و نگهداری سیستم‌های اعلام حریق و ارائه خدمات برق ساختمان و صنعت، با توجه به نیاز هر پروژه.';
    $('#aboutTitle').textContent=s.about_title||'ایمنی، با اجرای درست آغاز می‌شود.';
    $('#aboutBody').textContent=s.about_body||'آتش‌آفرا با تمرکز بر خدمات فنی اعلام حریق و برق، به دنبال ارائه راهکارهایی متناسب با نیاز هر پروژه است.';
    const cityEl=$('#city'),phoneEl=$('#phone'),emailEl=$('#email');
    cityEl.textContent=s.city||'';phoneEl.textContent=s.phone||'';emailEl.textContent=s.email||'';
    cityEl.closest('.contactDetail').hidden=!s.city;
    phoneEl.closest('.contactDetail').hidden=!s.phone;
    emailEl.closest('.contactDetail').hidden=!s.email;
    $('.contactDetails').hidden=!(s.city||s.phone||s.email);
    $('#servicesGrid').innerHTML=(d.services||[]).map((x,i)=>`<article class="card"><div class="n">${String(i+1).padStart(2,'0')}</div><h3>${E(x.title)}</h3><p>${E(x.body)}</p></article>`).join('')||'<p class="emptyState">اطلاعات خدمات در حال تکمیل است.</p>';
    $('#projectsGrid').innerHTML=(d.projects||[]).map(x=>`<article class="project">${x.image?`<img src="${E(x.image)}" alt="${E(x.title)}" loading="lazy" onerror="this.style.display='none'">`:''}<div class="pb"><h3>${E(x.title)}</h3><p>${E(x.meta||'پروژه')}</p>${x.body?`<p>${E(x.body)}</p>`:''}</div></article>`).join('')||'<p class="emptyState lightEmpty">نمونه‌پروژه‌ها در حال تکمیل هستند.</p>';
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
