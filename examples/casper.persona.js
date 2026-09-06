

var casper = require('casper').create();
var interval = 1000;
var url = 'http://store.shop-persona.com/product/grey-suede-iced'; 
//var url = 'http://store.shop-persona.com/product/grid-sd-kushwacker';

var addToCart = '#product-addtocart';

casper.checkLink = function checkLink() {
    
    this.echo('Looping to check if add to cart button exists...');
    
    this.open(url).then(function() {
        if (this.exists(addToCart)) {
            this.echo('Button found, clicking button...');
            this.thenClick(addToCart).then(function() {
                this.echo('Done.').exit();
            });
        } else {
            this.warn('Link not found, scheduling another attempt');
            this.wait(interval);
        }
    });
    
    this.run(this.checkLink);
};

casper.start().checkLink();