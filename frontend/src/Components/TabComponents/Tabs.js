import React, { useState } from 'react';
import StudentTab from "../AllTabs/StudentTab";
import TeacherTab from "../AllTabs/TeacherTab";
import styled from '@emotion/styled';
import { LinearProgress } from '@mui/material';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(false);

  const handleCallBack = (childData) => {
    setLoading(childData);
  }

  const handleTab1 = () => {
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  const ColoredLinearProgress = styled(LinearProgress)(({ theme }) => ({
    backgroundColor: "#a23982",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#03a9f4"
    }
  }));

  return (
    <>
      {loading && <ColoredLinearProgress />}
      <div className="container">
        <h1 className='my-4' style={{ color: "white" }}>School Management System</h1>
        <div className="Tabs">
          <div className='outlet'>
            {activeTab === 'tab1' ? <StudentTab parentCallback={handleCallBack} /> : <TeacherTab parentCallback={handleCallBack} />}
          </div>
        </div>
        <div>
          <ul className="nav">
            <li
              className={activeTab === "tab1" ? "active" : ""}
              onClick={handleTab1}
            >
              <h5 style={{ color: "white" }}>Students</h5>
            </li>
            <li
              className={activeTab === "tab2" ? "active" : ""}
              onClick={handleTab2}
            >
              <h5 style={{ color: "white" }}>Teachers</h5>
            </li>
          </ul></div>
      </div>
    </>
  )
};

export default Tabs;