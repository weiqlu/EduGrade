import React from "react";
import "../styles/ClassList.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";

function ClassList() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [classes, setClasses] = React.useState([]);
  const [filter, setFilter] = React.useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://edugrade.onrender.com/sections")
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          subjectNumber: `${item.subject} ${item.number} ${item.instructor}`,
          subjectNumberWithInstructor: `${item.subject}${item.number}${item.instructor}`,
          yearAndTerm: `${item.year}${item.term}`,
          yearAndTerm2: `${item.year} ${item.term}`,
        }));
        setClasses(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // scale the table to the window size
  React.useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector(".classlist-container");
      const headerHeight =
        document.querySelector(".classlist-header").offsetHeight;
      container.style.height = `calc(100vh - ${headerHeight + 20}px)`;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="classlist-wrapper">
      <div className="classlist-container">
        <div className="classlist-header">
          <h2>Grade Distribution</h2>
          <div className="classlist-keyword">
            <FloatLabel>
              <InputText
                id="input"
                onChange={(event) =>
                  setFilter({
                    global: {
                      value: event.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
              />
              <label htmlFor="input" className="keyword-search-label">
                Keyword Search
              </label>
            </FloatLabel>
          </div>
        </div>
        <DataTable
          value={classes}
          dataKey="id"
          paginator
          rows={50}
          removableSort
          filters={filter}
          globalFilterFields={[
            "subjectNumber",
            "subjectNumberWithInstructor",
            "title",
            "instructor",
            "yearAndTerm",
            "yearAndTerm2",
            "gpa",
            "enrollments",
            "crn",
            "credits",
          ]}
          scrollable
          scrollHeight="flex"
          tableStyle={{ minWidth: "62rem" }}
          emptyMessage={isLoading ? "Loading..." : "No data available"}
        >
          <Column field="year" header="Year" sortable></Column>
          <Column field="term" header="Term" sortable></Column>
          <Column field="subject" header="Subject" sortable></Column>
          <Column field="number" header="Course No." sortable></Column>
          <Column field="title" header="Course Title" sortable></Column>
          <Column field="instructor" header="Instructor" sortable></Column>
          <Column field="gpa" header="GPA" sortable></Column>
          <Column field="enrollments" header="Enrollments" sortable></Column>
          <Column field="crn" header="CRN" sortable></Column>
          <Column field="credits" header="Credits" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default ClassList;
