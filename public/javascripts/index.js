class index {
  constructor() {
    this.nowTime = new Date();
    this.endTime = new Date("2018-05-31T22:00:00");

    this.secondPerMilliSecond = 1000;
    this.minutePerMilliSecond = this.secondPerMilliSecond * 60;
    this.hourPerMilliSecond = this.minutePerMilliSecond * 60;
    this.dayPerMilliSecond = this.hourPerMilliSecond * 24;

    this.timeCount = document.querySelector('.time-count');
    this.dim = document.querySelector('.dim');
    this.modal = document.querySelector('.modal');
    this.form1 = document.querySelector('.page-1');
    this.form2 = document.querySelector('.page-2');

    this.inputName = document.querySelector('#name');
    this.inputBirthday = document.querySelector('#birthday');
    this.inputPhone = document.querySelector('#phone');
    this.inputAddress = document.querySelector('#address');
    this.codeList = document.querySelectorAll('.code');
    this.address1 = document.querySelector('#address1');
    this.address2 = document.querySelector('#address2');

    this.token = document.querySelector('#token');
    this.init();
  }

  init() {
    // 남은 시간 카운팅
    this.remainTimeCounting();

    // 선거인단 등록 모달 띄우기
    document.querySelector('.apply-btn').addEventListener('click', () => {
      this.showApplyModal();
    });

    // 딤 누르면 모달 끄기
    this.dim.addEventListener('click', () => {
      this.hideApplyModal();
    });

    // 주소 선택
    document.querySelector('.search-address-btn').addEventListener('click', e => {
      e.preventDefault();
      new daum.Postcode({
        oncomplete: function(data) {
          document.querySelector('.selected-address').innerHTML = `선택하신 주소는 <strong>'${data.roadAddress}'</strong>입니다.`;
          document.querySelector('#address1').value = data.sido;
          document.querySelector('#address2').value = data.sigungu;
        }
      }).open();
    });

    // 유효 코드 숫자만 받기
    this.form2.addEventListener('input', e => {
      let value = e.target.value;
      if(value < '0' || value > '9') {
        e.target.value = '';
        console.log('asdf');
        return;
      }
    });

    // 유효 코드 입력 시 입력 표시
    this.form2.addEventListener('focusout', e => {
      if(e.target.value.length === 1) {
        e.target.closest('.mdl-textfield').classList.add('is-focused');
      }
    });

    // 모달창 닫기
    document.querySelector('.close-btn').addEventListener('click', () => {
      this.hideApplyModal();
    });

    setTimeout(() => {
      document.querySelector('#submit-btn1 span').addEventListener('click', e => {
        e.preventDefault();
        if(!this.form1IsValid()) {
          return;
        }
        this.postElector();
      });

      document.querySelector('#submit-btn2 span').addEventListener('click', e => {
        e.preventDefault();
        if(!this.form2IsValid()) {
          return;
        }
        this.postElectorCode();
      })
    }, 1000);
  }

  postElector() {
    const data = {
      'name': this.inputName.value,
      'birth': this.inputBirthday.value,
      'gender': document.querySelector('.is-checked').getAttribute('data-item'),
      'phone' : this.inputPhone.value,
      'address1': this.address1.value,
      'address2': this.address2.value
    };
    console.log(data);
    fetch('/elector', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'same-origin',
      credentials: 'same-origin',
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
      document.querySelector('#token').value = json.token;
      document.querySelector('.page-1').style.display = 'none';
      document.querySelector('.page-2').style.display = 'block';
    });
  }

  postElectorCode() {
    const data = {
      'token': this.token.value,
      'code': this.codeList[0].value + this.codeList[1].value
      + this.codeList[2].value + this.codeList[3].value
    };

    fetch('/elector/code', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'same-origin',
      credentials: 'same-origin',
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
    });

  }

  // 폼 유효성 체크
  form1IsValid() {
    if(this.form1.querySelector('.is-invalid')) {
      alert('올바르지 않은 내용입니다. 등록 내용을 다시 확인해주세요.');
      return false;
    }

    if(this.form1.querySelectorAll('.is-dirty').length !== 3) {
      alert('입력하지 않은 정보가 있습니다.');
      return false;
    }

    if(this.form1.querySelector('.selected-address').innerText.length < 2) {
      alert('주소를 입력해주세요.');
      return false;
    }
    return true;
  }

  form2IsValid() {
    if(this.form2.querySelectorAll('.is-focused').length !== 4) {
      alert('정확한 인증번호 4자리를 입력해주세요.');
      return false;
    }
    return true;
  }

  // 입력폼 초기화
  initForm() {
    this.inputName.value = '';
    this.inputBirthday.value = '';
    this.inputPhone.value = '';
    this.inputAddress.innerText = ' ';
    this.codeList.forEach(code => {
      code.value = '';
    });
    document.querySelectorAll('.is-invalid').forEach(input => {
      input.classList.remove('is-invalid');
      input.classList.remove('is-dirty');
    });
  }

  // 선거인단 등록 모달 띄우기, 감추기
  showApplyModal() {
    this.dimOn();
    this.modal.classList.add('is-visible');
  }

  hideApplyModal() {
    this.initForm();
    this.form1.style.display = 'block';
    this.form2.style.display = 'none';
    this.modal.classList.remove('is-visible');
    this.dimOff();
  }

  // 딤 띄우기, 감추기
  dimOn() {
    this.dim.style.display = 'block';
  }

  dimOff() {
    this.dim.style.display = 'none';
  }

  // 등록 마감시간 카운팅
  remainTimeCounting() {
    let go = setInterval(() => {
      this.nowTime = new Date();
      let leftTime = this.endTime - this.nowTime;

      let days = parseInt(leftTime / this.dayPerMilliSecond);
      leftTime = leftTime - (days * this.dayPerMilliSecond);

      let hours = parseInt(leftTime / this.hourPerMilliSecond);
      leftTime = leftTime - (hours * this.hourPerMilliSecond);

      let minutes = parseInt(leftTime / this.minutePerMilliSecond);
      leftTime = leftTime - (minutes * this.minutePerMilliSecond);

      let seconds = parseInt(leftTime / this.secondPerMilliSecond);

      this.timeCount.innerText = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
      if(days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(go);
      }
    }, 1000);
  }
}

window.onload = () => {
  new index();
};
