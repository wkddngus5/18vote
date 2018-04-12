class index {
  constructor() {
    this.nowTime = new Date();
    this.endTime = new Date("2018-05-31T22:00:00");

    this.secondPerMilliSecond = 1000;
    this.minutePerMilliSecond = this.secondPerMilliSecond * 60;
    this.hourPerMilliSecond = this.minutePerMilliSecond * 60;
    this.dayPerMilliSecond = this.hourPerMilliSecond * 24

    this.timeCount = document.querySelector('.time-count');
    this.init();
  }

  init() {
    this.remainTimeCounting();
  }

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
