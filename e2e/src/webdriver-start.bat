title WEBDRIVER

SET WDM=../../node_modules/protractor/bin/webdriver-manager

CALL node %WDM% update --chromedriver  --versions.chrome=80.0.3987.149 --ignore_ssl --standalone true

node %WDM% start --ignore_ssl --standalone false 