import{a as g,S as h,i as l}from"./assets/vendor-D0cagnvz.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();let c=1,u=40,p=0;const b=g.create({baseURL:"https://pixabay.com/api/",params:{key:"48847177-927ba4e40b84ac1d7e4adedbb",image_type:"photo",orientation:"horizontal",safesearch:!0}});async function L(o,i){const s=await b.get("",{params:{q:o,per_page:u,page:i}});return p=s.data.totalHits,s.data.hits}function f(o){c=o}function w(o){const{largeImageURL:i,webformatURL:s,tags:a,likes:e,views:t,comments:n,downloads:m}=o;return`<li>
            <div class="card">
              <a class="gallery-link" href="${i}">
                  <img
                    class="card-image"
                    src="${s}"
                    alt="${a}"
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
                  <li><p>${m}</p></li>
                </ul>
              </div>
            </div>
          </li>`}function M(o){return o.map(w).join("")}const r={cardList:document.querySelector(".card-list"),form:document.querySelector(".form-style"),loader:document.querySelector(".loader"),btnMore:document.querySelector(".btn-more")};let v=new h(".card-list a",{captionsData:"alt",captionDelay:250}),d="";r.form.addEventListener("submit",q);r.btnMore.addEventListener("click",()=>y(d));r.btnMore.style.display="none";async function q(o){o.preventDefault();const i=o.currentTarget.elements.query.value.trim();if(!i){l.warning({title:"Warning",message:"⚠️ Please enter a search query!",position:"topRight"});return}d=i,r.cardList.innerHTML="",r.loader.style.display="block",r.btnMore.style.display="none",f(1),await y(d,!0),o.currentTarget.reset()}async function y(o,i=!1){var a;r.loader.style.display="block";const s=c;try{const e=await L(o,s);if(!e.length){l.info({title:"Not found",message:"😢 No images found.",position:"topRight"}),r.loader.style.display="none",r.btnMore.style.display="none",r.cardList.innerHTML="";return}i&&(r.cardList.innerHTML=""),r.cardList.insertAdjacentHTML("beforeend",M(e)),v.refresh();const t=((a=document.querySelector(".card-list .card"))==null?void 0:a.getBoundingClientRect().height)||0;window.scrollBy({top:t*2,behavior:"smooth"}),f(c+1),c*u>=p?(r.btnMore.style.display="none",l.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):r.btnMore.style.display="block"}catch(e){l.error({title:"Error",message:"🚨 Something went wrong. Please try again!",position:"topRight"}),console.error("❌ API request error:",e)}finally{r.loader.style.display="none"}}
//# sourceMappingURL=index.js.map
