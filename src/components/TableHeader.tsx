const TableHeader = ({ tableHeaders }) => {
	return (
		<thead className="bg-gray-50">
		<tr>
		  {tableHeaders.map((tableHeader, tableHeaderIdx) => (
			<th
			  key={tableHeaderIdx}
			  scope="col"
			  className={tableHeader.classes}
			>
			  {tableHeader.header}
			</th>
		  ))}
		</tr>
	  </thead>
	);
  };

  export default TableHeader;
