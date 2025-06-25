document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());

const target = 1750863600;
const tElem = document.getElementById('t');
const wrapper = document.getElementById('timer-wrapper');

(function update() {
    const d = target - Math.floor(Date.now() / 1000);
    tElem.textContent = d <= 0 ? "It has arrived." :
        `${Math.floor(d / 86400)}d ${String(Math.floor(d % 86400 / 3600)).padStart(2, '0')}h ${String(Math.floor(d % 3600 / 60)).padStart(2, '0')}m ${String(d % 60).padStart(2, '0')}s`;
    setTimeout(update, 1000);
})();

const amplitude = 10,
    period = 2000;
let start = null;
function floatAnim(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const offset = amplitude * Math.sin((2 * Math.PI * elapsed) / period);
    const scale = wrapper.matches(':hover') ? 1.08 : 1;
    tElem.style.transform = `translateY(${offset.toFixed(2)}px) scale(${scale.toFixed(2)})`;
    requestAnimationFrame(floatAnim);
}
wrapper.addEventListener('animationend', e => {
    if (e.animationName === 'fadeSlideIn') requestAnimationFrame(floatAnim);
});

const logo = document.querySelector('#header img');
const logoAmp = 0.03,
    logoPeriod = 4000;
let logoStart = null;
function logoScale(ts) {
    if (!logoStart) logoStart = ts;
    const elapsed = ts - logoStart;
    const scale = 1 + logoAmp * Math.sin((2 * Math.PI * elapsed) / logoPeriod);
    logo.style.transform = `scale(${scale.toFixed(3)})`;
    requestAnimationFrame(logoScale);
}

document.getElementById('header').addEventListener('animationend', e => {
    if (e.animationName === 'fadeSlideIn') {
        requestAnimationFrame(logoScale);
        loopHopWave();
    }
});

const textElem = document.getElementById('countdown-text');
const text = textElem.textContent;
textElem.textContent = '';
const spans = [...text].map(c => {
    const span = document.createElement('span');
    span.innerHTML = c === ' ' ? '&nbsp;' : c;
    textElem.appendChild(span);
    return span;
});

function hopWave() {
    spans.forEach((s, i) => {
        setTimeout(() => {
            s.style.transform = 'translateY(-8px)';
            setTimeout(() => {
                s.style.transform = 'translateY(0)';
            }, 300);
        }, i * 150);
    });
}
function loopHopWave() {
    hopWave();
    setTimeout(loopHopWave, spans.length * 150 + 300 + 2700);
}