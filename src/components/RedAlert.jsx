import PropTypes from "prop-types";

const RedAlert = ({ name }) => {
    return (
        <div className="fixed top-2 right-2 bg-red-600 text-white font-medium px-4 py-3 rounded-md shadow-md transition-opacity duration-300">
            {name}
        </div>
    );
};

RedAlert.propTypes = {
    name: PropTypes.node.isRequired,
};

export default RedAlert;
