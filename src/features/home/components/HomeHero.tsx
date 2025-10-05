import { FC } from "react";
import HomeSlider from "./HomeSlider";

const HomeHero: FC = () => {
    return (
        <div className="w-full bg-[url('/images/slider-background.jpg')] bg-no-repeat bg-center bg-cover py-10">
            <div className="containerr flex flex-col lg:flex-row gap-4 lg:max-h-[500px] overflow-hidden">
                <div className="w-2/3 overflow-hidden">
                    <HomeSlider />
                </div>
                <div className="w-1/3 overflow-hidden rounded-md">
                    <img 
                        src="/images/600x600.jpg"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeHero;