import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                
                    <h1>Hico</h1>
                <div>
                    <h4> Hico task management</h4>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"home"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"units"}>Units</Link>
                        </li>
                        <li>
                            <Link to={"materials"}>Materials</Link>
                        </li>
                        <li>
                            <Link to={"tasks"}>Tasks</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}