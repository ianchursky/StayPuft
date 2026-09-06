var config = require('./config');
var cheerio = require('cheerio');
var req = require('request');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;
	
var checker = setInterval(function(){
    req({
        
        followAllRedirects: true,
        url: config.site.url
        
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            $ = cheerio.load(body); 
            var item = $(config.site.cartButton);
            var sizes = $(config.site.sizeSelector);

            if(item.length > 0) {
                clearInterval(checker);
                console.log('Add to cart button has been found. Kick off adding to cart...');
                webDriver();

            } else {
                console.log('Add to cart button not found. Checking again....')
            }
        }
    });

}, 1000); 

function webDriver(){
    var driver = new webdriver.Builder().forBrowser('firefox').build();
    driver.get(config.site.url);

    // sizes
    var selectList, desiredOption;
    var size = config.site.size;
    selectList = driver.findElement(By.css(config.site.sizeSelector));
	
    selectList.findElements(By.tagName('option'))
    .then(function findMatchingOption(options){
        options.some(function(option){
            option.getText().then(function doesOptionMatch(text){
                if (size === text){
                        desiredOption = option;
                }
            });
        });
    })
    .then(function(){
        if (desiredOption){
            desiredOption.click();
        }
    }).then(function(){
        driver.findElement(By.css(config.site.cartButton)).click();
    });	

    driver.sleep(1000000);
}

function beep() {
    console.log("\007"); 
}