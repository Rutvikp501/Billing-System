const Productmodel = require("../models/Product.model");
const XLSX = require('xlsx');

const multer = require('multer');
const upload = multer().single('file');
exports.GetAllProduct = async (req, res) => {

    try {
        const Product = await Productmodel.find();
        if (Product.length > 0) {
            res.status(200).send(Product)
        } else {
            res.status(200).send("Dont have Products To Show...")
        }
    } catch (error) {
        console.log(error);
    }
};
exports.ShowAllProduct = async (req, res) => {

    try {
        const Product = await Productmodel.find();
        if (Product.length > 0) {
            Product.sort((a, b) => {
                // Convert both Product names to lowercase for case-insensitive comparison
                const productA = a.Product.toLowerCase();
                const productB = b.Product.toLowerCase();
                
                
                if (productA < productB) {
                    return -1; //
                } else if (productA > productB) {
                    return 1; 
                } else {
                    return 0; 
                }
            });
            res.render("EJS/AllProducts", { data: Product });
        } else {
            res.status(200).send("Dont have Products To Show...")
        }
    } catch (error) {
        console.log(error);
    }
};
exports.fileupload = async (req, res, next) => {
    try {
        const data = await Productmodel.find();
        res.render("fileupload", { data: data });
        // res.render("fileupload");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.CreateProducts = async (req, res) => {
    const { Product,Competition_Product, SKU, DPL, Quantity } = req.body
    const getExistingProduct = await Productmodel.find({ Product: Product });

    try {


        if (getExistingProduct != "") {
            return res.send({ status: "failed", message: "Product Already exist" });
        } else {
            const Product = new Productmodel({
                Product: Product,
                Competition_Product: Competition_Product,
                SKU: SKU,
                DPL: DPL,
                Quantity: Quantity
            })
console.log(Product);
            //await Product.save();
            res.send("Product Registered Successfully");
        }


    } catch (err) {
        console.log(err);
        res.send("Error...");
    }
};


exports.Edit = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Productmodel.findById(id);
        response.send({
            status: "success",
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};


exports.Update = async (req, res) => {
    const { Product, SKU, DPL, Quantity } = req.body
    const getExistingProduct = await Productmodel.find({ Product: Product });

    try {


        if (getExistingProduct != "") {
            return res.send({ status: "failed", message: "Product already exist." });
        } else {

            const Product = new Productmodel({
                Product: Product,
                SKU: SKU,
                DPL: DPL,
                Quantity: Quantity
            })
            await Product.save();
            res.send("Product Updated Successfully");
        }



    } catch (err) {
        console.log(err);
        res.send("Error...");
    }
};


exports.insertProductData = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        const Data = req;
        try {
            const workbook = XLSX.read(req.file.buffer);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const tabularData = XLSX.utils.sheet_to_json(sheet);
            const ProductgroupedData = {};
            let currentCompetitionProduct = '';
            let currentProduct = '';
            
            
            tabularData.forEach(entry => {
                if (entry['Product']) {
                    currentProduct = entry['Product'];
                } else {
                    entry['Product'] = currentProduct;
                }
            
                if (entry['competition Product']) {
                    currentCompetitionProduct = entry['competition Product'];
                } else {
                    entry['competition Product'] = currentCompetitionProduct;
                }
            
                const competitionProduct = entry['competition Product'];
                const product = entry['Product'];
                if (!ProductgroupedData[product]) {
                    ProductgroupedData[product] = {};
                }
                if (!ProductgroupedData[product][competitionProduct]) {
                    ProductgroupedData[product][competitionProduct] = [];
                }
                ProductgroupedData[product][competitionProduct].push({ 'Product': product, 'competition Product': competitionProduct, SKU: entry['SKU '], DPL: entry.DPL });
            });
            
            const result = Object.values(ProductgroupedData).map(product => Object.values(product));
            result.forEach(productGroups => {
                productGroups.forEach(competitionGroups => {
                    competitionGroups.forEach(async entry => {
                         //console.log(entry['Product'], entry['competition Product'], entry.SKU, entry.DPL);
                         //const ProductData = await Productmodel.insertMany(result);
                         //console.log(ProductData);
                         const Product = new Productmodel({
                            Product: entry['Product'],
                            Competition_Product: entry['competition Product'],
                            SKU: entry.SKU,
                            DPL: entry.DPL,
                        })
                        //await Product.save();
                       console.log(Product);
                    });
                });
            });
            res.send(`${result} competition products processed`); // Sending the number of processed competition products
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }

    });
};


exports.insertProductData = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        const Data = req;
        try {
            const workbook = XLSX.read(req.file.buffer);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const tabularData = XLSX.utils.sheet_to_json(sheet);
            const ProductgroupedData = {};
            let currentCompetitionProduct = '';
            let currentProduct = '';
            
            // Function to check if a document already exists in the database
            const isDuplicateEntry = async (product, competitionProduct) => {
                const existingEntry = await Productmodel.findOne({ Product: product, Competition_Product: competitionProduct });
                return !!existingEntry; // Returns true if a matching document is found
            };
            
            for (const entry of tabularData) {
                if (entry['Product']) {
                    currentProduct = entry['Product'];
                } else {
                    entry['Product'] = currentProduct;
                }
            
                if (entry['competition Product']) {
                    currentCompetitionProduct = entry['competition Product'];
                } else {
                    entry['competition Product'] = currentCompetitionProduct;
                }
            
                const competitionProduct = entry['competition Product'];
                const product = entry['Product'];
                if (!ProductgroupedData[product]) {
                    ProductgroupedData[product] = {};
                }
                if (!ProductgroupedData[product][competitionProduct]) {
                    ProductgroupedData[product][competitionProduct] = [];
                }
                const isDuplicate = await isDuplicateEntry(product, competitionProduct);
                if (!isDuplicate) {
                    ProductgroupedData[product][competitionProduct].push({ 'Product': product, 'competition Product': competitionProduct, SKU: entry['SKU '], DPL: entry.DPL });
                }
            }
            
            const result = Object.values(ProductgroupedData).map(product => Object.values(product));
            for (const productGroups of result) {
                for (const competitionGroups of productGroups) {
                    for (const entry of competitionGroups) {
                        const Product = new Productmodel({
                            Product: entry['Product'],
                            Competition_Product: entry['competition Product'],
                            SKU: entry.SKU,
                            DPL: entry.DPL,
                        });
                        // Save the document only if it's not a duplicate
                        await Product.save();
                    }
                }
            }
            res.send(`${result} competition products processed`); // Sending the number of processed competition products
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }

    });
};



