import{a as u,S as d,i as l}from"./assets/vendor-D0cagnvz.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const f=u.create({baseURL:"https://pixabay.com/api/",params:{key:"48847177-927ba4e40b84ac1d7e4adedbb",image_type:"photo",orientation:"horizontal",safesearch:!0}});function p(r){return f.get("",{params:{q:r}}).then(i=>i.data.hits)}function m(r){const{largeImageURL:i,webformatURL:n,tags:o,likes:e,views:t,comments:a,downloads:c}=r;return`<li>
            <div class="card">
              <a class="gallery-link" href="${i}">
                  <img
                    class="card-image"
                    src="${n}"
                    alt="${o}"
                  />
              </a>
              <div class="card-content">
                <ul>
                  <li><h5>Likes</h5></li>
                  <li><p>${e}</p></li>
                </ul>
                <ul>
                  <li><h5>Views</h5></li>
                  <li><p>${t}</p></li>
                </ul>
                <ul>
                  <li><h5>Comments</h5></li>
                  <li><p>${a}</p></li>
                </ul>
                <ul>
                  <li><h5>Downloads</h5></li>
                  <li><p>${c}</p></li>
                </ul>
              </div>
            </div>
          </li>`}function h(r){return r.map(m).join("")}const s={cardList:document.querySelector(".card-list"),form:document.querySelector(".form-style"),loader:document.querySelector(".loader")};s.form.addEventListener("submit",y);let g=new d(".card-list a",{captionsData:"alt",captionDelay:250});function y(r){r.preventDefault();const i=r.currentTarget.elements.query.value.trim();if(!i){l.warning({title:"Warning",message:"⚠️ Please enter a search query!",position:"topRight"});return}s.cardList.innerHTML="",s.loader.style.display="block";function n(){p(i).then(o=>{if(!o.length){l.info({title:"Not found",message:"😢 No images found.",position:"topRight"}),s.cardList.innerHTML="";return}s.cardList.innerHTML=h(o),g.refresh()}).catch(o=>{l.error({title:"Error",message:"🚨 Something went wrong. Please try again!",position:"topRight"}),console.error("❌ API request error:",o),s.cardList.innerHTML=""}).finally(()=>{s.loader.style.display="none"})}n(),r.currentTarget.reset()}
//# sourceMappingURL=index.js.map
