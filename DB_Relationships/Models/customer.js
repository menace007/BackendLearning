const mongoose = require("mongoose");
const {Schema} = mongoose;
main()
    .then(()=> console.log("Connection successful"))
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
const orderSchema = new Schema({
    item: String,
    price: Number,
});

const Order = mongoose.model("Order", orderSchema);
// const addOrders = async ()=>{
//    let res =  await Order.insertMany([
//         {
//             item: "Samosa",
//             price: 12,
//         },
//         {
//             item: "Lays",
//             price: 10
//         },
//         {
//             item: "KitKat",
//             price: 40
//         }
//     ]);
//     console.log(res);
// }
// addOrders();

const customerSchema = new Schema({
    name: String,
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

const Customer = mongoose.model("Customer", customerSchema);
const addCustomer = async()=>{
    let cust1 = new Customer({
        name: "Menace",
    })
    let order1 = await Order.findOne({item: "Lays"})
    let order2 = await Order.findOne({item: "KitKat"})
    let order3 = await Order.findOne({item: "Samosa"})
    cust1.orders.push(order1);
    cust1.orders.push(order2);
    cust1.orders.push(order3);
    let res = await cust1.save();
    console.log(res);
}
// addCustomer();

const findCustomer = async ()=>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}
findCustomer();