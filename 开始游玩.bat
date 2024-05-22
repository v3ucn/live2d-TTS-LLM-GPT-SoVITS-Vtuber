pushd %~dp0
call npm install live-server
npx live-server %*
pause
popd
