import { Outlet } from "react-router-dom";

function DashboardLayout(){
    return (
        <main className="page-shell">
            <div className="dashboard-heading">
                <span className="eyebrow">Author workspace</span>
                <h1>Dashboard</h1>
            </div>
            <div className="dashboard-card"><Outlet /></div>
        </main>
    )
}

export default DashboardLayout;
