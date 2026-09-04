var staypuft = staypuft || {};

var configs = {
    
    'persona': {

        itemURL: 'http://store.shop-persona.com/product/apollo-moc-pigeon-grey',
        valueToSearch: '9',
        addToCartURL: '/cart',
        addToCartIDParam: 'cart[add][id]',
        additionalAddToCartParams: {
        },
        attemptCheckout: true,
        checkoutURL: '/cart',
        checkoutParams: {
            'cart[shipping_country_id]': '43'
        },
        checkoutRedirect: "/cart" 
    },     
    
    'caliroots': {
        itemURL: 'http://caliroots.com/saucony-grid-sd-s70191-1/p/43356',
        valueToSearch: 'US 9',
        addToCartURL: '/cart/add',
        addToCartIDParam: 'id',
        additionalAddToCartParams: {
        },
        attemptCheckout: false,
        checkoutURL: '/cart',
        checkoutParams: {
        },
        checkoutRedirect: "/cart/view"             
    },
    'burnrubber': {
        itemURL: 'http://burnrubbersneakers.com/collections/adidas-shoes/products/adidas-tennis-super-ftwr-white-cyber-met',
        valueToSearch: '11.5',
        addToCartURL: '/cart/add',
        addToCartIDParam: 'id',
        additionalAddToCartParams: {
        },
        attemptCheckout: false,
        checkoutURL: '/cart',
        checkoutParams: {
        },
        checkoutRedirect: "/cart"          
    }
    
};

staypuft.init = function(config) {   
    if(typeof config !== "undefined") {
        this.config = config;
    }
    var self = this;
    this.iVal = setInterval(function(){
       self.watchPage(self.config.itemURL, self.config.valueToSearch); 
    }, 1000);
   
};

staypuft.stop = function(){
    if(this.iVal) {
        console.log('Stopping page watch...')
        clearInterval(this.iVal);
    }
};

console.log('staypuft.init.loaded...');

/* Receive message from background page */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if(request.action === 'start') {
        if(typeof request.params === "string") {
            staypuft.init(configs[request.params]);
        } else {
            staypuft.init(request.params);
        }
    } else {
        staypuft.stop();
    } 
});