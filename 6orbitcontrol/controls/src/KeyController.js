export default class KeyController {
  constructor() {
    this.keys = '';

    window.addEventListener('keydown', (e) => {
      // console.log(e.code);
      this.keys = e.code;
    });

    window.addEventListener('keyup', (e) => {
      // delete this.keys[e.code];
      this.keys = '';
    });
  }
}
