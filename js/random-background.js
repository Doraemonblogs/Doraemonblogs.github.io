// 配置你的图片总数
const bgAmount = 39; // 根据实际图片数量修改
const randomIndex = Math.floor(Math.random() * bgAmount) + 1;
const bgUrl = `/img/background/${randomIndex}.webp`;


// 应用背景到指定元素（根据主题结构可能需要调整选择器）
document.addEventListener('DOMContentLoaded', function() {
    const bgElement = document.getElementById('web_bg'); // Butterfly主题的背景容器
    if (bgElement) {
        bgElement.style.backgroundImage = `url(${bgUrl})`;
    } else {
        document.body.style.backgroundImage = `url(${bgUrl})`;
    }
});