import PropTypes from "prop-types";

const Alert = ({ name }) => {
    return (
        <div className="fixed top-2 right-2  bg-green-600 rounded text-white font-medium    px-4 py-3">

            {name}
        </div>
    );
};

Alert.propTypes = {
    name: PropTypes.node.isRequired,
};
export default Alert;