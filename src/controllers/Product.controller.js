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
    const { Product, SKU, DPL, Quantity } = req.body
    const getExistingProduct = await Productmodel.find({ Product: Product });

    try {


        if (getExistingProduct != "") {
            return res.send({ status: "failed", message: "Product Already exist" });
        } else {
            const Product = new Productmodel({
                Product: Product,
                SKU: SKU,
                DPL: DPL,
                Quantity: Quantity
            })

            await Product.save();
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
        console.log(Data);
        try {
            const workbook = XLSX.read(req.file.buffer);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const tabularData = XLSX.utils.sheet_to_json(sheet);
            console.log(tabularData);
            let currentProduct = ''; // Track the current product being processed
            const processedData = [];

            tabularData.forEach(entry => {
                if (entry.Product) {
                    // If Product field is present, update current product
                    currentProduct = entry.Product;
                } else if (entry['SKU '] && entry.DPL) {
                    // If both SKU and DPL are defined, add the entry
                    processedData.push({
                        product: currentProduct,
                        sku: entry['SKU '], // Remove extra space in the key
                        dpl: entry.DPL
                        // Add other fields as needed
                    });
                }
            });
            console.log(processedData);

            //const result = await Productmodel.insertMany(jsonData);
            res.send(`${processedData} documents inserted`);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
    });
};


exports.insertProductData1 = async (req, res, next) => {
    const jsonData = req.body;
    console.log(jsonData);
    try {
        for (const sheetName in jsonData) {
            if (jsonData.hasOwnProperty(sheetName)) {
                const sheetData = jsonData[sheetName];
                for (const entry of sheetData) {
                    // Check if the entry has a Product field
                    if (entry['Product']) {
                        const { 'Product': Product, SKU, DPL, Quantity } = entry;
                        // Create an array of players with their points


                        // Check if the data already exists in the database
                        const existingProduct = await Productmodel.findOne({ Product: Product });

                        if (existingProduct) {
                            // Update existing Product data
                            existingProduct.Product = existingProduct;
                            //await existingProduct.save();
                            console.log('Product data updated successfully');
                        } else {
                            // Create a new ProductData object and save it to the database
                            const ProductData = new ProductData({
                                Product: Product,
                                SKU: SKU,
                                DPL: DPL,
                                Quantity: Quantity
                            });
                            // await ProductData.save();
                            console.log(ProductData);
                            // console.log('Product data inserted successfully');
                        }
                    } else {
                        console.log('Skipping entry without a Product field');
                    }
                }
            }
        }

    } catch (error) {
        console.error('Error inserting/updating Product data:', error);
    }
};


