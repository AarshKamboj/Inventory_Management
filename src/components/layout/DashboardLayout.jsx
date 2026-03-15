import { Link } from "react-router-dom";

const DashboardLayout = ({children})=>{

  return(

    <div style={{display:"flex",height:"100vh"}}>

      {/* Sidebar */}

      <div className="sidebar" style={{padding:"25px"}}>

        <h2 style={{color:"#2563EB"}}>BizSaathi</h2>

        <nav style={{marginTop:"30px",display:"flex",flexDirection:"column",gap:"18px"}}>

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/inventory">Inventory</Link>

          <Link to="/billing">Billing</Link>

        </nav>

      </div>


      {/* Main Content */}

      <div style={{flex:1,padding:"30px"}}>

        {/* Top Bar */}

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          marginBottom:"25px"
        }}>

          <input
            placeholder="Search SKU / Product / Invoice"
            style={{width:"300px"}}
          />

          <div>

            <span style={{marginRight:"15px"}}>🔔</span>

            <span>Admin</span>

          </div>

        </div>

        {children}

      </div>

    </div>

  );

};

export default DashboardLayout;