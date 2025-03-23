import { X } from "lucide-react";
import PropTypes from "prop-types";

const RedAlert = ({ name }) => {
    return (
        <div className="fixed top-2 right-2 z-30 px-4 py-2">


            <div className="bg-red-100 relative border border-red-500 flex items-center justify-center px-4 h-12 text-red-700 rounded font-bold">
                <div className=" absolute left-0 top-0 border border-red-500 rounded-l px-2 w-2 h-full border-r-2 bg-red-500">

                </div>
                <div className="px-4 py-2">
                    <X size={20} className="text-white bg-red-500 rounded-full p-1" />
                </div>
                {name}
            </div>
        </div>
    );
};

RedAlert.propTypes = {
    name: PropTypes.node.isRequired,
};

export default RedAlert;
