// 简单，避免视觉重复，每次刷新都有变化
let lastIndex = -1;
const bgAmount = 36;

function getRandomIndex() {
    let index;
    do {
        index = Math.floor(Math.random() * bgAmount) + 1;
    } while (index === lastIndex); // 避免和上次相同
    lastIndex = index;
    return index;
}

const randomIndex = getRandomIndex();
const bgUrl = `/img/background/${randomIndex}.webp`;

document.addEventListener('DOMContentLoaded', function () {
    const bgElement = document.getElementById('web_bg');
    if (bgElement) {
        bgElement.style.backgroundImage = `url(${bgUrl})`;
    } else {
        document.body.style.backgroundImage = `url(${bgUrl})`;
    }
});


// 按小时、日动态改变
// const bgAmount = 36;
// const date = new Date();
// const hour = date.getHours();
// const randomIndex = (hour % bgAmount) + 1; // 每小时变化
// const bgUrl = `/img/background/${randomIndex}.webp`;
