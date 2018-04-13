!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nowTime=new Date,this.endTime=new Date("2018-05-31T22:00:00"),this.secondPerMilliSecond=1e3,this.minutePerMilliSecond=60*this.secondPerMilliSecond,this.hourPerMilliSecond=60*this.minutePerMilliSecond,this.dayPerMilliSecond=24*this.hourPerMilliSecond,this.timeCount=document.querySelector(".time-count"),this.dim=document.querySelector(".dim"),this.modal=document.querySelector(".modal"),this.form1=document.querySelector(".page-1"),this.form2=document.querySelector(".page-2"),this.inputName=document.querySelector("#name"),this.inputBirthday=document.querySelector("#birthday"),this.inputPhone=document.querySelector("#phone"),this.inputAddress=document.querySelector("#address"),this.codeList=document.querySelectorAll(".code"),this.address1=document.querySelector("#address1"),this.address2=document.querySelector("#address2"),this.token=document.querySelector("#token"),this.init()}return i(e,[{key:"init",value:function(){var e=this;this.remainTimeCounting(),document.querySelector(".apply-btn").addEventListener("click",function(){e.showApplyModal()}),this.dim.addEventListener("click",function(){e.hideApplyModal()}),document.querySelector(".search-address-btn").addEventListener("click",function(e){e.preventDefault(),new daum.Postcode({oncomplete:function(e){document.querySelector(".selected-address").innerHTML="선택하신 주소는 <strong>'"+e.roadAddress+"'</strong>입니다.",document.querySelector("#address1").value=e.sido,document.querySelector("#address2").value=e.sigungu}}).open()}),this.form2.addEventListener("input",function(e){var t=e.target.value;if(t<"0"||t>"9")return e.target.value="",void console.log("asdf")}),this.form2.addEventListener("focusout",function(e){1===e.target.value.length&&e.target.closest(".mdl-textfield").classList.add("is-focused")}),document.querySelector(".close-btn").addEventListener("click",function(){e.hideApplyModal()}),setTimeout(function(){document.querySelector("#submit-btn1 span").addEventListener("click",function(t){t.preventDefault(),e.form1IsValid()&&e.postElector()}),document.querySelector("#submit-btn2 span").addEventListener("click",function(t){t.preventDefault(),e.form2IsValid()&&e.postElectorCode()})},1e3)}},{key:"postElector",value:function(){var e={name:this.inputName.value,birth:this.inputBirthday.value,gender:document.querySelector(".is-checked").getAttribute("data-item"),phone:this.inputPhone.value,address1:this.address1.value,address2:this.address2.value};console.log(e),fetch("/elector",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},mode:"same-origin",credentials:"same-origin",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){console.log(e),document.querySelector("#token").value=e.token,document.querySelector(".page-1").style.display="none",document.querySelector(".page-2").style.display="block"})}},{key:"postElectorCode",value:function(){var e={token:this.token.value,code:this.codeList[0].value+this.codeList[1].value+this.codeList[2].value+this.codeList[3].value};fetch("/elector/code",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},mode:"same-origin",credentials:"same-origin",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){console.log(e)})}},{key:"form1IsValid",value:function(){return this.form1.querySelector(".is-invalid")?(alert("올바르지 않은 내용입니다. 등록 내용을 다시 확인해주세요."),!1):3!==this.form1.querySelectorAll(".is-dirty").length?(alert("입력하지 않은 정보가 있습니다."),!1):!(this.form1.querySelector(".selected-address").innerText.length<2)||(alert("주소를 입력해주세요."),!1)}},{key:"form2IsValid",value:function(){return 4===this.form2.querySelectorAll(".is-focused").length||(alert("정확한 인증번호 4자리를 입력해주세요."),!1)}},{key:"initForm",value:function(){this.inputName.value="",this.inputBirthday.value="",this.inputPhone.value="",this.inputAddress.innerText=" ",this.codeList.forEach(function(e){e.value=""}),document.querySelectorAll(".is-invalid").forEach(function(e){e.classList.remove("is-invalid"),e.classList.remove("is-dirty")})}},{key:"showApplyModal",value:function(){this.dimOn(),this.modal.classList.add("is-visible")}},{key:"hideApplyModal",value:function(){this.initForm(),this.form1.style.display="block",this.form2.style.display="none",this.modal.classList.remove("is-visible"),this.dimOff()}},{key:"dimOn",value:function(){this.dim.style.display="block"}},{key:"dimOff",value:function(){this.dim.style.display="none"}},{key:"remainTimeCounting",value:function(){var e=this,t=setInterval(function(){e.nowTime=new Date;var n=e.endTime-e.nowTime,i=parseInt(n/e.dayPerMilliSecond);n-=i*e.dayPerMilliSecond;var o=parseInt(n/e.hourPerMilliSecond);n-=o*e.hourPerMilliSecond;var r=parseInt(n/e.minutePerMilliSecond);n-=r*e.minutePerMilliSecond;var s=parseInt(n/e.secondPerMilliSecond);e.timeCount.innerText=i+"일 "+o+"시간 "+r+"분 "+s+"초",0===i&&0===o&&0===r&&0===s&&clearInterval(t)},1e3)}}]),e}();window.onload=function(){new o}},function(e,t,n){e.exports=n(0)}]);