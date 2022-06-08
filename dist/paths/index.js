"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var d=require("path");function g(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var u=g(d);const P=/^\.{1,2}\//,m=/\*/g,f=(t,r)=>{const e=t.match(m);if(e&&e.length>1)throw new Error(r)};function v(t){if(t.includes("*")){const[r,e]=t.split("*");return{prefix:r,suffix:e}}return t}const x=({prefix:t,suffix:r},e)=>e.startsWith(t)&&e.endsWith(r);function y(t,r,e){return Object.entries(t).map(([a,h])=>(f(a,`Pattern '${a}' can have at most one '*' character.`),{pattern:v(a),substitutions:h.map(o=>{if(f(o,`Substitution '${o}' in pattern '${a}' can have at most one '*' character.`),!o.startsWith("./")&&!r)throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");return u.default.join(e,o)})}))}function b(t){if(!t.config.compilerOptions)return null;const{baseUrl:r,paths:e}=t.config.compilerOptions;if(!r&&!e)return null;const a=u.default.resolve(u.default.dirname(t.path),r||"."),h=e?y(e,r,a):[];return function(s){if(P.test(s))return[];const l=[];for(const n of h){if(n.pattern===s)return n.substitutions;typeof n.pattern!="string"&&l.push(n)}let i,c=-1;for(const n of l)x(n.pattern,s)&&n.pattern.prefix.length>c&&(c=n.pattern.prefix.length,i=n);if(!i)return r?[u.default.join(a,s)]:[];const p=s.slice(i.pattern.prefix.length,s.length-i.pattern.suffix.length);return i.substitutions.map(n=>n.replace("*",p))}}exports.createPathsMatcher=b;
