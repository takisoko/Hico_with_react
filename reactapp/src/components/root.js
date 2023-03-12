import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>Hico</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form>
                        <button>New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"home"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"counter"}>Counter</Link>
                        </li>
                        <li>
                            <Link to={"fetchdata"}>FetchData</Link>
                        </li>
                        <li>
                            <Link to={"materials"}>Materials</Link>
                        </li>
                        <li>
                            <Link to={"units"}>Units</Link>
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