console.log("This is Script File")


const toggleSidebar = () => {
    if ($(".sidebar").is(":visible")){
        // true
        $(".sidebar").css("display", "none");
        $(".content").css("margin-left", "0%")
    }else{
        // false
        $(".sidebar").css("display", "block");
        $(".content").css("margin-left", "20%")
    }
};

// first request - to server to create order

const paymentStart = () => {
    console.log("payment started..."); 
    let amount = $("#payment_field").val();
    console.log(amount);
    if (amount == "" || amount == null) {
        alert("amount is required !!!");
        return;
    }

    // code...
    // we will use ajax to send request to server to create order - jquery 

    $.ajax(
        {
            url:'/user/create_order',
            data:JSON.stringify({amount:amount,info:'order_reqest'}),
            contentType:'application/json',
            type:'POST',
            dataType:'json',
            success:function(response){
                // invoked when success
                console.log(response);
                if(response.status == "created") {
                   //  open payment form
                   let options={
                       key: 'rzp_test_mXGvX8fviHVTIp',
                       amount:response.amount,
                       currency:'INR',
                       name:'Smart Contact Manager',
                       description:'Donation',
                       Image:'https://yt3.ggpht.com/-4BGUu55s_ko/AAAAAAAAAAI/AAAAAAAAAAA/3Cfl_C4o8Uo/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg',
                       order_id:response.id,
                       handler:function(response){
                           console.log(response.razorpay_payment_id);
                           console.log(response.razorpay_order_id);
                           console.log(response.razorpay_signature);
                           console.log('payment successful !!!');
                           alert("congrates ! Payment Successful !!!");
                       },
                       prefill: {
                        name: "",
                        email: "",
                        contact: "",
                    },

                    notes: {
                        address: "Learn code with shamim"
                    },

                    theme: {
                        color: "#3399cc"
                    },
                 };
                    let rzp = new Razorpay(options);

                    rzp.on('payment.failed', function (response){
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("Oops Payment Failed !!!");
                });

                rzp.open();
                   
                }
            },
            error:function(error){
                // invoked when error
                console.log(error)
                alert("something went wrong !!!")
            }
        }
    )
    
};

