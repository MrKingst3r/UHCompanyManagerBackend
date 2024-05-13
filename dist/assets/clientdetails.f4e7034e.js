import{a as u,e as w,L as m,M as c,T as D,N as B,j as h,H as V,f as g,w as f,O,F as N,h as C,t as S,P as $,_ as K,k as U,u as R,s as T,o as I,c as y,b as s,v as _,Q as q,R as j,S as z,U as W,V as X,W as Z,X as Q,Y,Z as J,i as ee,K as te,$ as se,a0 as ie}from"./index.c48648ec.js";import{u as le}from"./index.2144ae6b.js";import{r as k,e as ne,n as oe,m as re,a as ae}from"./index.e9e45b16.js";function x(e){return e===0?!1:Array.isArray(e)&&e.length===0?!0:!e}function de(e){return(...t)=>!e(...t)}function ue(e,t){return e===void 0&&(e="undefined"),e===null&&(e="null"),e===!1&&(e="false"),e.toString().toLowerCase().indexOf(t.trim())!==-1}function A(e,t,l,i){return t?e.filter(r=>ue(i(r,l),t)).sort((r,d)=>i(r,l).length-i(d,l).length):e}function he(e){return e.filter(t=>!t.$isLabel)}function E(e,t){return l=>l.reduce((i,r)=>r[e]&&r[e].length?(i.push({$groupLabel:r[t],$isLabel:!0}),i.concat(r[e])):i,[])}function ce(e,t,l,i,r){return d=>d.map(n=>{if(!n[l])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];const o=A(n[l],e,t,r);return o.length?{[i]:n[i],[l]:o}:[]})}const M=(...e)=>t=>e.reduce((l,i)=>i(l),t);var pe={data(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default(e,t){return x(e)?"":t?e[t]:e}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1},preventAutofocus:{type:Boolean,default:!1}},mounted(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue(){return this.modelValue||this.modelValue===0?Array.isArray(this.modelValue)?this.modelValue:[this.modelValue]:[]},filteredOptions(){const e=this.search||"",t=e.toLowerCase().trim();let l=this.options.concat();return this.internalSearch?l=this.groupValues?this.filterAndFlat(l,t,this.label):A(l,t,this.label,this.customLabel):l=this.groupValues?E(this.groupValues,this.groupLabel)(l):l,l=this.hideSelected?l.filter(de(this.isSelected)):l,this.taggable&&t.length&&!this.isExistingOption(t)&&(this.tagPosition==="bottom"?l.push({isTag:!0,label:e}):l.unshift({isTag:!0,label:e})),l.slice(0,this.optionsLimit)},valueKeys(){return this.trackBy?this.internalValue.map(e=>e[this.trackBy]):this.internalValue},optionKeys(){return(this.groupValues?this.flatAndStrip(this.options):this.options).map(t=>this.customLabel(t,this.label).toString().toLowerCase())},currentOptionLabel(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:{handler(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("update:modelValue",this.multiple?[]:null))},deep:!0},search(){this.$emit("search-change",this.search)}},emits:["open","search-change","close","select","update:modelValue","remove","tag"],methods:{getValue(){return this.multiple?this.internalValue:this.internalValue.length===0?null:this.internalValue[0]},filterAndFlat(e,t,l){return M(ce(t,l,this.groupValues,this.groupLabel,this.customLabel),E(this.groupValues,this.groupLabel))(e)},flatAndStrip(e){return M(E(this.groupValues,this.groupLabel),he)(e)},updateSearch(e){this.search=e},isExistingOption(e){return this.options?this.optionKeys.indexOf(e)>-1:!1},isSelected(e){const t=this.trackBy?e[this.trackBy]:e;return this.valueKeys.indexOf(t)>-1},isOptionDisabled(e){return!!e.$isDisabled},getOptionLabel(e){if(x(e))return"";if(e.isTag)return e.label;if(e.$isLabel)return e.$groupLabel;const t=this.customLabel(e,this.label);return x(t)?"":t},select(e,t){if(e.$isLabel&&this.groupSelect){this.selectGroup(e);return}if(!(this.blockKeys.indexOf(t)!==-1||this.disabled||e.$isDisabled||e.$isLabel)&&!(this.max&&this.multiple&&this.internalValue.length===this.max)&&!(t==="Tab"&&!this.pointerDirty)){if(e.isTag)this.$emit("tag",e.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(e)){t!=="Tab"&&this.removeElement(e);return}this.multiple?this.$emit("update:modelValue",this.internalValue.concat([e])):this.$emit("update:modelValue",e),this.$emit("select",e,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup(e){const t=this.options.find(l=>l[this.groupLabel]===e.$groupLabel);if(!!t){if(this.wholeGroupSelected(t)){this.$emit("remove",t[this.groupValues],this.id);const l=this.trackBy?t[this.groupValues].map(r=>r[this.trackBy]):t[this.groupValues],i=this.internalValue.filter(r=>l.indexOf(this.trackBy?r[this.trackBy]:r)===-1);this.$emit("update:modelValue",i)}else{let l=t[this.groupValues].filter(i=>!(this.isOptionDisabled(i)||this.isSelected(i)));this.max&&l.splice(this.max-this.internalValue.length),this.$emit("select",l,this.id),this.$emit("update:modelValue",this.internalValue.concat(l))}this.closeOnSelect&&this.deactivate()}},wholeGroupSelected(e){return e[this.groupValues].every(t=>this.isSelected(t)||this.isOptionDisabled(t))},wholeGroupDisabled(e){return e[this.groupValues].every(this.isOptionDisabled)},removeElement(e,t=!0){if(this.disabled||e.$isDisabled)return;if(!this.allowEmpty&&this.internalValue.length<=1){this.deactivate();return}const l=typeof e=="object"?this.valueKeys.indexOf(e[this.trackBy]):this.valueKeys.indexOf(e);if(this.multiple){const i=this.internalValue.slice(0,l).concat(this.internalValue.slice(l+1));this.$emit("update:modelValue",i)}else this.$emit("update:modelValue",null);this.$emit("remove",e,this.id),this.closeOnSelect&&t&&this.deactivate()},removeLastElement(){this.blockKeys.indexOf("Delete")===-1&&this.search.length===0&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate(){this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&this.pointer===0&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.preventAutofocus||this.$nextTick(()=>this.$refs.search&&this.$refs.search.focus())):this.preventAutofocus||typeof this.$el<"u"&&this.$el.focus(),this.$emit("open",this.id))},deactivate(){!this.isOpen||(this.isOpen=!1,this.searchable?this.$refs.search!==null&&typeof this.$refs.search<"u"&&this.$refs.search.blur():typeof this.$el<"u"&&this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle(){this.isOpen?this.deactivate():this.activate()},adjustPosition(){if(typeof window>"u")return;const e=this.$el.getBoundingClientRect().top,t=window.innerHeight-this.$el.getBoundingClientRect().bottom;t>this.maxHeight||t>e||this.openDirection==="below"||this.openDirection==="bottom"?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(t-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(e-40,this.maxHeight))}}},fe={data(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition(){return this.pointer*this.optionHeight},visibleElements(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions(){this.pointerAdjust()},isOpen(){this.pointerDirty=!1},pointer(){this.$refs.search&&this.$refs.search.setAttribute("aria-activedescendant",this.id+"-"+this.pointer.toString())}},methods:{optionHighlight(e,t){return{"multiselect__option--highlight":e===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(t)}},groupHighlight(e,t){if(!this.groupSelect)return["multiselect__option--disabled",{"multiselect__option--group":t.$isLabel}];const l=this.options.find(i=>i[this.groupLabel]===t.$groupLabel);return l&&!this.wholeGroupDisabled(l)?["multiselect__option--group",{"multiselect__option--highlight":e===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(l)}]:"multiselect__option--disabled"},addPointerElement({key:e}="Enter"){this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset(){!this.closeOnSelect||(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet(e){this.pointer=e,this.pointerDirty=!0}}},P={name:"vue-multiselect",mixins:[pe,fe],compatConfig:{MODE:3,ATTR_ENUMERATED_COERCION:!1},props:{name:{type:String,default:""},modelValue:{type:null,default(){return[]}},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:e=>`and ${e} more`},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{hasOptionGroup(){return this.groupValues&&this.groupLabel&&this.groupSelect},isSingleLabelVisible(){return(this.singleValue||this.singleValue===0)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible(){return!this.internalValue.length&&(!this.searchable||!this.isOpen)},visibleValues(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue(){return this.internalValue[0]},deselectLabelText(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText(){return this.showLabels?this.selectLabel:""},selectGroupLabelText(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText(){return this.showLabels?this.selectedLabel:""},inputStyle(){return this.searchable||this.multiple&&this.modelValue&&this.modelValue.length?this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}:""},contentStyle(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove(){return this.openDirection==="above"||this.openDirection==="top"?!0:this.openDirection==="below"||this.openDirection==="bottom"?!1:this.preferredOpenDirection==="above"},showSearchInput(){return this.searchable&&(this.hasSingleSelectedSlot&&(this.visibleSingleValue||this.visibleSingleValue===0)?this.isOpen:!0)}}};const me={ref:"tags",class:"multiselect__tags"},ge={class:"multiselect__tags-wrap"},be={class:"multiselect__spinner"},ye={key:0},ve={class:"multiselect__option"},we={class:"multiselect__option"},_e=$("No elements found. Consider changing the search query."),Ve={class:"multiselect__option"},Se=$("List is empty.");function Le(e,t,l,i,r,d){return u(),w("div",{tabindex:e.searchable?-1:l.tabindex,class:[{"multiselect--active":e.isOpen,"multiselect--disabled":l.disabled,"multiselect--above":d.isAbove,"multiselect--has-options-group":d.hasOptionGroup},"multiselect"],onFocus:t[14]||(t[14]=n=>e.activate()),onBlur:t[15]||(t[15]=n=>e.searchable?!1:e.deactivate()),onKeydown:[t[16]||(t[16]=V(h(n=>e.pointerForward(),["self","prevent"]),["down"])),t[17]||(t[17]=V(h(n=>e.pointerBackward(),["self","prevent"]),["up"]))],onKeypress:t[18]||(t[18]=V(h(n=>e.addPointerElement(n),["stop","self"]),["enter","tab"])),onKeyup:t[19]||(t[19]=V(n=>e.deactivate(),["esc"])),role:"combobox","aria-owns":"listbox-"+e.id},[m(e.$slots,"caret",{toggle:e.toggle},()=>[c("div",{onMousedown:t[1]||(t[1]=h(n=>e.toggle(),["prevent","stop"])),class:"multiselect__select"},null,32)]),m(e.$slots,"clear",{search:e.search}),c("div",me,[m(e.$slots,"selection",{search:e.search,remove:e.removeElement,values:d.visibleValues,isOpen:e.isOpen},()=>[f(c("div",ge,[(u(!0),w(N,null,C(d.visibleValues,(n,o)=>m(e.$slots,"tag",{option:n,search:e.search,remove:e.removeElement},()=>[(u(),w("span",{class:"multiselect__tag",key:o},[c("span",{textContent:S(e.getOptionLabel(n))},null,8,["textContent"]),c("i",{tabindex:"1",onKeypress:V(h(v=>e.removeElement(n),["prevent"]),["enter"]),onMousedown:h(v=>e.removeElement(n),["prevent"]),class:"multiselect__tag-icon"},null,40,["onKeypress","onMousedown"])]))])),256))],512),[[O,d.visibleValues.length>0]]),e.internalValue&&e.internalValue.length>l.limit?m(e.$slots,"limit",{key:0},()=>[c("strong",{class:"multiselect__strong",textContent:S(l.limitText(e.internalValue.length-l.limit))},null,8,["textContent"])]):g("v-if",!0)]),c(D,{name:"multiselect__loading"},{default:B(()=>[m(e.$slots,"loading",{},()=>[f(c("div",be,null,512),[[O,l.loading]])])]),_:3}),e.searchable?(u(),w("input",{key:0,ref:"search",name:l.name,id:e.id,type:"text",autocomplete:"off",spellcheck:!1,placeholder:e.placeholder,style:d.inputStyle,value:e.search,disabled:l.disabled,tabindex:l.tabindex,onInput:t[2]||(t[2]=n=>e.updateSearch(n.target.value)),onFocus:t[3]||(t[3]=h(n=>e.activate(),["prevent"])),onBlur:t[4]||(t[4]=h(n=>e.deactivate(),["prevent"])),onKeyup:t[5]||(t[5]=V(n=>e.deactivate(),["esc"])),onKeydown:[t[6]||(t[6]=V(h(n=>e.pointerForward(),["prevent"]),["down"])),t[7]||(t[7]=V(h(n=>e.pointerBackward(),["prevent"]),["up"])),t[9]||(t[9]=V(h(n=>e.removeLastElement(),["stop"]),["delete"]))],onKeypress:t[8]||(t[8]=V(h(n=>e.addPointerElement(n),["prevent","stop","self"]),["enter"])),class:"multiselect__input","aria-controls":"listbox-"+e.id},null,44,["name","id","placeholder","value","disabled","tabindex","aria-controls"])):g("v-if",!0),d.isSingleLabelVisible?(u(),w("span",{key:1,class:"multiselect__single",onMousedown:t[10]||(t[10]=h((...n)=>e.toggle&&e.toggle(...n),["prevent"]))},[m(e.$slots,"singleLabel",{option:d.singleValue},()=>[$(S(e.currentOptionLabel),1)])],32)):g("v-if",!0),d.isPlaceholderVisible?(u(),w("span",{key:2,class:"multiselect__placeholder",onMousedown:t[11]||(t[11]=h((...n)=>e.toggle&&e.toggle(...n),["prevent"]))},[m(e.$slots,"placeholder",{},()=>[$(S(e.placeholder),1)])],32)):g("v-if",!0)],512),c(D,{name:"multiselect"},{default:B(()=>[f(c("div",{class:"multiselect__content-wrapper",onFocus:t[12]||(t[12]=(...n)=>e.activate&&e.activate(...n)),tabindex:"-1",onMousedown:t[13]||(t[13]=h(()=>{},["prevent"])),style:{maxHeight:e.optimizedHeight+"px"},ref:"list"},[c("ul",{class:"multiselect__content",style:d.contentStyle,role:"listbox",id:"listbox-"+e.id},[m(e.$slots,"beforeList"),e.multiple&&e.max===e.internalValue.length?(u(),w("li",ye,[c("span",ve,[m(e.$slots,"maxElements",{},()=>[$("Maximum of "+S(e.max)+" options selected. First remove a selected option to select another.",1)])])])):g("v-if",!0),!e.max||e.internalValue.length<e.max?(u(!0),w(N,{key:1},C(e.filteredOptions,(n,o)=>(u(),w("li",{class:"multiselect__element",key:o,id:e.id+"-"+o,role:n&&(n.$isLabel||n.$isDisabled)?null:"option"},[n&&(n.$isLabel||n.$isDisabled)?g("v-if",!0):(u(),w("span",{key:0,class:[e.optionHighlight(o,n),"multiselect__option"],onClick:h(v=>e.select(n),["stop"]),onMouseenter:h(v=>e.pointerSet(o),["self"]),"data-select":n&&n.isTag?e.tagPlaceholder:d.selectLabelText,"data-selected":d.selectedLabelText,"data-deselect":d.deselectLabelText},[m(e.$slots,"option",{option:n,search:e.search,index:o},()=>[c("span",null,S(e.getOptionLabel(n)),1)])],42,["onClick","onMouseenter","data-select","data-selected","data-deselect"])),n&&(n.$isLabel||n.$isDisabled)?(u(),w("span",{key:1,"data-select":e.groupSelect&&d.selectGroupLabelText,"data-deselect":e.groupSelect&&d.deselectGroupLabelText,class:[e.groupHighlight(o,n),"multiselect__option"],onMouseenter:h(v=>e.groupSelect&&e.pointerSet(o),["self"]),onMousedown:h(v=>e.selectGroup(n),["prevent"])},[m(e.$slots,"option",{option:n,search:e.search,index:o},()=>[c("span",null,S(e.getOptionLabel(n)),1)])],42,["data-select","data-deselect","onMouseenter","onMousedown"])):g("v-if",!0)],8,["id","role"]))),128)):g("v-if",!0),f(c("li",null,[c("span",we,[m(e.$slots,"noResult",{search:e.search},()=>[_e])])],512),[[O,l.showNoResults&&e.filteredOptions.length===0&&e.search&&!l.loading]]),f(c("li",null,[c("span",Ve,[m(e.$slots,"noOptions",{},()=>[Se])])],512),[[O,l.showNoOptions&&(e.options.length===0||d.hasOptionGroup===!0&&e.filteredOptions.length===0)&&!e.search&&!l.loading]]),m(e.$slots,"afterList")],12,["id"])],36),[[O,e.isOpen]])]),_:3})],42,["tabindex","aria-owns"])}P.render=Le;const Oe={components:{VueMultiselect:P},setup(){const e=U(),t=R(),l=q(),i=j(),r=T({eventsFiltered:[],eventsSelected:[],clientEvents:[],namewithDate:null,client:{firstName:null,middleName:null,lastName:null,email:null,phoneNumber:{primary:null,alternate:null},address:{line1:null,line2:null,city:null,county:null,zip:null}},hoverId:null}),d=T({client:{firstName:{required:k},lastName:{required:k},email:{required:k,email:ne},phoneNumber:{primary:{required:k,numeric:oe,minLength:re(10),maxLength:ae(10)}},address:{city:{required:k}}}}),n=le(d,r),o=async()=>{try{const[p,L,b]=await Promise.all([z(l.params.id),W(l.params.id),X(l.params.id)]);r.client=p,r.clientEvents=L,r.eventsFiltered=b,n.value.$reset()}catch(p){console.log(p),e.error(`Error loading data: ${p.message}`)}},v=async()=>{if(await n.value.$validate(),!n.$error)try{const p=await Z(l.params.id,r.client);e.success(p),i.push("/findclient")}catch(p){e.error("Error updating event",p)}},F=async()=>{try{if(r.clientEvents.length!==0){e.info("Client cannot be deleted since it has events to attend.");return}const p=await Q(l.params.id);e.success(p),i.push("/findclient")}catch(p){console.log(p),e.error(p)}},H=async(p,L)=>{try{await Y(L,p),r.clientEvents=r.clientEvents.filter(b=>b._id!==L),e.success(`Client ${r.client.firstName} removed from event ${clientEvents.name}`)}catch(b){console.error("Error removing client from event:",b),e.error(`Error removing client from event: ${b.message}`)}},G=async()=>{const{eventsSelected:p}=r,L=r.client._id;try{for(const b of p)await J(b._id,L),r.clientEvents.push(b),e.success(`Client ${r.client.firstName} added to event ${b.name}`)}catch(b){console.error("Error adding client to event:",b),e.error(`Error adding client to event: ${b.message}`)}};return I(()=>{o()}),{state:r,v$:n,user:t,loadData:o,submitUpdateClient:v,submitDeleteClient:F,removeClientFromEvent:H,addClientToEvent:G}},methods:{formatDate(e){const t={month:"long",day:"numeric",year:"numeric"};return new Date(e).toLocaleDateString(void 0,t)}}},a=e=>(se("data-v-430ade75"),e=e(),ie(),e),ke=a(()=>s("h1",{class:"font-bold text-4xl text-red-700 tracking-widest text-center mt-10"}," Client Details ",-1)),$e={class:"px-10 py-20"},xe={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"},Ee=a(()=>s("h2",{class:"text-2xl font-bold"},"Personal Details",-1)),Ne={class:"flex flex-col"},Ce={class:"block"},De=a(()=>s("span",{class:"text-gray-700"},"First Name",-1)),Be=a(()=>s("span",{style:{color:"#ff0000"}},"*",-1)),Te={key:0,class:"text-red-500"},Me={class:"flex flex-col"},Ae={class:"block"},Pe=a(()=>s("span",{class:"text-gray-700"},"Middle Name",-1)),Fe={class:"flex flex-col"},He={class:"block"},Ge=a(()=>s("span",{class:"text-gray-700"},"Last Name",-1)),Ke=a(()=>s("span",{style:{color:"#ff0000"}},"*",-1)),Ue={key:0,class:"text-red-500"},Re=a(()=>s("div",null,null,-1)),Ie={class:"flex flex-col"},qe={class:"block"},je=a(()=>s("span",{class:"text-gray-700"},"Email",-1)),ze={key:0,class:"text-red-500"},We={class:"flex flex-col"},Xe={class:"block"},Ze=a(()=>s("span",{class:"text-gray-700"},"Phone Number",-1)),Qe=a(()=>s("span",{style:{color:"#ff0000"}},"*",-1)),Ye={key:0,class:"text-red-500"},Je={key:0},et={key:1},tt={key:2},st={class:"flex flex-col"},it={class:"block"},lt=a(()=>s("span",{class:"text-gray-700"},"Alternative Phone Number",-1)),nt={class:"mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"},ot=a(()=>s("h2",{class:"text-2xl font-bold"},"Address Details",-1)),rt={class:"flex flex-col"},at={class:"block"},dt=a(()=>s("span",{class:"text-gray-700"},"Address Line 1",-1)),ut={class:"flex flex-col"},ht={class:"block"},ct=a(()=>s("span",{class:"text-gray-700"},"Address Line 2",-1)),pt={class:"flex flex-col"},ft={class:"block"},mt=a(()=>s("span",{class:"text-gray-700"},"City",-1)),gt=a(()=>s("span",{style:{color:"#ff0000"}},"*",-1)),bt={key:0,class:"text-red-500"},yt=a(()=>s("div",null,null,-1)),vt={class:"flex flex-col"},wt={class:"block"},_t=a(()=>s("span",{class:"text-gray-700"},"County",-1)),Vt={class:"flex flex-col"},St={class:"block"},Lt=a(()=>s("span",{class:"text-gray-700"},"Zip Code",-1)),Ot=a(()=>s("div",null,null,-1)),kt={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"},$t=a(()=>s("div",{class:"flex justify-between mt-10 mr-20"},null,-1)),xt={class:"flex justify-between mt-10 mr-20"},Et=["disabled"],Nt={class:"flex justify-between mt-10 mr-20"},Ct=["disabled"],Dt={class:"flex justify-between mt-10 mr-20"},Bt=a(()=>s("hr",{class:"mt-10 mb-10"},null,-1)),Tt={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mr-10"},Mt=a(()=>s("div",{class:"ml-10"},[s("h2",{class:"text-2xl font-bold"},"Events for Client"),s("h3",{class:"italic"},"Click table row to view event details")],-1)),At={class:"flex flex-col col-span-2"},Pt={class:"min-w-full shadow-md rounded"},Ft=a(()=>s("thead",{class:"bg-gray-50 text-xl"},[s("tr",null,[s("th",{class:"p-4 text-left"},"Event Name"),s("th",{class:"p-4 text-left"},"Date"),s("th",{class:"p-4"})])],-1)),Ht={class:"divide-y divide-gray-300"},Gt=["onClick","onMouseenter"],Kt={class:"p-2 text-left"},Ut={class:"p-2 text-left"},Rt={class:"p-2 text-right"},It={class:"remove-btn-wrapper"},qt=["onClick"],jt={class:"flex flex-col"},zt={class:"flex justify-between"},Wt=["disabled"];function Xt(e,t,l,i,r,d){const n=ee("VueMultiselect");return u(),y("main",null,[ke,s("div",$e,[s("div",xe,[Ee,s("div",Ne,[s("label",Ce,[De,Be,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",placeholder:"","onUpdate:modelValue":t[0]||(t[0]=o=>i.state.client.firstName=o)},null,512),[[_,i.state.client.firstName]])]),i.v$.client.firstName.$error?(u(),y("span",Te," First Name is required ")):g("",!0)]),s("div",Me,[s("label",Ae,[Pe,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",placeholder:"","onUpdate:modelValue":t[1]||(t[1]=o=>i.state.client.middleName=o)},null,512),[[_,i.state.client.middleName]])])]),s("div",Fe,[s("label",He,[Ge,Ke,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",placeholder:"","onUpdate:modelValue":t[2]||(t[2]=o=>i.state.client.lastName=o)},null,512),[[_,i.state.client.lastName]])]),i.v$.client.lastName.$error?(u(),y("span",Ue," Last Name is required ")):g("",!0)]),Re,s("div",Ie,[s("label",qe,[je,f(s("input",{type:"email",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50","onUpdate:modelValue":t[3]||(t[3]=o=>i.state.client.email=o)},null,512),[[_,i.state.client.email]])]),i.v$.client.email.$error?(u(),y("span",ze," Valid Email is required ")):g("",!0)]),s("div",We,[s("label",Xe,[Ze,Qe,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",pattern:"^[0-9]{3}[0-9]{3}[0-9]{4}$","onUpdate:modelValue":t[4]||(t[4]=o=>i.state.client.phoneNumber.primary=o)},null,512),[[_,i.state.client.phoneNumber.primary]])]),i.v$.client.phoneNumber.primary.$error?(u(),y("span",Ye,[i.v$.client.phoneNumber.primary.required.$invalid?(u(),y("span",Je,"Phone Number is required")):!i.v$.client.phoneNumber.primary.required.$invalid&&i.v$.client.phoneNumber.primary.numeric.$invalid?(u(),y("span",et," Phone Number must contain only digits ")):!i.v$.client.phoneNumber.primary.required.$invalid&&!i.v$.client.phoneNumber.primary.numeric.$invalid&&(i.v$.client.phoneNumber.primary.minLength.$invalid||i.v$.client.phoneNumber.primary.maxLength.$invalid)?(u(),y("span",tt," Phone Number must be exactly 10 digits ")):g("",!0)])):g("",!0)]),s("div",st,[s("label",it,[lt,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",pattern:"[0-9]{3}[0-9]{3}[0-9]{4}","onUpdate:modelValue":t[5]||(t[5]=o=>i.state.client.phoneNumber.alternate=o)},null,512),[[_,i.state.client.phoneNumber.alternate]])])])]),s("div",nt,[ot,s("div",rt,[s("label",at,[dt,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50","onUpdate:modelValue":t[6]||(t[6]=o=>i.state.client.address.line1=o)},null,512),[[_,i.state.client.address.line1]])])]),s("div",ut,[s("label",ht,[ct,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50","onUpdate:modelValue":t[7]||(t[7]=o=>i.state.client.address.line2=o)},null,512),[[_,i.state.client.address.line2]])])]),s("div",pt,[s("label",ft,[mt,gt,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50","onUpdate:modelValue":t[8]||(t[8]=o=>i.state.client.address.city=o)},null,512),[[_,i.state.client.address.city]])]),i.v$.client.address.city.$error?(u(),y("span",bt," City is required ")):g("",!0)]),yt,s("div",vt,[s("label",wt,[_t,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50","onUpdate:modelValue":t[9]||(t[9]=o=>i.state.client.address.county=o)},null,512),[[_,i.state.client.address.county]])])]),s("div",Vt,[s("label",St,[Lt,f(s("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50","onUpdate:modelValue":t[10]||(t[10]=o=>i.state.client.address.zip=o)},null,512),[[_,i.state.client.address.zip]])])]),Ot]),s("div",kt,[$t,s("div",xt,[s("button",{onClick:t[11]||(t[11]=(...o)=>i.submitUpdateClient&&i.submitUpdateClient(...o)),type:"submit",class:"bg-green-700 disabled:opacity-50 text-white rounded",disabled:i.user.role==="viewer"}," Update Client ",8,Et)]),s("div",Nt,[s("button",{onClick:t[12]||(t[12]=(...o)=>i.submitDeleteClient&&i.submitDeleteClient(...o)),type:"submit",class:"bg-red-700 disabled:opacity-50 text-white rounded",disabled:i.user.role==="viewer"}," Delete Client ",8,Ct)]),s("div",Dt,[s("button",{type:"reset",class:"border border-red-700 bg-white text-red-700 rounded",onClick:t[13]||(t[13]=o=>this.$router.back())}," Go back ")])])]),Bt,s("div",Tt,[Mt,s("div",At,[s("table",Pt,[Ft,s("tbody",Ht,[(u(!0),y(N,null,C(i.state.clientEvents,o=>(u(),y("tr",{onClick:v=>e.$router.push({name:"eventdetails",params:{id:o._id}}),key:o._id,class:te(["cursor-pointer",{hoverRow:i.state.hoverId===o._id}]),onMouseenter:v=>i.state.hoverId=o._id,onMouseleave:t[14]||(t[14]=v=>i.state.hoverId=null)},[s("td",Kt,S(o.name),1),s("td",Ut,S(d.formatDate(o.date)),1),s("td",Rt,[s("span",It,[i.state.hoverId===o._id?(u(),y("span",{key:0,class:"remove-btn text-gray-400 cursor-pointer",onClick:h(v=>i.removeClientFromEvent(i.state.client._id,o._id),["stop"])},"X",8,qt)):g("",!0)])])],42,Gt))),128))])])]),s("div",jt,[c(n,{class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer",modelValue:i.state.eventsSelected,"onUpdate:modelValue":t[15]||(t[15]=o=>i.state.eventsSelected=o),options:i.state.eventsFiltered,"custom-label":i.state.nameWithDate,multiple:!0,"close-on-select":!0,placeholder:"Select Events to be added",label:"date","track-by":"name"},null,8,["modelValue","options","custom-label"]),s("div",zt,[s("button",{onClick:t[16]||(t[16]=(...o)=>i.addClientToEvent&&i.addClientToEvent(...o)),type:"submit",class:"mt-5 bg-red-700 disabled:opacity-50 text-white rounded",disabled:i.state.eventsSelected.length===0||i.user.role==="viewer"}," Add Client to Selected Events ",8,Wt)])])])])}const Jt=K(Oe,[["render",Xt],["__scopeId","data-v-430ade75"]]);export{Jt as default};
