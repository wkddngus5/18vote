class test {
  constructor() {
    this.inputZone = document.querySelector('#input-zone');
    this.resultZone = document.querySelector('.result-zone');

    this.p = /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/gi;

    document.querySelector('#ok').addEventListener('click', e => {
      let r = this.makeLink(this.inputZone.value);
      console.log(r);
      this.resultZone.insertAdjacentHTML('beforeend', r);
    });
  }

  findURL(str) {
    return str.match(this.p);
  }

  isURL(str) {
    let urlList = this.findURL(str);
    console.log('urlLIst: ', urlList);
    let returnValue = false;

    switch (urlList[0]) {
      case undefined:
        returnValue = false;
        break;
      case str:
        returnValue = true;
        break;
    }
    return returnValue;
  }

  makeLink(str) {
    let url = this.findURL(str);
    let result;
    if(url === undefined) {
      result = str;
    } else {
      result = str.replace(this.p,'<a href="$1">$1</a>');
    }
    return result;
  }
}

new test();