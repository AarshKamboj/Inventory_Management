import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import DashboardLayout from "../components/layout/DashboardLayout";

const Dashboard = () => {

  const { products } = useContext(StoreContext);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (a,p)=>a+p.stock,
    0
  );

  const inventoryValue = products.reduce(
    (a,p)=>a+p.stock*p.price,
    0
  );

  return(

    <DashboardLayout>

      <h1 style={{marginBottom:"30px"}}>
        BizSaathi Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div style={grid}>

        <div className="card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
            width="50"
          />

          <h2>{totalProducts}</h2>

          <p>Total Products</p>

        </div>

        <div className="card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
            width="50"
          />

          <h2>{totalStock}</h2>

          <p>Total Stock</p>

        </div>

        <div className="card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
            width="50"
          />

          <h2>₹ {inventoryValue}</h2>

          <p>Inventory Value</p>

        </div>

      </div>

      {/* Banner */}

      <div className="card" style={{marginTop:"35px",display:"flex",alignItems:"center",gap:"20px"}}>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
          width="90"
        />

        <div>

          <h2>Welcome to BizSaathi</h2>

          <p>
            Your smart retail partner for managing inventory,
            GST billing, and shop operations.
          </p>

        </div>

      </div>

    </DashboardLayout>

  );

};

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"25px"
};

export default Dashboard;