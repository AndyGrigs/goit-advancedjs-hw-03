import{a as d,i as l,S as m}from"./assets/vendor-h_xsmXee.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p="https://pixabay.com/api/",g="28460995-5acfdb805ab0c27f2bf717abb";async function h(s){const t=new URLSearchParams({key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return(await d.get(`${p}?${t}`)).data}function y(s){return s.map(({webformatURL:t,largeImageURL:o,tags:i,likes:e,views:r,comments:n,downloads:u})=>`
        <a href=${o} class="gallery_link">
          <img src=${t} alt=${i} loading="lazy">
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
              ${n}

            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${u}

            </p>
          </div>
        </a>
        `).join("")}const a={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector("#loader")};let c=null;a.form.addEventListener("submit",b);async function b(s){s.preventDefault();const t=s.currentTarget.elements.search.value.trim();if(!t){l.warning({title:"Stop!",message:"The field mast be filled up!!!"});return}L();try{a.gallery.innerHTML="";const o=await h(t);if(console.log(o),f(),o.hits.length===0){l.error({title:"No results!"});return}const i=y(o.hits);a.gallery.insertAdjacentHTML("beforeend",i),a.form.reset(),c?c.refresh():c=new m(".gallery a",{close:!0})}catch(o){f(),console.error(o),l.error({title:"Error",message:"Something went wrong. Please try again later."})}}function L(){a.loader.classList.add("visible")}function f(){a.loader.classList.remove("visible")}
//# sourceMappingURL=index.js.map
