import { FC, useState } from "react";

type MenuItem = {
    id: string;
    label: string;
};

const ProductFooter: FC = () => {
    const [activeSection, setActiveSection] = useState("description");

    const menuItems: MenuItem[] = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
        { id: "reviews", label: "Reviews" },
        { id: "questions-answers", label: "Questions & Answers" }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case "description":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-light">Product Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            This is a high-quality wireless speaker that delivers exceptional sound quality. 
                            Perfect for both indoor and outdoor use, it features advanced Bluetooth connectivity 
                            and a long-lasting battery life. The speaker is designed with portability in mind, 
                            making it ideal for travel, parties, or everyday listening.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Wireless Bluetooth 5.0 connectivity</li>
                            <li>20-hour battery life</li>
                            <li>Water-resistant design</li>
                            <li>Compact and portable</li>
                            <li>Premium sound quality</li>
                        </ul>
                    </div>
                );
            case "specifications":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-light">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Brand</span>
                                    <span className="text-gray-600">AudioTech</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Model</span>
                                    <span className="text-gray-600">AT-2024</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Connectivity</span>
                                    <span className="text-gray-600">Bluetooth 5.0</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Battery Life</span>
                                    <span className="text-gray-600">20 hours</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Dimensions</span>
                                    <span className="text-gray-600">15 x 8 x 5 cm</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Weight</span>
                                    <span className="text-gray-600">450g</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Water Resistance</span>
                                    <span className="text-gray-600">IPX4</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Warranty</span>
                                    <span className="text-gray-600">2 years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "reviews":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-light">Customer Reviews</h3>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-yellow-400">
                                        ★★★★★
                                    </div>
                                    <span className="font-medium">John D.</span>
                                    <span className="text-sm text-gray-500">2 days ago</span>
                                </div>
                                <p className="text-gray-600">
                                    Excellent sound quality and great battery life. Perfect for outdoor activities!
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-yellow-400">
                                        ★★★★☆
                                    </div>
                                    <span className="font-medium">Sarah M.</span>
                                    <span className="text-sm text-gray-500">1 week ago</span>
                                </div>
                                <p className="text-gray-600">
                                    Good speaker overall, but the volume could be a bit louder for outdoor use.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case "questions-answers":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-light">Questions & Answers</h3>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">Is this speaker waterproof?</h4>
                                <p className="text-gray-600 text-sm">
                                    Yes, this speaker has IPX4 water resistance rating, making it splash-proof and suitable for outdoor use.
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">How long does the battery last?</h4>
                                <p className="text-gray-600 text-sm">
                                    The speaker provides up to 20 hours of continuous playback on a single charge, depending on volume level.
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">What's the Bluetooth range?</h4>
                                <p className="text-gray-600 text-sm">
                                    The Bluetooth range is up to 30 meters (100 feet) in open space without obstacles.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mt-8">
            {/* Mobile and Medium Screens: Vertical Layout */}
            <div className="block lg:hidden">
                <div className="space-y-6">
                    {/* Menu Items */}
                    <div className="bg-background-gray rounded-md p-4">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`text-left px-4 py-3 rounded transition-colors ${
                                        activeSection === item.id
                                            ? "bg-orangeColor text-white"
                                            : "hover:bg-gray-200 text-text-light"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Large Screens: 1/4 to 3/4 Layout */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
                {/* Menu Items - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="bg-background-gray rounded-md p-4 sticky top-4">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`text-left px-4 py-3 rounded transition-colors ${
                                        activeSection === item.id
                                            ? "bg-orangeColor text-white"
                                            : "hover:bg-gray-200 text-text-light"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Content - 3/4 width */}
                <div className="lg:col-span-3">
                    <div className="p-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFooter;