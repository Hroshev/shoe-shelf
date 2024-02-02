/* Отправка формы */
$(".order-form").on("submit",function(event){event.stopPropagation();event.preventDefault();let form=this,submit=$(".submit",form),data=new FormData();$(".submit",form).val("Відправлення...");$("input,textarea",form).attr("disabled","");let nameValue=$('[name="name"]',form).val();let phoneValue=$('[name="phone"]',form).val();let emailValue=$('[name="email"]',form).val();let selectValue=$('[name="select"]',form).val();if(nameValue){data.append("Ім`я",nameValue)}
if(phoneValue){data.append("Телефон",phoneValue)}
if(emailValue){data.append("Email",emailValue)}
if(selectValue){data.append("Пропозиція",selectValue)}
data.append("Товар",window.location.href);$.ajax({url:"telegram.php",type:"POST",data:data,cache:!1,dataType:"json",processData:!1,contentType:!1,xhr:function(){let myXhr=$.ajaxSettings.xhr();if(myXhr.upload){myXhr.upload.addEventListener("progress",function(e){if(e.lengthComputable){let percentage=(e.loaded/e.total)*100;percentage=percentage.toFixed(0);$(".submit",form).html(percentage+"%")}},!1)}
return myXhr},error:function(jqXHR,textStatus){},complete:function(){window.location.href="/thank-you-page";form.reset()},});return!1});$(document).on("submit",".dynamic-form",function(event){})

/* Плавная прокрутка */
$(document).ready(function(){$('a[href^="#"]').click(function(){var t=$(this).attr("href"),e=$(t).offset().top;return(jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop:e},1000),!1)})})

/* Devtools */
document.addEventListener("keydown",(event)=>{const isCtrlShift=event.ctrlKey||(event.metaKey&&event.shiftKey);if(isCtrlShift&&["I","J","C"].includes(event.key)){event.preventDefault()}
if((isCtrlShift||event.ctrlKey||event.metaKey)&&event.key==="S"){event.preventDefault()}
if(event.key==="F12"&&event.code==="F12"){event.preventDefault()}})

/* Маска на номер телефона */
window.addEventListener("DOMContentLoaded",function(){[].forEach.call(document.querySelectorAll('[name="phone"]'),function(input){let keyCode;let previousValue="";function mask(event){event.keyCode&&(keyCode=event.keyCode);let pos=this.selectionStart;if(pos<3)event.preventDefault();let matrix="+38 (___) ___-__-__",i=0,def=matrix.replace(/\D/g,""),val=this.value.replace(/\D/g,""),new_value=matrix.replace(/[_\d]/g,function(a){return i<val.length?val.charAt(i++)||def.charAt(i):a});i=new_value.indexOf("_");if(i!=-1){i<5&&(i=3);new_value=new_value.slice(0,i)}
let reg=matrix.substr(0,this.value.length).replace(/_+/g,function(a){return"\\d{1,"+a.length+"}"}).replace(/[+()]/g,"\\$&");reg=new RegExp("^"+reg+"$");if(!reg.test(this.value)||this.value.length<5||(keyCode>47&&keyCode<58)){this.value=new_value;setCaretPosition(this,this.value.length)}
previousValue=this.value}
function setCaretPosition(elem,caretPos){if(elem!==null){if(elem.createTextRange){let range=elem.createTextRange();range.move("character",caretPos);range.select()}else{if(elem.selectionStart){elem.focus();elem.setSelectionRange(caretPos,caretPos)}else{elem.focus()}}}}
input.addEventListener("focus",function(){setCaretPosition(this,this.value.length)});input.addEventListener("input",mask,!1);input.addEventListener("focus",mask,!1);input.addEventListener("blur",function(event){if(this.value===previousValue&&document.activeElement!==this){this.value=previousValue}});input.addEventListener("keydown",mask,!1)})})