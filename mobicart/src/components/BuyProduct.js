import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import StripeCheckout from 'react-stripe-checkout'
import { CartState } from "../context/Context";
toast.configure()

const BuyProduct = () => {
    const history=useHistory();

const{name}=useParams();
const {
    state: {products },
    dispatch
    } = CartState();

 const[product,setPurchaseProduct]=useState(null)
   useEffect(()=>{
   const product=products.filter(o=>o.name===name)
   setPurchaseProduct(product[0])
   console.log(process.env.REACT_APP_KEY)
   },[])


  

      const BuyNow=(token)=>{
       
         
        return(
         fetch(`/makepayment`,{
           method:"post",
           headers:{
               "content-Type":"application/json",
              
           },
           body:JSON.stringify({
          token,
     
          })
       }).then(res=>{
           console.log(res)
           if(res.statusText==="OK"){
           
     
            dispatch({type:"ADD_TO_ORDERED_PRODUCTS_VIA_INDIVIDUALLY",payload:product})
            
            toast.success( "Product purchased successfully",{position:toast.POSITION.TOP_CENTER})
            history.push('/')
          }
        
        })
       .catch(err=>console.log(err))
     
        )
         
        }

    return (
        <div >{
            product?
            <>
            <div className="container" 
            style={{margin:"20px",padding:"20px",display:"flex",justifyContent:"center",alignItems:"center",
            alignContent:"center",flexDirection:"column"}}>
                <img src={product.image} alt="image" style={{height:"350px",width:"200px"}}/>
            <h5>{product.name}</h5>
            <h6>{product.price}</h6>   
           
            <h4>{product.ratings}★</h4>
            <button
              className="btn  btn-outline-warning  "
             
            >

            <StripeCheckout
             stripeKey="pk_test_51JUQKISIc19WDGdZtOXH8ueCYk0N31t1sEfjZohHXJldiPETLm6ZV17yuFtHZagIQR8Y7UmK1GOME8Em2Fi5uGRP00oVSHiNkO"
            //stripeKey={process.env.REACT_APP_KEY}
            token={BuyNow}
            name="Buy Product"
            // amount={prod.price*100}
           
            >
           
              Proceed to Payment
            
            </StripeCheckout>
            </button>
            </div>
            
       
            </>
            :"Loading"
        }
        </div>

    )
}

export default BuyProduct
