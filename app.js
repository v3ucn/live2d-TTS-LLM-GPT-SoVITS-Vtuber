const express = require("express");
const fs = require('fs');
var ejs=require('ejs');
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
  console.log("请打开浏览器，访问 http://localhost:3000 ");
});


// serve your css as static
app.use(express.static(__dirname));

//设置html模板渲染引擎
app.engine('html',ejs.__express);
//设置渲染引擎为html
app.set('view engine','html');


// 修改json接口

app.get("/edit_config", (req, res) => {
    

    var model_path = req.query.model_path;

    var filePath = "./config.json"

    // 读取文件内容
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            
            var data = '{"model_path":"' + model_path + '"}';

            console.log(data);

            // 写入修改后的内容到文件
            fs.writeFile(filePath, data, 'utf8', (err) => {
                if (err) {
                    res.status(500).send('Error writing file');
                } else {
                    
                    res.status(200).send('File updated successfully');
                }
            });
        }
    });
  



});


// 文字转语音
app.get("/tts", (req, res) => {

    var filePath = "./config.json"

    // 读取文件内容
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file,配置文件不存在');
        } else {

            console.log(data);

            const jsonData = JSON.parse(data);
            const modelPath = jsonData.model_path;
            
            res.render(__dirname + "/live2d_test",{model_path: modelPath});
        }
    });

    

  
});


app.get("/", (req, res) => {
    res.render(__dirname + "/index");
});
