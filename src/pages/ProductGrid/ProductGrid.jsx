
// const ProductGrid = () => {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
//             {/* PlayStation 5 */}
//             <div className="relative group overflow-hidden rounded-2xl">
//                 <img src="/images/ps5.jpg" alt="PlayStation 5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//                 <div className="absolute bottom-4 left-4 text-white">
//                     <h2 className="text-xl font-semibold">PlayStation 5</h2>
//                     <p className="text-sm mb-2">Black and White version of the PS5 coming out on sale.</p>
//                     <a href="#" className="text-sm font-medium underline">Shop Now</a>
//                 </div>
//             </div>

//             {/* Women's Collections */}
//             <div className="relative group overflow-hidden rounded-2xl">
//                 <img src="/images/womens-collection.jpg" alt="Women's Collections" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//                 <div className="absolute bottom-4 left-4 text-white">
//                     <h2 className="text-xl font-semibold">Women's Collections</h2>
//                     <p className="text-sm mb-2">Featured woman collections that give you another vibe.</p>
//                     <a href="#" className="text-sm font-medium underline">Shop Now</a>
//                 </div>
//             </div>

//             {/* Speakers */}
//             <div className="relative group overflow-hidden rounded-2xl">
//                 <img src="/images/speakers.jpg" alt="Speakers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//                 <div className="absolute bottom-4 left-4 text-white">
//                     <h2 className="text-xl font-semibold">Speakers</h2>
//                     <p className="text-sm mb-2">Amazon wireless speakers</p>
//                     <a href="#" className="text-sm font-medium underline">Shop Now</a>
//                 </div>
//             </div>

//             {/* Perfume */}
//             <div className="relative group overflow-hidden rounded-2xl">
//                 <img src="/images/perfume.jpg" alt="Perfume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//                 <div className="absolute bottom-4 left-4 text-white">
//                     <h2 className="text-xl font-semibold">Perfume</h2>
//                     <p className="text-sm mb-2">GUCCI INTENSE OUD EDP</p>
//                     <a href="#" className="text-sm font-medium underline">Shop Now</a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductGrid;
import mencloth from '../../assets/grid-view/mencloth.png';
import mobile from '../../assets/grid-view/mobile.png';
import perfium from '../../assets/grid-view/perfium.png';
import wathch from '../../assets/grid-view/watch.png';
import Headline from '../../components/Headline';

export default function ProductGrid() {
    return (
        <div className=" mt-20   ">
            <Headline
                headline="New Arrival"
                child="Feature"
                href="newarrival"
                seemore="newarrival"
            />

            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-2">

                <div className=" grid gap-4 mt-6 lg:grid-cols-2">
                    {/* First div: 50% width, 1 col, 2 rows */}
                    <div className="relative group col-span-1 bg-black row-span-2 rounded overflow-hidden  shadow-lg hover:shadow-2xl transition-shadow duration-300h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80  "></div>
                        <img src={mobile} alt="Mobile friendly" className="w-full h-full object-cover object-top scale-100   transition-transform duration-300" />
                        <div className="absolute bottom-0 p-6 text-white     w-full">
                            <h3 className="text-xl font-bold mb-1">iPhone 12 Pro Max</h3>
                            <p className="text-sm mb-4 leading-relaxed text-gray-300">Brand New US varient available with 12gb</p>
                            <a href="" className='mt- border-b-2 border-red-600'>Shop Now</a>
                        </div>
                    </div>


                    {/* Second div: 50% width, 2 col, 1 row */}
                    <div className="relative group col-span-1 rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300  ">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img src={mencloth} alt="Performance" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 p-6 text-white     w-full">
                            <h3 className="text-xl font-bold mb-1">iPhone 12 Pro Max</h3>
                            <p className="text-sm mb-4 leading-relaxed text-gray-300">Brand New US varient available with 12gb</p>
                            <a href="" className='mt- border-b-2 border-red-600'>Shop Now</a>
                        </div>
                    </div>


                    {/* Third and fourth divs: Each takes 50% width, 1 row */}
                    <div className="grid grid-cols-2 gap-6 col-span-1">
                        {[
                            { title: "Perfium", description: "Internation and domestic product.", image: perfium },
                            { title: "Watch", description: "Brand new rolex and others", image: wathch }
                        ].map((item, index) => (
                            <div key={index} className="relative group rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 p-6 text-white">
                                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm leading-relaxed">{item.description}</p>
                                    <a href="" className='mt- border-b-2 border-red-600'>Shop Now</a>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

