import { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import DashboardLayout from "../components/layout/DashboardLayout";

const Inventory = () => {

  const { products, addProduct } = useContext(StoreContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    gst: "",
    stock: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!form.name) return;

    addProduct({
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      gst: Number(form.gst),
      stock: Number(form.stock),
    });

    setForm({
      name: "",
      price: "",
      gst: "",
      stock: "",
    });
  };

  return (
    <DashboardLayout>

      <h2 style={{marginBottom:"25px"}}>Inventory</h2>

      {/* Add Product */}

      <form
        onSubmit={handleSubmit}
        style={{
          display:"grid",
          gridTemplateColumns:"2fr 1fr 1fr 1fr auto",
          gap:"12px",
          marginBottom:"25px"
        }}
      >

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})}
        />

        <input
          placeholder="GST %"
          value={form.gst}
          onChange={(e)=>setForm({...form,gst:e.target.value})}
        />

        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e)=>setForm({...form,stock:e.target.value})}
        />

        <button type="submit">
          Add
        </button>

      </form>


      {/* Product Table */}

      <div
        style={{
          background:"#ffffff",
          padding:"25px",
          borderRadius:"14px",
          border:"1px solid #e5e7eb",
          boxShadow:"0 6px 20px rgba(0,0,0,0.05)"
        }}
      >

        <h3 style={{marginBottom:"15px"}}>
          Product List
        </h3>

        <table style={{width:"100%"}}>

          <thead>
            <tr>
              <th style={th}>Product</th>
              <th style={th}>Price</th>
              <th style={th}>GST %</th>
              <th style={th}>Stock</th>
            </tr>
          </thead>

          <tbody>

            {products.map((p)=>{

              let badgeColor = "#DCFCE7";
              let textColor = "#166534";

              if(p.stock <= 5){
                badgeColor = "#FEE2E2";
                textColor = "#991B1B";
              }
              else if(p.stock <= 20){
                badgeColor = "#FEF3C7";
                textColor = "#92400E";
              }

              return(

                <tr key={p.id} style={row}>

                  <td>{p.name}</td>

                  <td>₹ {p.price}</td>

                  <td>{p.gst}%</td>

                  <td>

                    <span
                      style={{
                        background:badgeColor,
                        color:textColor,
                        padding:"5px 10px",
                        borderRadius:"6px",
                        fontWeight:"600"
                      }}
                    >
                      {p.stock}
                    </span>

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

const th={
  textAlign:"left",
  padding:"12px",
  borderBottom:"1px solid #e5e7eb"
};

const row={
  borderBottom:"1px solid #f2f9f1"
};

export default Inventory;