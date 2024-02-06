const Razorpay = require('razorpay'); 
// var { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

var razorpayInstance = new Razorpay({
    key_id:"rzp_test_jTnVQBhABpseez",
    key_secret: "uuuGsMZ5ZjUDQVEaBwgwW6Qh"
});

var renderProductPage = async(req,res)=>{

    try {
        res.render('product');
    } 
    catch (error) {
        console.log(error.message);
    }

}

var createOrder = async(req,res)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'visheshverma4231@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:"rzp_test_jTnVQBhABpseez",
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"8445172303",
                        name: "Vishesh Verma",
                        email: "visheshverma4231@gmail.com"
                    });
                }

                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    renderProductPage,
    createOrder
};