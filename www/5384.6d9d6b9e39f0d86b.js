"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5384],{5384:(b,c,i)=>{i.r(c),i.d(c,{VideosPageModule:()=>P});var l=i(6895),g=i(433),n=i(5035),u=i(2598),m=i(655),e=i(8256),f=i(1481);function h(t,s){if(1&t&&(e.TgZ(0,"div")(1,"ion-text",2),e._uU(2),e.qZA(),e._UZ(3,"br")(4,"br")(5,"iframe",3)(6,"br")(7,"br"),e.qZA()),2&t){const o=s.$implicit;e.xp6(2),e.Oqu(o.titulo),e.xp6(3),e.Q6J("src",o.link,e.uOi)}}const v=[{path:"",component:(()=>{class t{constructor(o){this.sanitizer=o,this.items=[],this.Obtener=()=>(0,m.mG)(this,void 0,void 0,function*(){yield fetch("https://adamix.net/defensa_civil/def/videos.php").then(a=>a.json()).then(a=>{const p=[],{datos:d}=a;for(let r=0;r<d.length;r++){const V={descripcion:d[r].descripcion,fecha:d[r].fecha,id:d[r].id,link:this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${d[r].link}`),titulo:d[r].titulo};p.push(V)}this.items=p})}),this.Obtener()}ngOnInit(){}ionViewDidLoad(){this.Obtener()}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(f.H7))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-videos"]],decls:9,vars:1,consts:[["slot","start"],[4,"ngFor","ngForOf"],[1,"text-video","ion-text-center"],["frameborder","0","width","100%","height","300px","allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture","allowfullscreen","",3,"src"]],template:function(o,a){1&o&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Videos"),e.qZA()()(),e.TgZ(6,"ion-content"),e._UZ(7,"br"),e.YNc(8,h,8,2,"div",1),e.qZA()),2&o&&(e.xp6(8),e.Q6J("ngForOf",a.items))},dependencies:[l.sg,n.Sm,n.W2,n.Gu,n.fG,n.yW,n.wd,n.sr],styles:[".text-video[_ngcontent-%COMP%]{font-weight:700}"]}),t})()}];let y=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.Bz.forChild(v),u.Bz]}),t})(),P=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,g.u5,n.Pc,y]}),t})()}}]);