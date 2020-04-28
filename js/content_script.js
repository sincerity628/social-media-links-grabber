const links = getData();
// 监听数据请求信息
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if(request.msg == "getData") {
      const data = links? links : getData();
      if(data.length === 0) {
        sendResponse({res: '暂无数据...'});
      } else {
        sendResponse(data);
      }
    }
  }
);

// 获取页面数据
function getData() {
  const footer = document.querySelector('footer');
  const links = footer.getElementsByTagName('a');

  // 处理获取到的数据
  const dataArray = [];
  for(let i = 0, length = links.length; i < length; i++) {
    let data = {
      title: links[i].innerHTML,
      url: links[i].href
    };
    dataArray.push(data);
  }
  // 将数据返回
  return dataArray;
}
