import "./DataTable.css";

function DataTable({ title, headers, data }) {
  const getStatusClass = (value) => {
    if (!value) return "";

    const status = value.toString().toLowerCase();

    if (status === "approved") return "status approved";
    if (status === "pending") return "status pending";
    if (status === "rejected") return "status rejected";

    return "";
  };

  return (
    <div className="table-wrapper">

      {title && (
        <div className="table-title">
          <h2>{title}</h2>
        </div>
      )}

      <table>

        <thead>

          <tr>

            <th>S.No</th>

            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={headers.length + 1}
                className="empty"
              >
                No Records Found
              </td>

            </tr>

          ) : (

            data.map((row, index) => (

              <tr key={index}>

                <td>{index + 1}</td>

                {headers.map((header) => (

                  <td key={header}>

                    {header === "Status" ? (

                      <span
                        className={getStatusClass(row[header])}
                      >
                        {row[header]}
                      </span>

                    ) : (
                      row[header]
                    )}

                  </td>

                ))}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default DataTable;