title AUTO TEST RUNNER
if  exist tmp powershell -Command "rm -r tmp"
call node ../../node_modules/typescript/bin/tsc
if not exist reports\dashboardReport mkdir reports\dashboardReport

SET PTR=../../node_modules/protractor/bin/protractor

if "%~1"=="" ( 
start /w /b node %PTR% tmp/conf.js
pause
)
if NOT "%~1"=="" start /w /b node %PTR% tmp/conf.js --specs="%~1"