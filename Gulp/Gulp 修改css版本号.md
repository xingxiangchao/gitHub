# Gulp 

标签（空格分隔）： gulp

---

#### Gulp 修改css 版本号

 1. 安装Gulp
    ```
    npm install --save-dev gulp
    ```
 2. 打开 node_modules\gulp-rev\index.js
    ```
    第134行 manifest[originalFile] = revisionedFile;
    更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;
    ```
    
 3. 打开node_modules\rev-path\index.js
    ```
    第9行return modifyFilename(pth, (filename, ext)=> `${filename}-${hash}${ext}`);
    更新为: return modifyFilename(pth, (filename, ext) => `${filename}${ext}`);
    ```
 4. 打开node_modules\gulp-rev-collector\index.js
      ```
        第40行 var cleanReplacement = path.basename(json[key]).replace(new RegExp( opts.revSuffix ), ''）
        更新为 var cleanReplacement =  path.basename(json[key]).split('?')[0];
      ```
 5. 结果达到预期，如下(Html)：
     ```
     href="css/main.css?v=885e0e1815"
     ```