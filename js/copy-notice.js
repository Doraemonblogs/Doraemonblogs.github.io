// new Vue({
//     data: function () {
//         this.$success({
//             title: "哎嘿!复制成功",
//             message: "若要转载最好保留原文链接哦，给你一个大大的赞!",
//             position: 'top-left',
//             offset: 50,
//             showClose: true,
//             type: "seccess",
//             duration: 5000
//         });
//     }
// })

// copy-notice.js
document.addEventListener('copy', () => {
    this.$notify({
      title: '复制成功',
      message: '转载时请保留原文链接哦~',
      type: 'success',
      duration: 3000,
      offset: 50,
      customClass: 'copy-notice',
      iconClass: 'iconfont icon-copy-success'
    });
  });