const Productmodel = require("../models/Product.model");

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
    const jsonData = req.body;
    try {
        for (const sheetName in jsonData) {
            if (jsonData.hasOwnProperty(sheetName)) {
                const sheetData = jsonData[sheetName];
                for (const entry of sheetData) {
                    // Check if the entry has a Product field
                    if (entry['Product']) {
                        const { 'Product': Product, SKU, diyan, kj2004, } = entry;
                        // Create an array of players with their points
                        const playersData = [
                            { name: 'ishan', points: ishan },
                            { name: 'diyan', points: diyan },
                            { name: 'kj2004', points: kj2004 },
                            { name: 'vedant', points: vedant },
                            { name: 'aryan', points: aryan },
                            { name: 'vishesh', points: vishesh },
                            { name: 'shreyans', points: shreyans },
                            { name: 'hitanshu', points: hitanshu }
                        ];

                        // Check if the data already exists in the database
                        const existingProduct = await ProductData.findOne({ Product: Product });

                        if (existingProduct) {
                            // Update existing Product data
                            existingProduct.players = playersData;
                            await existingProduct.save();
                            console.log('Product data updated successfully');
                        } else {
                            // Create a new ProductData object and save it to the database
                            const ProductData = new ProductData({
                                date: date,
                                Product: Product,
                                players: playersData
                            });
                            await ProductData.save();
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
