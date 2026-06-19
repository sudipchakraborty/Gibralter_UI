import "./ActivityLog.css";

function ActivityLog() {

    const rows = [
        {
            camera: "CAM-1",
            result: "PASS",
            serial: "12345",
            time: "10:20:35"
        },
        {
            camera: "CAM-2",
            result: "FAIL",
            serial: "67890",
            time: "10:20:50"
        }
    ];

    return (
        <div className="activity-container">

            <h2>Activity Log</h2>

            <div className="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Camera</th>
                            <th>Serial No</th>
                            <th>Result</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>

                        {rows.map((row, index) => (

                            <tr key={index}>
                                <td>{row.camera}</td>
                                <td>{row.serial}</td>
                                <td>{row.result}</td>
                                <td>{row.time}</td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ActivityLog;
