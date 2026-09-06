/*jshint strict:false*/
/*global CasperError console phantom require*/
var casper = require('casper').create({
        logLevel: "debug",
        verbose: true
    }),
    interval = 1000,       // 1 second
    url = 'http://google.com/'; // URL to check

casper.checkLink = function checkLink() {
    this.echo('Setting up check steps...');
    this.open(url).then(function() {
        if (this.exists('#selector-to-your-link')) {
            this.echo('link was found, clicking');
            this.thenClick('#selector-to-your-link').then(function() {
                // add stuff to be done
                // ... then exit
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