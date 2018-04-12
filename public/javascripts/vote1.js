$(document).ready(() => {
  'use strict';

  class vote1 {
    constructor() {
      this.addressInputContainer = document.querySelector('#input-address-zone');
      this.errorMessage = document.querySelector('.mdl-textfield__error');

      this.checkedAddress = null;
      this.nowPage = 1;
      this.pageNavigation = document.querySelector('.page-navigation');
      this.source = `<p class="page-index" id="page{{number}}">{{number}}</p>`;
      this.template = Handlebars.compile(this.source);
      this.addressList = document.querySelectorAll('.mdl-list__item');
      this.submitButton = document.querySelector('.submit-button');
      this.snackbarContainer = document.querySelector('#demo-snackbar-example');

      this.snackbarData = {
        message: '주소를 선택해주세요',
        timeout: 2000,
        actionText: 'Undo'
      };

      this.init();
    }


    init() {
      document.querySelector('#search').addEventListener('click', e => {
        e.preventDefault();
        this.getAddress(e);
      });

      document.querySelector('#address-list').addEventListener('click', e => {
        if(e.target.tagName === 'INPUT') {
          this.checkAddress(e.target);
        }
      });

      document.querySelector('.page-navigation').addEventListener('click', e => {
        this.movePage(e.target);
      });

      this.submitButton.addEventListener('click', e => {
        this.postAddress();
      });
    }

    checkAddress(target) {
      if(this.checkedAddress !== null) {
        this.checkedAddress.querySelector('.mdl-js-checkbox').MaterialCheckbox.uncheck();
      }
      this.checkedAddress = target.closest('li');
    }

    getAddress(e) {
      this.keyword = document.querySelector('#address').value;
      if(this.keyword === '') {
        // e.preventDefault();
        console.log(this.keyword);
        this.invalidInput('주소를 입력해주세요');
        return;
      }

      $.ajax({
        url: "http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do"  //인터넷망
        , type: "post"
        , data: $("#form").serialize()
        , dataType: "jsonp"
        , crossDomain: true
        , success:  json => {
          let results = json.results;
          if(results.common.totalCount === 0) {
            this.invalidInput('검색 결과가 없습니다. 다시 입력해주세요!');
            this.submitButton.classList.remove('is-visible');
            return;
          }

          if(!this.submitButton.classList.contains('is-visible')) {
            this.submitButton.classList.add('is-visible');
          }

          if(results.common.errorCode === '0') {
            this.makeAddressList(results.juso);
            this.makeIndex(results.common.totalCount);
          } else {
            alert(results.errorMessage);
          }
        }
        , error: function (xhr, status, error) {
          alert("에러발생");
        }
      });
    }

    invalidInput(message) {
      this.errorMessage.innerText = message;
      this.addressInputContainer.classList.add('is-invalid');
      this.addressInputContainer.classList.add('is-dirty');
    }

    makeIndex(count) {
      console.log(count);
      if(count < 1) {
        alert('검색 결과가 없습니다');
      } else {
        let startIdx = parseInt(this.nowPage / 10) * 10 + 1;
        let endIdx = parseInt((count - 1) / 10) + 1;

        document.querySelector('#page-index-list').innerHTML = '';
        endIdx = endIdx < startIdx + 10 ? endIdx : startIdx + 9;
        for(let i =  startIdx; i <= endIdx ; i++ ) {
          let context = {number: i};
          document.querySelector('#page-index-list').insertAdjacentHTML('beforeend', this.template(context));
          console.log('index: ', i);
        }
        document.querySelector('#page' + this.nowPage).classList.add('current');
      }
    }

    movePage(target) {
      if(target.tagName === 'P') {
        this.nowPage = target.innerText * 1;
      } else if(target.classList.contains('left')) {
        this.nowPage--;
      } else if(target.classList.contains('right')) {
        this.nowPage++;
      }
      document.querySelector('#currentPage').value = this.nowPage;
      this.getAddress();
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

    postAddress() {
      if(this.checkedAddress == null) {
        this.snackbarContainer.MaterialSnackbar.showSnackbar(this.snackbarData);
        return;
      }
      console.log(this.checkedAddress.querySelector('.mdl-list__item-primary-content').innerText);
    }
  }
  new vote1();
});
