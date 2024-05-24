pushd %~dp0
call npm install express ejs
node app.js %*
pause
popd
