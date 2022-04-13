const PreventDrag = class {
  constructor(elem) {
    this.moved = false;

    this.init(elem);
  }
  get isMoved() {
    return this.moved;
  }

  init(elem) {
    // new Date()는 Date 객체를 반환하는 생성자
    // Date.now()밀리세컨드를 반환한다
    let startTime = 0;
    let xStart = 0;
    let yStart = 0;
    elem.addEventListener('mousedown', (e) => {
      xStart = e.clientX;
      yStart = e.clientY;
      startTime = Date.now();
    });

    elem.addEventListener('mouseup', (e) => {
      const xGap = Math.abs(e.clientX - xStart);
      const yGap = Math.abs(e.clientY - yStart);
      const timeGap = Date.now() - startTime;

      this.moved = xGap > 10 || yGap > 10 || timeGap > 500 ? true : false;
    });
  }
};
export default PreventDrag;
