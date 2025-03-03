import Headline from "../../components/Headline";
import { Smartphone, Monitor, Watch, Headphones, Camera, Gamepad2 } from 'lucide-react';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

const items = [
    {
        id: 1,
        name: "Phone",
        Icon: Smartphone
    },
    {
        id: 2,
        name: "Computer",
        Icon: Monitor
    },
    {
        id: 3,
        name: "SmartWatch",
        Icon: Watch
    },
    {
        id: 4,
        name: "Camera",
        Icon: Camera
    },
    {
        id: 5,
        name: "Headphone",
        Icon: Headphones
    },
    {
        id: 6,
        name: "Gaming",
        Icon: Gamepad2
    },
];

const Categories = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    return (
        <div className="mt-20">
            <Headline
                headline="Browse By Category"
                child="Categories"
                href="categories"
                seemore="categories"
            />
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-2"
                containerClass="max-w-7xl mt-6 mx-auto px-0"
            >
                {items.map(({ id, name, Icon }) => (
                    <div key={id} className="w-full h-48 flex flex-col items-center justify-center space-y-2 p-4 border border-gray-300 rounded-sm  category-hover transition-shadow">
                        <Icon size={42} className="text-gray-600 cate-icon " />
                        <span className="text-sm font-medium">{name}</span>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Categories;
