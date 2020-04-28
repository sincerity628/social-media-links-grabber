document.addEventListener('DOMContentLoaded', () => {
  // 发送消息给 content_script 请求数据
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { msg: 'getData' }, (res) => {
      console.log(res);
      if(!res.res) {
        // 添加数据到插件中
        addData(res);
      }
    })
  });
});

const linksList = document.getElementById('links-list');

// 将数据添加到插件中
function addData(data) {
  if(data === undefined || !linksList) return;
  // 清空原有的数据
  linksList.innerHTML = '';
  for(let i = 0, length = data.length; i < length; i++ ) {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>${data[i].title}:</p>
      <a href="${data[i].url}" target="_blank">${data[i].url}</a>
    `;;
    // 将建立好的结点插入 linkList 中
    linksList.appendChild(li);
  }
}
