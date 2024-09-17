import * as React from 'react';
import SummaryCard from '@/components/SummaryCard';
import Vendor from '@/components/Vendor';
import '@/index.css';
import notificationIcon from '@/assets/notification.svg';
import Record from './components/Record';
import eyeIcon from '@/assets/eyeIcon.svg';

function App() {
    const [numberOfVendors, setNumberOfVendors] = React.useState(0);
    const [numberOfAlerts, setNumberOfAlerts] = React.useState(0);
    const [alerts, setAlerts] = React.useState([]); // Initialized as an array
    const [selectedVendor, setSelectedVendor] = React.useState('');

    // Function to receive selected vendor from child
    const getSelectedVendor = (vendor) => {
        setSelectedVendor(vendor);
    };

    React.useEffect(() => {
        const fetchSelectedVendorAlerts = async () => {
            if (selectedVendor) { // Ensure a vendor is selected before fetching
                try {
                    // Conver (seletedVendor) to lower case and remove any whitespace to ensure the passed value is clean
                    const response = await fetch(`http://localhost:5000/api/vendors/${selectedVendor.toLowerCase().replace(/\s/g, "")}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const result = await response.json();
                    setAlerts(result.alert); // Set the only alert array form vendor object  
                } catch (error) {
                    console.error(error);
                }
            }
        };
        const fetchNumberOfVendors = async () => {
            try {
                // Conver (seletedVendor) to lower case and remove any whitespace to ensure the passed value is clean
                const response = await fetch(`http://localhost:5000/api/vendors/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setNumberOfVendors(result.length); // Set the only alert array form vendor object  
            } catch (error) {
                console.error(error);
            }
        };
        fetchSelectedVendorAlerts();
        fetchNumberOfVendors(); // Call the function
    }, [selectedVendor]);

    const handleBackButton = () => { setSelectedVendor('') };

    return (
        <>
            <div className='flex flex-col h-screen'>
                <img className='self-end m-5' src={notificationIcon} width={32} height={32} />
                <div className='inline-flex self-center text-3xl mt-20 text-[#323643]'>
                    <p>NotifyNet</p>
                    <img src={eyeIcon} width={28} height={28} />
                </div>

                <section id='summary-number' className='self-center space-y-2 mt-10'>
                    <h3 className='text-xl text-[#323643]/70'>Numbers </h3>
                    <div className='grid grid-cols-3 gap-1'>
                        <SummaryCard vendor='Vendor' number={numberOfVendors} />
                        <SummaryCard vendor='Alerts' number={numberOfAlerts} />
                        <SummaryCard vendor='New Alerts' number={numberOfAlerts} />
                    </div>
                </section>
                {!selectedVendor &&
                    <section id='vendor-list' className='self-center space-y-2 mt-10'>
                        <h3 className='text-xl text-[#323643]/70'>Vendors</h3>
                        <div className='grid grid-cols-3 gap-1'>
                            <Vendor onData={getSelectedVendor} name="Emerson" />
                            <Vendor onData={getSelectedVendor} name="ABB" />
                            <Vendor className='opacity-20' onData={getSelectedVendor} name='Soon' />
                        </div>
                    </section>
                }
                {selectedVendor &&
                    <section id='alerts-list' className='self-center space-y-2 mt-10'>
                        <div className='text-xl text-[#323643]/70 flex flex-row justify-between max-w-[940px]'>
                            <div className='self-center'>[{selectedVendor}] Alert</div>
                            <div className='text-lg self-center pr-1 pl-1 cursor-pointer bg-[#323643] text-[#F7F7F7]' onClick={handleBackButton}>Back</div>
                        </div>
                        <div id='list-header' className='w-[947px] h-[30px] bg-[#323643] grid grid-cols-5 text-[#F7F7F7] divide-x divide-[#F7F7F7]/20 content-center'>
                            <div className='bg-transparent pl-2'>No</div>
                            <div className='bg-transparent pl-2'>Title</div>
                            <div className='bg-transparent pl-2'>Description</div>
                            <div className='bg-transparent pl-2'>Date</div>
                            <div className='bg-transparent pl-2'>Document</div>
                        </div>
                        <div id='list-content' className='space-y-1 max-h-[800px] overflow-auto scroll-smooth scrollbar scrollbar-thumb-[#323643]/50 scrollbar-track-[#F7F7F7]'>
                            {alerts.map((record, index) => (
                                <Record
                                    key={record._id}
                                    no={record.id}
                                    title={record.title}
                                    description={record.description}
                                    date={record.date}
                                    link={record.href}
                                />
                            ))}
                        </div>
                    </section>
                }
                <footer className='text-center invisible'>Design and code by Moayad</footer>
            </div>
        </>
    );
}
export default App;
