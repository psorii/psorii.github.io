
function updateTokyoTime() {
    const tokyoOffset = 9 * 60;
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tokyoTime = new Date(utc + (tokyoOffset * 60000));
    const formatted = tokyoTime.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    document.getElementById('tokyo-time').textContent = `TOKYO    ${formatted}`;
  }
  
  setInterval(updateTokyoTime, 1000);
  updateTokyoTime();
  