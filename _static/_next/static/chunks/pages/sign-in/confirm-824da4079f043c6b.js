(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[186],{5166:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sign-in/confirm",function(){return t(7453)}])},7453:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return z}});var n=t(7568),s=t(414),i=t(5893),a=t(7294),o=t(1163),c=t.n(o),l=(t(1664),t(1953)),u=t(3366),h=t(7462),d=t(6010),f=t(4780),v=t(917),m=t(6622),p=t(8884),k=t(1719),x=t(4867);function g(e){return(0,x.Z)("MuiCircularProgress",e)}(0,t(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Z=["className","color","disableShrink","size","style","thickness","value","variant"];let w,S,b,y,P=e=>e;const _=44,C=(0,v.F4)(w||(w=P`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),D=(0,v.F4)(S||(S=P`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),N=(0,k.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,m.Z)(t.color)}`]]}})((({ownerState:e,theme:r})=>(0,h.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,v.iv)(b||(b=P`
      animation: ${0} 1.4s linear infinite;
    `),C))),j=(0,k.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),M=(0,k.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.circle,r[`circle${(0,m.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})((({ownerState:e,theme:r})=>(0,h.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,v.iv)(y||(y=P`
      animation: ${0} 1.4s ease-in-out infinite;
    `),D)));var E=a.forwardRef((function(e,r){const t=(0,p.Z)({props:e,name:"MuiCircularProgress"}),{className:n,color:s="primary",disableShrink:a=!1,size:o=40,style:c,thickness:l=3.6,value:v=0,variant:k="indeterminate"}=t,x=(0,u.Z)(t,Z),w=(0,h.Z)({},t,{color:s,disableShrink:a,size:o,thickness:l,value:v,variant:k}),S=(e=>{const{classes:r,variant:t,color:n,disableShrink:s}=e,i={root:["root",t,`color${(0,m.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,m.Z)(t)}`,s&&"circleDisableShrink"]};return(0,f.Z)(i,g,r)})(w),b={},y={},P={};if("determinate"===k){const e=2*Math.PI*((_-l)/2);b.strokeDasharray=e.toFixed(3),P["aria-valuenow"]=Math.round(v),b.strokeDashoffset=`${((100-v)/100*e).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,i.jsx)(N,(0,h.Z)({className:(0,d.Z)(S.root,n),style:(0,h.Z)({width:o,height:o},y,c),ownerState:w,ref:r,role:"progressbar"},P,x,{children:(0,i.jsx)(j,{className:S.svg,ownerState:w,viewBox:"22 22 44 44",children:(0,i.jsx)(M,{className:S.circle,style:b,ownerState:w,cx:_,cy:_,r:(_-l)/2,fill:"none",strokeWidth:l})})}))})),I=t(9630),$=t(5462),R=t(1486),z=function(){var e=(0,$.Eu)(),r=(0,a.useRef)(!1),t=(0,a.useState)(!0),o=t[0],u=t[1],h=(0,a.useState)(""),d=h[0],f=h[1],v=function(){var t=(0,n.Z)((function(){var t,n,i,a;return(0,s.__generator)(this,(function(s){switch(s.label){case 0:if(r.current)return[2];if(r.current=!0,!R.P)return f("Zalter authentication not enabled"),u(!1),[2];if(!(t=window.location.hash.substring(1).split("=")[1]))return c().push("/").catch(console.error),[2];s.label=1;case 1:return s.trys.push([1,3,,4]),n={},[4,R.I.signInWithLink("finalize",(n.token=t,n))];case 2:return s.sent(),i={},e.signIn(i),c().push("/").catch(console.error),[3,4];case 3:return a=s.sent(),console.error(a),f(a.message||"Something went wrong"),u(!1),[3,4];case 4:return[2]}}))}));return function(){return t.apply(this,arguments)}}();return(0,a.useEffect)((function(){v().catch(console.error)}),[]),o?(0,i.jsx)(l.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",p:3},children:(0,i.jsx)(E,{})}):d?(0,i.jsxs)(l.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",p:3},children:[(0,i.jsx)(l.Z,{sx:{p:3}}),(0,i.jsx)(I.Z,{sx:{mb:1},variant:"h4",children:"Oops!"}),(0,i.jsx)(I.Z,{variant:"body2",children:d})]}):null}},1163:function(e,r,t){e.exports=t(387)}},function(e){e.O(0,[615,664,774,888,179],(function(){return r=5166,e(e.s=r);var r}));var r=e.O();_N_E=r}]);