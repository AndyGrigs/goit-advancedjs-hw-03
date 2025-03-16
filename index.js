import{i as l,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",p="28460995-5acfdb805ab0c27f2bf717abb";async function g(s){const o=new URLSearchParams({key:p,q:s,image_type:"photo",orientation:"horizontal"}),t=await fetch(`${m}?${o}`);if(!t.ok)throw new Error(t.statusText);return await t.json()}function h(s){return s.map(({webformatURL:o,largeImageURL:t,tags:i,likes:e,views:r,comments:a,downloads:u})=>`
        <a href=${t} class="gallery_link">
          <img src=${o} alt=${i} loading="lazy">
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${e}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${r}

            </p>
            <p class="info-item">
              <b>comments</b>
              ${a}

            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${u}

            </p>
          </div>
        </a>
        `).join("")}const n={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector("#loader")};let c=null;n.form.addEventListener("submit",y);async function y(s){s.preventDefault();const o=s.currentTarget.elements.search.value.trim();if(!o){l.warning({title:"Stop!",message:"The field mast be filled up!!!"});return}b();try{n.gallery.innerHTML="";const t=await g(o);if(console.log(t),f(),t.hits.length===0){l.error({title:"No results!"});return}const i=h(t.hits);n.gallery.insertAdjacentHTML("beforeend",i),n.form.reset(),c?c.refresh():c=new d(".gallery a",{close:!0})}catch(t){f(),console.error(t),l.error({title:"Error",message:"Something went wrong. Please try again later."})}}function b(){n.loader.classList.add("visible")}function f(){n.loader.classList.remove("visible")}
//# sourceMappingURL=index.js.map
