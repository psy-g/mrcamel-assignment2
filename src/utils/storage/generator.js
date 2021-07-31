export default class Storage {
  constructor(title) {
    this.title = title;
  }

  save = (list = []) => {
    const obj = {
      data: list,
      timestamp: new Date().getDay(),
    };

    if (!localStorage.getItem(this.title)) {
      localStorage.setItem(this.title, JSON.stringify(obj));
    } else {
      let previousTime = JSON.parse(localStorage.getItem(this.title))?.timestamp;
      let currentTime = new Date().getDay();

      if (previousTime !== currentTime) {
        return localStorage.clear();
      } else {
        return localStorage.setItem(this.title, JSON.stringify(obj));
      }
    }
  };

  load = () => {
    return JSON.parse(localStorage.getItem(this.title))?.data;
  };
}
