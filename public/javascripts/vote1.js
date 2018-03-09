$(document).ready(() => {
  class vote1 {
    constructor() {
      document.querySelector('#search').addEventListener('click', e => {
        this.getAddress(e);
      });
      this.addressList = document.querySelectorAll('.mdl-list__item');
    }

    getAddress(e) {
      e.preventDefault();
      console.log($("#form").serialize());
      this.keyword = document.querySelector('#address').value;
      $.ajax({
        url: "http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do"  //인터넷망
        , type: "post"
        , data: $("#form").serialize()
        , dataType: "jsonp"
        , crossDomain: true
        , success:  json => {
          let results = json.results;
          if(results.common.errorCode === '0') {
            this.makeAddressList(results.juso);
          } else {
            alert(results.errorMessage);
          }
        }
        , error: function (xhr, status, error) {
          alert("에러발생");
        }
      });
    }

    makeAddressList(juso) {
      for(let i = 0 ; i < 5 ; i++) {
        if(juso[i]) {
          this.addressList[i].classList.remove('hidden');
          this.addressList[i].querySelector('.mdl-list__item-primary-content').innerText = juso[i].roadAddr;
        } else {
          this.addressList[i].classList.add('hidden');
        }
      }
    }
  }
  new vote1();
});
