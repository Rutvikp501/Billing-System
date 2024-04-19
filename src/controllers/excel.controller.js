"use strict";
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require("path");
const excelCreation = require("../Util/excel.util");
const { sendFileMailer } = require('../Util/Mail.util');

exports.Excel_Creation_format = async (req, res) => {
    try {
        const data = [
            ['Table 1', '1234567890', 'Male'],
            ['Table 2', '9876543210', 'Female'],
            ['Table 3', '5555555555', 'Other']
        ];

        
        const buffer = await excelCreation(data); // Pass necessary parameters if needed
        // Set appropriate headers and send the buffer as the response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="TEST.xlsx"');
        res.send(buffer);
    } catch (error) {
        console.error("Error generating excel:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
