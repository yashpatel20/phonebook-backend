(this["webpackJsonpphonebook-frontend"]=this["webpackJsonpphonebook-frontend"]||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(13),r=t.n(c),l=(t(20),t(14)),o=t(2),i=function(e){return u.a.createElement("div",null,u.a.createElement("span",null,e.name," ",e.number),u.a.createElement("span",null,u.a.createElement("button",{value:e.name,onClick:e.handleDelete,style:{color:"blue"}},"delete")))},s=t(3),m=t.n(s),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},b=function(e){return m.a.post(f,e).then((function(e){return e.data}))},h=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return console.log(e),e.data}))},E=(t(38),function(e){var n="";return null==e.message?null:(n=e.message[0]?"successful":"unsuccessful",u.a.createElement("div",{className:n},e.message[1]))}),p=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),s=Object(o.a)(r,2),m=s[0],f=s[1],p=Object(a.useState)(""),g=Object(o.a)(p,2),j=g[0],O=g[1],k=Object(a.useState)(""),w=Object(o.a)(k,2),S=w[0],y=w[1],C=Object(a.useState)(!0),D=Object(o.a)(C,2),B=D[0],J=D[1],N=Object(a.useState)([!0,"Read successful"]),W=Object(o.a)(N,2),x=W[0],A=W[1];Object(a.useEffect)((function(){d().then((function(e){return c(e)}))}),[]);var F=function(e){var n=t.find((function(n){return n.name===e.target.value}));v(n.id).then((function(e){A([!0,"Delete successful"]),d().then((function(e){return c(e)}))}))},I=(B?t:t.filter((function(e){return e.name===S}))).map((function(e){return u.a.createElement("div",null,u.a.createElement(i,{key:e.name,name:e.name,number:e.number,handleDelete:F}))}));return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(E,{message:x}),u.a.createElement("div",null,"Filter:"," ",u.a.createElement("input",{value:S,onChange:function(e){y(e.target.value),J(!1)}})),u.a.createElement("h2",null,"Add a new"),u.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:m,number:j},a=t.find((function(e){return e.name===n.name&&e.number!==n.number}));if(a){var u=Object(l.a)({},a,{number:n.number});h(a.id,u).then((function(e){c(t.map((function(n){return n.id!==a.id?n:e}))),A([!0,"Update successful"])})).catch()}else b(n).then((function(e){c(t.concat(e)),A([!0,"Create successful"]),f(""),O("")}))}},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:m,onChange:function(e){return f(e.target.value)}})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:j,onChange:function(e){return O(e.target.value)}})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))),u.a.createElement("h2",null,"Numbers"),u.a.createElement("div",null,I))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(u.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.9ab3fa44.chunk.js.map