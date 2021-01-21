/* eslint-disable indent */
export default {

  /*
   * @date 是 年月日 eg:1994-1-23
   * @return 数字年龄
   * */
  ageForYear(dateStr) {
    let birthdayTime = Date.parse(dateStr);
    let ageTime = new Date().getTime() - birthdayTime;
    return Math.floor(ageTime / 1000 / 60 / 60 / 24 / 365);
  },
  isPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = true;
    for (let num = 0; num < Agents.length; num++) {
      if (userAgentInfo.indexOf(Agents[num]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  isWeiXin() {
    let ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
  },
  is768() {
    return window.screen.width < 768;
  },
  isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
  },
  isiOS() {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
  },
  getQueryletiable(letiable) {

    let query = window.location.search.substring(1);
    let lets = query.split("&");
    for (let i = 0; i < lets.length; i++) {
      let pair = lets[i].split("=");
      if (pair[0] == letiable) {
        return pair[1];
      }
    }
    return (false);
  },
  pageForTotal(total, pageSize) {
    let page = Math.floor(total / pageSize);
    if (total % pageSize !== 0) page += 1;
    return page;
  },

  timeFormat(seconds) {

    let date = new Date(seconds * 1000);

    return `${date.getFullYear()}-${this.numKeep(date.getMonth() + 1, 2)}-${this.numKeep(date.getDate(), 2)} ${this.numKeep(date.getHours(), 2)}:${this.numKeep(date.getMinutes(), 2)}`;
  },

  appAction(func, params) {
    if (!func) {
      return;
    }
    if (params == null) {
      params = {};
    }
    params.func = func;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      window.webkit.messageHandlers.action.postMessage(params);
    } else {
      window.client.action(JSON.stringify(params));
    }

  },
  numKeep(num, len) {
    if (!len) {
      len = 2;
    }
    if (len < 1) {
      len = 1;
    }
    let plc = '';
    let my = '' + num;
    for (let num = 0; num < len - my.length; num++) {
      plc += '0';
    }
    return num < Math.pow(10, len - 1) ? plc + num : '' + num;
  },
  teamStatus(code) {
    // 0:解散,2:成立,1:进行中，3:结束
    if (code == "0") {
      return '解散';
    }
    if (code == 1) {
      return '进行中';
    }
    if (code == 2) {
      return '成立';
    }
    if (code == 3) {
      return '结束';
    }
  },
  banjiStatus(code) {
    // 班级状态 1:进行中，2:已关闭

    if (code == 1) {
      return '进行中';
    }
    if (code == 2) {
      return '已关闭';
    }

  },
  jiaonaStatus(code) {

    if (code == 1) {
      return '已缴纳';
    }
    if (code == 0) {
      return '未缴纳';
    }
  },
  yijiaoStatus(code) {
    if (code == 2) {
      return '拒绝';
    }
    if (code == 1) {
      return '接收';
    }
    if (code == 0) {
      return '未操作';
    }
  },
  studyStatus(code) {
    // studystatus 0：未缴费，未开始学习 1 学习中,已缴费 5 毕业 6 肄业 7 再学一期毕业 8 再学一期肄

    if (code == 0) {
      return '未开始学习';
    }
    if (code == 1) {
      return '学习中';
    }
    if (code == 5) {
      return '毕业';
    }
    if (code == 6) {
      return '肄业';
    }
    if (code == 7) {
      return '再学一期毕业';
    }
    if (code == 8) {
      return '再学一期待缴费';
    }
  },
  timeF(date) {
    let sec = new Date(date.replace(/-/g, "/")).getTime();
    //获取js 时间戳
    let time = new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - parseInt(sec)) / 1000);

    //存储转换值
    let s = null;
    if (time < 60 * 10) {//十分钟内
      return '刚刚';
    } else if ((time < 60 * 60) && (time >= 60 * 10)) {
      //超过十分钟少于1小时
      s = Math.floor(time / 60);
      return s + "分钟前";
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
      //超过1小时少于24小时
      s = Math.floor(time / 60 / 60);
      return s + "小时前";
    } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
      //超过1天少于3天内
      s = Math.floor(time / 60 / 60 / 24);
      return s + "天前";
    } else {

      //超过3天
      let date1 = new Date(sec);
      return date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + date1.getDate();
    }
  },
  maskPhone(phone) {
    if (phone && phone.length >= 11) {
      return phone.substr(0, 3) + '****' + phone.substr(7);

    }
    return phone;
  }


}
