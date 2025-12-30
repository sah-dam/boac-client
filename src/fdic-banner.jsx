import fdic from './assets/fdic-insured.svg';

export default function FdicBanner() {
    return (
        <div className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200 py-2 px-4 lg:px-6 text-xs lg:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center">
            <span className="italic">Bank of America deposit products:&nbsp;</span>
            <img src={fdic} alt="FDIC-Insured - Backed by the full faith and credit of the U.S. Government" className="h-4 lg:h-5 object-contain" />
        </div>
        </div>
    )
}