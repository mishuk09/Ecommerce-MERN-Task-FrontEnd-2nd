import PropTypes from "prop-types";
import Semore from "./Semore";

const Headline = ({ child, headline, seemore, extra }) => {
    return (
        <div className="max-w-7xl    relative flex justify-between mt-10 mx-2 md:mx-auto">
            <div>
                <div className="flex items-center space-x-2">
                    <div className="theme-color w-4 h-7 rounded"></div>
                    <div className="text-sm font-medium child-color">{child}</div>
                   
                </div>
                <h2 className="text-4xl mt-4 text-center md:text-start md:text-5xl font-bold text-gray-800">
                    {headline}
                </h2>
            </div>
            <div className="flex flex-row items-center justify-end text-center  ">
                <div>
                    {extra}
                </div>
                <div className="mt-0">
                    <Semore seemore={seemore} />
                </div>
            </div>
        </div>
    );
};

Headline.propTypes = {
    child: PropTypes.node.isRequired,
    headline: PropTypes.string.isRequired,
    seemore: PropTypes.string.isRequired,
    extra: PropTypes.any
};

export default Headline;
