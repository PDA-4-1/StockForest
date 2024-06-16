import Field from "../../components/Field";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";

const Market = () => {
    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="flex justify-end mt-[50px]">
                <Profile />
            </div>
            <Field />
        </div>
    );
};
export default Market;
