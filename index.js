let fs = require('fs');
// read in products file
fs.readFile('./products.json', (err, data) => {
    if (err) return console.log('Invalid data');
    let products = JSON.parse(data);
    // read in productDiscounts file
    fs.readFile('./productDiscounts.json', (err, data) => {
        if (err) return console.log('Invalid data');
        let discounts = JSON.parse(data);
        // read in productPrices file
        fs.readFile('./productPrices.json', (err, data) => {
            if (err) return console.log('Invalid data');
            let prices = JSON.parse(data);
            // create an new array using map function
            let newProducts = products.map((element) => {
                // find price and discount which match productId of the product array 
                const correspondingPrice = prices.find(p => p.productId == element.productId);
                const correspondingDiscount = discounts.find(d => d.productId == element.productId)
                return {
                    // spread operator - assign all properties from element to this new object
                    ...element,
                    price: correspondingPrice ? correspondingPrice.price : null,
                    discount: correspondingDiscount ? correspondingDiscount.discount : 0
                };
            });
            console.log(newProducts);
            // change product array into Json string
            result = JSON.stringify(newProducts);
            // create JSON file called productComposites.json
            fs.writeFile('productComposites.json', result, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        });
    });
});


