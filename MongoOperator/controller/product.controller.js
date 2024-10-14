
const Product = require("../model/product.model")

// Get operation from DB
const getProducts=async(req,res)=>{
    try {
        const allProducts = await Product.find();
        if(allProducts.length > 0){
            return res.status(200).json({success:true,data:allProducts.reverse()});
        }else{
            return res.status(404).json({success:false,message:'Products Not foound'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});

    };
};


// Get single data operation from DB
const getSingleProduct=async(req,res)=>{
    try {
        const {pId}=req.params;
        const product = await Product.findById(pId);
        if(product){
            return res.status(200).json({success:true,data:product});
        }else{
            return res.status(404).json({success:false,message:'Product Not foound'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});

    };
};

// get products use query selector
const ratingQueryProduct= async(req,res)=>{
    try {
        // const {minRat,maxRat}=req.query;
        // const {fstCat,secCat}=req.query;
        // console.log(minRat,maxRat);
        // const allProducts = await Product.find({$or:[{ catagory: { $in:'mobail' } },{ catagory: { $in:'tablet'} }]});
        // this is $and logical query and $gte $lte comparision query
        // const allProducts = await Product.find({$and:[{ rating: { $gte:4.3 } },{ rating: { $lte: 4.8 } }]});
        const allProducts = await Product.find({$and:[{ rating: { $gte:4.5 } },{ catagory: { $in:'mobail'}}]});
        if(allProducts.length>0){
            return res.status(200).json({success:true,data:allProducts.reverse()});
        }else{
            return res.status(404).json({success:false,message:'Products Not found'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});

    };
};


// data add operation in DB
const addProduct=async(req,res)=>{
    try {
        const {name, title, catagory , price,rating}=req.body;
        if (name && title && catagory && price && rating) {
            const addProduct = new Product({
                name: name,
                title:title,
                price:parseInt(price),
                catagory:catagory,
                rating:parseFloat(rating),
            });
            const newProduct =  await addProduct.save();
            if (newProduct) {
                return res.status(201).json({success:true,Product:newProduct});
            };
        } else {
            return res.status(404).json({success:false,message:'Please fill the form correctly'}); 
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// Update operation in DB
const updateProduct=async(req,res)=>{
    try {
        const {pId}=req.params;
        const {name, title, catagory , price,rating}=req.body;
        const product= await Product.findById(pId);
        if (product) {
            const updateProduct = await Product.findByIdAndUpdate(pId,{
                $set:{
                    name: name,
                    title:title,
                    price:parseInt(price),
                    catagory:catagory,
                    rating:parseInt(rating),
                }
            },{new:true});
            if (updateProduct) {
                return res.status(201).json({success:true,Product:updateProduct});
            };
        } else {
            return res.status(404).json({success:false,message:'Product Not foound'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// Delete operation from DB
const deleteProduct=async(req,res)=>{
    try {
        const {pId}=req.params;
        const product= await Product.findById(pId);
        if (product) {
            const deleteProduct = await Product.findByIdAndDelete(pId);
            if (deleteProduct) {
                return res.status(201).json({success:true,message:'Product Deleted Successfully',product:deleteProduct});
            };
        } else {
            return res.status(404).json({success:false,message:'Product Not foound'});
        }
    } catch (error) {
                return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});

    };
};



module.exports={getProducts, getSingleProduct, addProduct, updateProduct, deleteProduct, ratingQueryProduct}