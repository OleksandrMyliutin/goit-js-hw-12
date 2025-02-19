import{a as u,S as d,i as l}from"./assets/vendor-D0cagnvz.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const f=u.create({baseURL:"https://pixabay.com/api/",params:{key:"48847177-927ba4e40b84ac1d7e4adedbb",image_type:"photo",orientation:"horizontal",safesearch:!0}});async function p(r){return(await f.get("",{params:{q:r}})).data.hits}function m(r){const{largeImageURL:i,webformatURL:a,tags:o,likes:e,views:t,comments:n,downloads:c}=r;return`<li>
            <div class="card">
              <a class="gallery-link" href="${i}">
                  <img
                    class="card-image"
                    src="${a}"
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
                  <li><p>${n}</p></li>
                </ul>
                <ul>
                  <li><h5>Downloads</h5></li>
                  <li><p>${c}</p></li>
                </ul>
              </div>
            </div>
          </li>`}function g(r){return r.map(m).join("")}const s={cardList:document.querySelector(".card-list"),form:document.querySelector(".form-style"),loader:document.querySelector(".loader")};s.form.addEventListener("submit",y);let h=new d(".card-list a",{captionsData:"alt",captionDelay:250});function y(r){r.preventDefault();const i=r.currentTarget.elements.query.value.trim();if(!i){l.warning({title:"Warning",message:"⚠️ Please enter a search query!",position:"topRight"});return}s.cardList.innerHTML="",s.loader.style.display="block";async function a(){const o=await p(i);try{if(!o.length){l.info({title:"Not found",message:"😢 No images found.",position:"topRight"}),s.cardList.innerHTML="";return}s.cardList.innerHTML=g(o),h.refresh()}catch(e){l.error({title:"Error",message:"🚨 Something went wrong. Please try again!",position:"topRight"}),console.error("❌ API request error:",e),s.cardList.innerHTML=""}finally{s.loader.style.display="none"}}a(),r.currentTarget.reset()}
//# sourceMappingURL=index.js.map
