export default function init(
  selector: string,
  callback: (direction: 'left' | 'right' | 'up' | 'down') => void,
) {
  document
    .querySelector(selector)!
    .addEventListener('touchstart', handleTouchStart, false);
  document
    .querySelector(selector)!
    .addEventListener('touchmove', handleTouchMove, false);
  let xDown: null | number = null;
  let yDown: null | number = null;
  function handleTouchStart(event: Event) {
    xDown = (event as TouchEvent).touches[0].clientX;
    yDown = (event as TouchEvent).touches[0].clientY;
  }
  function handleTouchMove(event: Event) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = (event as TouchEvent).touches[0].clientX;
    const yUp = (event as TouchEvent).touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    if (Math.abs(xDiff) + Math.abs(yDiff) > 100) {
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          callback('left');
        } else {
          callback('right');
        }
      } else {
        if (yDiff > 0) {
          callback('up');
        } else {
          callback('down');
        }
      }
      xDown = null;
      yDown = null;
    }
  }
}