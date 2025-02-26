const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 200, // Increased width to accommodate the formatted date
      valueFormatter: (params) => {
        if (!params.value) return "No due date"; // Handle null or undefined
        const date = new Date(params.value);
        if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date strings
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
  ];