import { Outlet } from "react-router-dom";
import Bgm from "../../components/Bgm";

export default function MainLayPage() {
    return (
        <>
            <Outlet />
            <Bgm />
        </>
    );
}
