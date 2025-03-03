import PropTypes from "prop-types";

const Buynowbtn = ({ buynow }) => {
    return (
        <div>
            <a href={buynow} className="px-8 py-3 rounded text-black  text-xs  buy-color">
                Buy Now!
            </a>

        </div>
    );
};
Buynowbtn.propTypes = {
    buynow: PropTypes.string.isRequired,
};

export default Buynowbtn;