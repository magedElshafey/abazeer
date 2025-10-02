import { FC } from "react";

const ProductFeatures: FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-background-gray rounded-md flex flex-col px-4 gap-4">
                <div className="flex items-center gap-4 border-b py-4">
                    <div className="h-10 w-10 overflow-hidden">
                        <img
                            className="h-full w-full object-center object-contain aspect-square"
                            src="/images/feat-01.png"
                        />
                    </div>
                    <div>
                        <p className="text-xl text-text-light">
                            Free Shipping

                        </p>
                        <p>
                            For all orders over $200

                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 border-b py-4">
                    <div className="h-10 w-10 overflow-hidden">
                        <img
                            className="h-full w-full object-center object-contain aspect-square"
                            src="/images/feat-02.png"
                        />
                    </div>
                    <div>
                        <p className="text-xl text-text-light">
                            1 & 1 Returns

                        </p>
                        <p>
                            Cancellation after 1 day

                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 py-4">
                    <div className="h-10 w-10 overflow-hidden">
                        <img
                            className="h-full w-full object-center object-contain aspect-square"
                            src="/images/feat-03.png"
                        />
                    </div>
                    <div>
                        <p className="text-xl text-text-light">
                            Secure Payment

                        </p>
                        <p>
                            Guarantee secure payments

                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-background-gray rounded-md flex flex-col gap-2 p-4">
                <p className="text-lg">
                    Hotline Order:
                </p>
                <p className="text-sm">
                    Mon - Fri: 07AM - 06PM
                </p>
                <p className="text-xl font-bold">
                    (+965) 7492-4277
                </p>
            </div>
        </div>
    )
}

export default ProductFeatures;