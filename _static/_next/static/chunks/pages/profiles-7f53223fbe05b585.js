(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[550],{5398:function(n,e,t){"use strict";var r=t(4836);e.Z=void 0;var i=r(t(4938)),o=t(5893),c=(0,i.default)((0,o.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");e.Z=c},721:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profiles",function(){return t(2113)}])},9208:function(n,e,t){"use strict";t.d(e,{I:function(){return u}});var r=t(6042),i=t(9396),o=t(9534),c=t(5893),a=t(5697),s=t.n(a),l=(0,t(1719).ZP)("span")((function(n){var e=n.theme,t=n.ownerState;return{alignItems:"center",backgroundColor:e.palette[t.color].main,borderRadius:12,color:e.palette[t.color].contrastText,cursor:"default",display:"inline-flex",flexGrow:0,flexShrink:0,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(12),lineHeight:2,fontWeight:600,justifyContent:"center",letterSpacing:.5,minWidth:20,paddingLeft:e.spacing(1),paddingRight:e.spacing(1),textTransform:"uppercase",whiteSpace:"nowrap"}})),u=function(n){var e=n.color,t=void 0===e?"primary":e,a=n.children,s=(0,o.Z)(n,["color","children"]),u={color:t};return(0,c.jsx)(l,(0,i.Z)((0,r.Z)({ownerState:u},s),{children:a}))};u.propTypes={children:s().node,color:s().oneOf(["primary","secondary","error","info","warning","success"])}},2113:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return k}});var r=t(5893),i=t(9008),o=t.n(i),c=t(7294),a=t(196),s=t(9630),l=t(1953),u=t(6336),d=t(9072),f=t(8114),p=t(6042),h=t(9396),x=t(9534),m=t(5697),g=t.n(m),j=t(9837),Z=t(1359),y=t(4373),v=t(5398),_=t(9208),w=function(n){var e=n.profile,t=(0,x.Z)(n,["profile"]);return(0,r.jsxs)(j.Z,(0,h.Z)((0,p.Z)({sx:{display:"flex",flexDirection:"column",height:"100%"}},t),{children:[(0,r.jsxs)(Z.Z,{children:[(0,r.jsx)(l.Z,{sx:{display:"flex",justifyContent:"center",pb:3},children:(0,r.jsx)(v.Z,{fontSize:"large"})}),(0,r.jsxs)(s.Z,{align:"center",color:"textPrimary",gutterBottom:!0,variant:"h6",children:[e.first_name," ",e.last_name]}),(0,r.jsx)(s.Z,{align:"center",color:"textPrimary",variant:"body1",children:(0,r.jsx)(_.I,{color:!0===e.is_admin?"success":!1===e.is_admin&&"warning",children:1==e.is_admin?"admin":"consultant"})})]}),(0,r.jsx)(l.Z,{sx:{flexGrow:1}}),(0,r.jsx)(y.Z,{})]}))};w.propTypes={product:g().object.isRequired};var P=t(1437),S=function(){var n=localStorage.getItem("token"),e=(0,c.useState)([]),t=e[0],i=e[1],p=(0,c.useState)(null),h=p[0],x=p[1],m=(0,c.useState)(1),g=m[0],j=m[1];(0,c.useEffect)((function(){a.ZP.get("http://127.0.0.1:8000/backend/profile-list/?size="+"".concat(6)+"&page="+"".concat(g),{headers:{"Content-Type":"application/json",Authorization:"Token ".concat(n)}}).then((function(n){x(n.data.count),i(n.data.results)})).catch((function(n){console.log("error message",n)}))}),[g]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o(),{children:(0,r.jsx)("title",{children:"Profils | Gestion de r\xe9clamations"})}),(0,r.jsx)(l.Z,{component:"main",sx:{flexGrow:1,py:8},children:(0,r.jsxs)(u.Z,{maxWidth:!1,children:[(0,r.jsx)(s.Z,{sx:{m:1},variant:"h4",children:"Profils"}),(0,r.jsx)(l.Z,{sx:{pt:3},children:(0,r.jsx)(d.ZP,{container:!0,spacing:3,children:t.map((function(n){return(0,r.jsx)(d.ZP,{item:!0,lg:4,md:6,xs:12,children:(0,r.jsx)(w,{profile:n})},n.id)}))})}),(0,r.jsx)(l.Z,{sx:{display:"flex",justifyContent:"center",pt:3},children:(0,r.jsx)(f.Z,{color:"primary",page:g,count:Math.ceil(h/6),onChange:function(n,e){n.preventDefault(),j(e)}})})]})})]})};S.getLayout=function(n){return(0,r.jsx)(P.c,{children:n})};var k=S}},function(n){n.O(0,[615,583,936,664,971,72,49,114,437,774,888,179],(function(){return e=721,n(n.s=e);var e}));var e=n.O();_N_E=e}]);