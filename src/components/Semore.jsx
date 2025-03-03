import PropTypes from "prop-types";

const Semore = ({ seemore }) => {
    return (
        <a href={seemore} className="px-6 py-2 rounded  text-white text-xs  theme-color">
            See More
        </a>
    );
};

Semore.propTypes = {
    seemore: PropTypes.string.isRequired,  
};


export default Semore;