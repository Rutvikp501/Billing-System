
const Url= require('../models/URL.model')
const utils=require('../Util/url.util')
const  crypto = require("crypto");

exports.get_all_URLs = async (req, res) => {
    Url.find((error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
};
exports.create_url = async (req, res) => {
    console.log("HERE",typeof(req.body.url));
    const origUrl = req.body.url; // Directly assign req.body.url to origUrl
    const base = `http://localhost:5011`;
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
          const hash = crypto.createHash('sha256').update(origUrl).digest('base64');
          const shortCode = hash.substring(0, 8);
          const shortUrl = `${base}/${shortCode}`;
        url = new Url({
          origUrl,
          shortUrl,
          urlId:shortCode,
          date: new Date(),
        });
    
        await url.save(); // Fixed typo: changed Url.save() to url.save()
        res.json(url); // Changed Url to url
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
    
};
exports.redirect_url = async (req, res) => {

    try {
        const url = await Url.findOne({ urlId: req.params.urlId });
        if (url) {
            Url.clicks++;
            await url.save();
          return res.redirect(url.origUrl);
        } else res.status(404).json("Not found");
      } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
      }
};

// get all saved URLs 
// app.get("/all", async (req, res) => {
//     Url.find((error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.json(data);
//       }
//     });
//   })
  
//   // URL shortener endpoint
//   app.post("/short", async (req, res) => {
//     console.log("HERE",req.body.url);
//     const { origUrl } = req.body;
//     const base = `http://localhost:3333`;
  
//     const urlId = shortid.generate();
//     if (utils.validateUrl(origUrl)) {
//       try {
//         let url = await Url.findOne({ origUrl });
//         if (url) {
//           res.json(url);
//         } else {
//           const shortUrl = `${base}/${urlId}`;
  
//           url = new Url({
//             origUrl,
//             shortUrl,
//             urlId,
//             date: new Date(),
//           });
  
//           await url.save();
//           res.json(url);
//         }
//       } catch (err) {
//         console.log(err);
//         res.status(500).json('Server Error');
//       }
//     } else {
//       res.status(400).json('Invalid Original Url');
//     }
//   });
  
//   // redirect endpoint
//   app.get("/:urlId", async (req, res) => {
//     try {
//       const url = await Url.findOne({ urlId: req.params.urlId });
//       console.log(url)
//       if (url) {
//         url.clicks++;
//         url.save();
//         return res.redirect(url.origUrl);
//       } else res.status(404).json("Not found");
//     } catch (err) {
//       console.log(err);
//       res.status(500).json("Server Error");
//     }
//   });