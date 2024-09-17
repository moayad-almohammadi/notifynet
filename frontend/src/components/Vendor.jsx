function Vendor({ name, onData, className }) {
    // Set the vendor name and pass it to the parent on click
    const handleVendorName = () => {
        sendVendorNameToParent(name); // Send the vendor name to the parent
    };

    // Function to send data to parent
    const sendVendorNameToParent = (name) => {
        onData(name); // Call the parent's function with the vendor name
    };

    return (
        <>
            <div
                className="bg-[#606470] w-[313px] h-[100px] text-[#F7F7F7] text-lg flex flex-col justify-center transition duration-300 ease-in-out hover:bg-[#606470]/95 hover:text-[#93DEFF] cursor-pointer"
                onClick={handleVendorName} // Use handleVendorName without invoking it immediately
            >
                <p className={`bg-transparent self-center ${className}`}>{name}</p>
            </div>
        </>
    );
}
export default Vendor;
