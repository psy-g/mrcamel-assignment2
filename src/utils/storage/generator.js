export default class Storage {
  constructor(title) {
    this.title = title;
  }

  save = (list = []) => {
    const obj = {
      data: list,
      timestamp: new Date().getDay(),
    };

    const previousTime = JSON.parse(localStorage.getItem(this.title))?.timestamp;
    const currentTime = new Date().getDay();

    if (previousTime) {
      previousTime !== currentTime ? localStorage.clear() : localStorage.setItem(this.title, JSON.stringify(obj));
    } else {
      localStorage.setItem(this.title, JSON.stringify(obj));
    }
  };

  load = () => {
    return JSON.parse(localStorage.getItem(this.title))?.data;
  };
}
