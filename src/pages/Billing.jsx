import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import { FaTrash } from "react-icons/fa";

const Billing = () => {

  const { products, updateStock } = useContext(StoreContext);

  const [customer,setCustomer] = useState("");
  const [phone,setPhone] = useState("");
  const [search,setSearch] = useState("");
  const [cart,setCart] = useState([]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToBill = (product)=>{

    const existing = cart.find(c=>c.id===product.id);

    if(existing){

      setCart(
        cart.map(c=>
          c.id===product.id
          ? {...c,qty:c.qty+1}
          : c
        )
      );

    }else{

      setCart([
        ...cart,
        {
          id:product.id,
          name:product.name,
          price:product.price,
          gst:product.gst,
          qty:1
        }
      ]);

    }

    updateStock(product.id,1);
  };

  const removeItem=(item)=>{

    setCart(cart.filter(c=>c.id!==item.id));

    updateStock(item.id,-item.qty);
  };

  const subtotal = cart.reduce((a,c)=>a+(c.price*c.qty),0);

  const gst = cart.reduce(
    (a,c)=>a+(c.price*c.qty*c.gst/100),
    0
  );

  const cgst = gst/2;
  const sgst = gst/2;

  const grandTotal = subtotal + gst;

  const printBill=()=>{
    window.print();
  };

  return(

<DashboardLayout>

<h1 style={{marginBottom:"25px"}}>POS Billing</h1>

<div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px"}}>

{/* LEFT PANEL (PRODUCTS) */}

<div>

<input
placeholder="Scan barcode or search product..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{marginBottom:"20px"}}
/>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}>

{filteredProducts.map(p=>(
<div
key={p.id}
className="product-card"
onClick={()=>addToBill(p)}
>

<h3>{p.name}</h3>

<p>₹ {p.price}</p>

<p className="status-green">
Stock: {p.stock}
</p>

</div>
))}

</div>

</div>


{/* RIGHT PANEL (CART) */}

<div className="bill-panel">

<h2>Current Bill</h2>

<table>

<thead>
<tr>
<th>Item</th>
<th>Qty</th>
<th>₹</th>
<th></th>
</tr>
</thead>

<tbody>

{cart.map(item=>(
<tr key={item.id}>

<td>{item.name}</td>

<td>{item.qty}</td>

<td>₹ {item.price*item.qty}</td>

<td>
<FaTrash
style={{color:"red",cursor:"pointer"}}
onClick={()=>removeItem(item)}
/>
</td>

</tr>
))}

</tbody>

</table>


<div style={{marginTop:"20px"}}>

<p>Subtotal : ₹ {subtotal.toFixed(2)}</p>

<p>CGST : ₹ {cgst.toFixed(2)}</p>

<p>SGST : ₹ {sgst.toFixed(2)}</p>

<h2>Total : ₹ {grandTotal.toFixed(2)}</h2>

</div>

<button
onClick={printBill}
style={{width:"100%",marginTop:"15px"}}
>
Process Payment & Print
</button>

</div>

</div>

</DashboardLayout>

);

}

export default Billing;