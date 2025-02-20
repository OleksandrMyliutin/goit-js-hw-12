import{a as f,S as m,i as c}from"./assets/vendor-D0cagnvz.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();let l=1,d=40;const g=f.create({baseURL:"https://pixabay.com/api/",params:{key:"48847177-927ba4e40b84ac1d7e4adedbb",image_type:"photo",orientation:"horizontal",safesearch:!0}});async function h(o,i){return(await g.get("",{params:{q:o,per_page:d,page:i}})).data.hits}function u(o){l=o}function y(o){const{largeImageURL:i,webformatURL:s,tags:n,likes:e,views:t,comments:a,downloads:p}=o;return`<li>
            <div class="card">
              <a class="gallery-link" href="${i}">
                  <img
                    class="card-image"
                    src="${s}"
                    alt="${n}"
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
                  <li><p>${p}</p></li>
                </ul>
              </div>
            </div>
          </li>`}function b(o){return o.map(y).join("")}const r={cardList:document.querySelector(".card-list"),form:document.querySelector(".form-style"),loader:document.querySelector(".loader"),btnMore:document.querySelector(".btn-more")};let L=new m(".card-list a",{captionsData:"alt",captionDelay:250});const w=Math.ceil(100/d);r.form.addEventListener("submit",v);function v(o){o.preventDefault();const i=o.currentTarget.elements.query.value.trim();if(!i){c.warning({title:"Warning",message:"⚠️ Please enter a search query!",position:"topRight"});return}r.cardList.innerHTML="",r.loader.style.display="block",u(1);async function s(){const e=await h(i,l);if(e.length&&u(l+1),l>w)return c.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});try{if(!e.length){c.info({title:"Not found",message:"😢 No images found.",position:"topRight"}),r.loader.style.display="none",r.btnMore.style.display="none",r.cardList.innerHTML="";return}l>1&&(r.btnMore.style.display="block",r.btnMore.addEventListener("click",s)),r.cardList.insertAdjacentHTML("beforeend",b(e));const t=document.querySelector(".card-list .card").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"}),L.refresh()}catch(t){c.error({title:"Error",message:"🚨 Something went wrong. Please try again!",position:"topRight"}),r.loader.style.display="none",r.btnMore.style.display="none",console.error("❌ API request error:",t),r.cardList.innerHTML=""}finally{r.loader.style.display="none"}}s(),o.currentTarget.reset()}
//# sourceMappingURL=index.js.map
