
function SummaryCard({ vendor, number }) {
    return (
        <>
            <div className="text-[#F7F7F7] bg-[#323643] w-[313px] h-[100px] flex flex-col space-y-5 ">
                <p className="text-lg bg-transparent pl-3 pt-1">{vendor}</p>
                <p className="text-4xl bg-transparent pl-3 pb-1 transition duration-300 ease-in-out hover:text-[#A9C52F] select-none">{number}</p>
            </div>
        </>
    );
}
export default SummaryCard;
