// InspectionTable.jsx

import "./InspectionTable.css";

function InspectionTable({ data }) {

  return (

    <table className="inspection-table">

      <thead>

        <tr>
          <th>Row No.</th>
          <th>Date-Time</th>
          <th>Duration</th>
          <th>Product-ID</th>
          <th>Phase-1</th>
          <th>Phase-2</th>
          <th>Phase-3</th>
        </tr>

      </thead>

      <tbody>

        {data.map((row, index) => (

          <tr
            key={`${row.id}-${row.datetime}-${index}`}
          >

            <td>{row.id}</td>
            <td>{row.datetime}</td>
            <td>{row.duration}</td>
            <td>{row.product}</td>
            <td>{row.phase1}</td>
            <td>{row.phase2}</td>
            <td>{row.phase3}</td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default InspectionTable;