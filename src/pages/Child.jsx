import Allproduct from "./Allproducts/Allproduct";
// import Bestselling from "./Bestseeling/Bestselling";
import Categories from "./Categories/Categories";
import Flashsell from "./Flashsell/Flashsell";
import Home from "./Home";
import Info from "./Info/Info";
import ProductGrid from "./ProductGrid/ProductGrid";
import Subcategory from "./Subcategory/Subcategory";

const Child = () => {
    return (
        <div>
            <Home />
            <Flashsell />
            <Categories />
            {/* <Bestselling /> */}
            <Subcategory />
            {/* <Allproduct /> */}
            <ProductGrid />
            <Info />
        </div>
    );
};

export default Child;