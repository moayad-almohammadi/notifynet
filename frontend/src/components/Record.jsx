function Record({ no, title, description, date, link }) {
    return (
        <>
            <div className='bg-[#606470] grid grid-cols-5 content-center text-[#F7F7F7] divide-x pt-1 pb-1 divide-[#323643]/50 max-w-[946px] text-sm'>
                <div className="bg-transparent pl-2 text-pretty">{no}</div>
                <div className="bg-transparent pl-2 text-pretty">{title}</div>
                <div className="bg-transparent pl-2 text-pretty">{description}</div>
                <div className="bg-transparent pl-2 text-pretty">{date}</div>
                <a href={link} target="_blank" className="bg-transparent pl-2 text-pretty transition duration-300 ease-in-out hover:text-[#93DEFF]">Download</a>
            </div >
        </>
    );
}
export default Record;
