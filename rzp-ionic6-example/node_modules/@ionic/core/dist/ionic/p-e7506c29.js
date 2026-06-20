/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{f as o,c as s}from"./p-48f74811.js";import{f as t,s as r}from"./p-72cbee20.js";import{c as a}from"./p-18d5f1a9.js";import"./p-89cb27c4.js";const c=()=>{const c=window;c.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(c.innerWidth/2,c.innerHeight/2);if(!o)return;const e=t(o);e&&new Promise((o=>a(e,o))).then((()=>{s((async()=>{e.style.setProperty("--overflow","hidden"),await r(e,300),e.style.removeProperty("--overflow")}))}))}))}))};export{c as startStatusTap}