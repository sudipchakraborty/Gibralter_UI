import "./StatusPanel.css";

function StatusPanel({ totalCount, runningTime }) {

  return (

    <div className="status-panel">

      <div className="status-box">

        <label>Total Count</label>

        <div className="value-box">
          {totalCount}
        </div>

      </div>

      <div className="inspection-window">
        Inspection Windows
      </div>

      <div className="status-box">

        <label>System Running</label>

        <div className="value-box">
          {runningTime}
        </div>

      </div>

    </div>

  );
}

export default StatusPanel;