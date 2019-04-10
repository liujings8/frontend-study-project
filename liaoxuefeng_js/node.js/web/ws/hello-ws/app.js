//导入WebSocket模块
const WebSocket = require('ws');

//引入Server类
const WebSocketServer = WebSocket.Server;

//实例化
const wss = new WebSocketServer({
    port: 3000
});

/**
 * 如果由WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket。
 * 在connection事件中，回调函数会传入一个Websciket实例，表示这个Websocket连接。
 * 对于每个Websocket连接，我们都要对它绑定某些事件方法来处理不同的事件。
 * 这里，我们通过响应message事件，在收到消息后在返回'What's your name'的消息给客户端
 */
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection() `);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        setTimeout(function () {
            ws.send(`What's your name`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        }, 1000);
    })
});

console.log('ws server started at port 3000...');

//client test:
let count = 0;

let ws = new WebSocket('ws://localhost:3000/ws/chat');

/**
 * 打开WebSocket连接后立刻发送一条消息：
 */
ws.on('open',function(){
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

//响应收到的消息
ws.on('message', function(message){
    console.log(`[CLINET] Received: ${message}`);
    count++;
    if(count>3){
        ws.send('GoodBye!');
        ws.close();
    }else{
        setTimeout(()=>{
            ws.send(`Hello,I'm Mr No.${count}!`);
        },1000);
    }
})
