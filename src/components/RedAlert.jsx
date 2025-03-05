import PropTypes from "prop-types";

const RedAlert = ({ name }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] bg-red-600 text-white font-medium px-4 py-3 rounded-md shadow-lg transition-opacity duration-300">
            {name}
        </div>
    );
};

RedAlert.propTypes = {
    name: PropTypes.node.isRequired,
};

export default RedAlert;
