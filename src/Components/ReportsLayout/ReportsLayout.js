import React, { useState, useEffect } from "react";

const ReportsLayout = () => {
    const [reports, setReports] = useState([]);
    const constReportURL = process.env.PUBLIC_URL + "/patient_report.pdf"
    // Sample reports data (this will eventually be fetched or retrieved from localStorage)

    // const sampleReports = [
    //     {
    //         "id": "1",
    //         "doctorName": "Dr. John Doe",
    //         "doctorSpecialty": "Cardiology",
    //         "reportUrl": constReportURL  // Path to the report file
    //     },
    //     {
    //         "id": "2",
    //         "doctorName": "Dr. Jane Smith",
    //         "doctorSpecialty": "Neurology",
    //         "reportUrl": constReportURL // Same report for demo
    //     }
    // ];

    // Fetch the reports when the component mounts
    useEffect(() => {
        // setReports(sampleReports);
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));
        setReports(storedAppointmentData)
    }, []);

    // Function to handle downloading the report
    const handleDownloadReport = (reportUrl) => {
        const link = document.createElement('a');
        link.href = reportUrl;
        link.download = reportUrl.split('/').pop(); // Extract the file name from the URL
        link.click();
    };

    // Function to handle viewing the report (open in a new tab)
    const handleViewReport = (reportUrl) => {
        window.open(reportUrl, '_blank');
    };

    return (
        <div className="main-content">
            <section className="mx-10 px-4">
                <div className="mx-auto">
                    <div data-aos="fade-up" className="flex flex-col space-y-4 flex-report">
                        <span className="text-3xl font-semibold text-center text-gray-700">Reports</span>

                        {/* Table Structure */}
                        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                            <table className="table-auto w-full text-left text-gray-600">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 font-bold">Serial Number</th>
                                        <th className="px-4 py-2 font-bold">Doctor Name</th>
                                        <th className="px-4 py-2 font-bold">Doctor Specialty</th>
                                        <th className="px-4 py-2 font-bold">View Report</th>
                                        <th className="px-4 py-2 font-bold">Download Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports && reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-100">
                                            <td className="px-4 py-2">{report.id}</td>
                                            <td className="px-4 py-2">{report.doctorName}</td>
                                            <td className="px-4 py-2">{report.doctorSpeciality}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleViewReport(constReportURL)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-150 ease-in-out"
                                                >
                                                    View Report
                                                </button>
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleDownloadReport(constReportURL)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-150 ease-in-out"
                                                >
                                                    Download Report
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReportsLayout;
