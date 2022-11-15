(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{6250:function(e,t,a){"use strict";a.d(t,{Z:function(){return j}});var n=a(3366),r=a(7462),o=a(7294),i=a(6010),s=a(4780),l=a(9630),c=a(8884),d=a(1719),u=a(4867);function m(e){return(0,u.Z)("MuiCardHeader",e)}var h=(0,a(1588).Z)("MuiCardHeader",["root","avatar","action","content","title","subheader"]),p=a(5893);const f=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],x=(0,d.ZP)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,t)=>(0,r.Z)({[`& .${h.title}`]:t.title,[`& .${h.subheader}`]:t.subheader},t.root)})({display:"flex",alignItems:"center",padding:16}),v=(0,d.ZP)("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(e,t)=>t.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),Z=(0,d.ZP)("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(e,t)=>t.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),g=(0,d.ZP)("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(e,t)=>t.content})({flex:"1 1 auto"});var j=o.forwardRef((function(e,t){const a=(0,c.Z)({props:e,name:"MuiCardHeader"}),{action:o,avatar:d,className:u,component:h="div",disableTypography:j=!1,subheader:y,subheaderTypographyProps:b,title:P,titleTypographyProps:_}=a,C=(0,n.Z)(a,f),T=(0,r.Z)({},a,{component:h,disableTypography:j}),N=(e=>{const{classes:t}=e;return(0,s.Z)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},m,t)})(T);let w=P;null==w||w.type===l.Z||j||(w=(0,p.jsx)(l.Z,(0,r.Z)({variant:d?"body2":"h5",className:N.title,component:"span",display:"block"},_,{children:w})));let k=y;return null==k||k.type===l.Z||j||(k=(0,p.jsx)(l.Z,(0,r.Z)({variant:d?"body2":"body1",className:N.subheader,color:"text.secondary",component:"span",display:"block"},b,{children:k}))),(0,p.jsxs)(x,(0,r.Z)({className:(0,i.Z)(N.root,u),as:h,ref:t,ownerState:T},C,{children:[d&&(0,p.jsx)(v,{className:N.avatar,ownerState:T,children:d}),(0,p.jsxs)(g,{className:N.content,ownerState:T,children:[w,k]}),o&&(0,p.jsx)(Z,{className:N.action,ownerState:T,children:o})]}))}))},5458:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/account",function(){return a(7526)}])},7526:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return P}});var n=a(5893),r=a(9008),o=a.n(r),i=a(1953),s=a(6336),l=a(9630),c=a(9072),d=a(6042),u=a(9396),m=a(7294),h=a(196),p=a(9837),f=a(6250),x=a(4373),v=a(1359),Z=a(7836),g=a(5084),j=function(e){var t="http://127.0.0.1:8000/backend/profile/me/",a=localStorage.getItem("token"),r=(0,m.useState)(""),o=r[0],s=r[1],l=(0,m.useState)(""),j=l[0],y=l[1],b=(0,m.useState)(""),P=b[0],_=b[1],C=(0,m.useState)(!1),T=C[0],N=C[1];return(0,m.useEffect)((function(){h.ZP.get(t,{headers:{"Content-Type":"application/json",Authorization:"Token ".concat(a)}}).then((function(e){s(e.data.first_name),y(e.data.last_name),_(e.data.email),N(e.data.is_admin)})).catch((function(e){console.log("error message",e)}))}),[]),(0,n.jsx)("form",(0,u.Z)((0,d.Z)({autoComplete:"off",noValidate:!0},e),{children:(0,n.jsxs)(p.Z,{children:[(0,n.jsx)(f.Z,{subheader:"Les informations peuvent \xeatre modifi\xe9es",title:"Profil"}),(0,n.jsx)(x.Z,{}),(0,n.jsx)(v.Z,{children:(0,n.jsxs)(c.ZP,{container:!0,spacing:3,children:[(0,n.jsx)(c.ZP,{item:!0,md:6,xs:12,children:(0,n.jsx)(Z.Z,{fullWidth:!0,label:"Pr\xe9nom",name:"first_name",onChange:function(e){return s(e.target.value)},value:o,variant:"outlined"})}),(0,n.jsx)(c.ZP,{item:!0,md:6,xs:12,children:(0,n.jsx)(Z.Z,{fullWidth:!0,label:"Nom",name:"last_name",onChange:function(e){return y(e.target.value)},value:j,variant:"outlined"})}),(0,n.jsx)(c.ZP,{item:!0,md:6,xs:12,children:(0,n.jsx)(Z.Z,{fullWidth:!0,label:"Addresse Email",name:"email",onChange:function(e){return _(e.target.value)},value:P,variant:"outlined"})}),(0,n.jsx)(c.ZP,{item:!0,md:6,xs:12,children:(0,n.jsx)(Z.Z,{fullWidth:!0,label:"Type du compte",name:"phone",disabled:!0,value:1==T?"admin":"consultant",variant:"outlined"})})]})}),(0,n.jsx)(x.Z,{}),(0,n.jsx)(i.Z,{sx:{display:"flex",justifyContent:"flex-end",p:2},children:(0,n.jsx)(g.Z,{color:"primary",variant:"contained",onClick:function(){h.ZP.put(t,{first_name:o,last_name:j,email:P},{headers:{"Content-Type":"application/json",Authorization:"Token ".concat(a)}}).then((function(e){})).catch((function(e){console.log("error message",e)}))},children:"Enregistrer les modifications"})})]})}))},y=a(1437),b=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o(),{children:(0,n.jsx)("title",{children:"Mon compte | Gestion de r\xe9clamations"})}),(0,n.jsx)(i.Z,{component:"main",sx:{flexGrow:1,py:8},children:(0,n.jsxs)(s.Z,{maxWidth:"lg",children:[(0,n.jsx)(l.Z,{sx:{mb:3},variant:"h4",children:"Mon compte"}),(0,n.jsx)(c.ZP,{container:!0,spacing:3,children:(0,n.jsx)(c.ZP,{item:!0,lg:11,md:7,xs:14,children:(0,n.jsx)(j,{})})})]})})]})};b.getLayout=function(e){return(0,n.jsx)(y.c,{children:e})};var P=b}},function(e){e.O(0,[615,583,936,664,836,971,72,49,437,774,888,179],(function(){return t=5458,e(e.s=t);var t}));var t=e.O();_N_E=t}]);