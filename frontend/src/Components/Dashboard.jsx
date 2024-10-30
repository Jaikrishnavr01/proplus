import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [progress, setProgress] = useState(1); // Track progress through the steps

  // Function to get step styles based on progress
  const getStepStyle = (step) => ({
    color: progress >= step ? "#6c5ce7" : undefined,
  });

  // Function to render the current section based on progress
  const renderCurrentSection = () => {
    switch (progress) {
      case 1:
        return renderCourseInfo();
      case 2:
        return renderCourseDetails();
      case 3:
        return renderPricing();
      case 4:
        return renderPublish();
      default:
        return null;
    }
  };

  // Render Course Info Section
  const renderCourseInfo = () => (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="content-wrapper">
          <div className="course-info-form">
            <div className="form-section">
              <label>Title</label>
              <input type="text" placeholder="e.g. Introduction to Data Analysis" />
            </div>
            <div className="form-row">
              <div className="form-section">
                <label>Category</label>
                <select>
                  <option>Data Management</option>
                </select>
              </div>
              <div className="form-section">
                <label>Level</label>
                <select>
                  <option>Basic</option>
                </select>
              </div>
            </div>
            <div className="form-section">
              <label>Description</label>
              <textarea placeholder="Course description" maxLength="2000"></textarea>
            </div>
            <div className="form-section">
              <label>Frequently Asked Questions</label>
              <input type="text" placeholder="e.g. Do you offer 1 on 1 calls" />
              <input type="text" placeholder="e.g. Yes at a fixed cost per call" />
            </div>
            <div className="buttons">
              <button className="draft-btn">Save As Draft</button>
              <button className="save-continue-btn" onClick={() => setProgress(2)}>Save & Continue</button>
            </div>
          </div>
          <UploadMaterials />
        </div>
      </main>
    </div>
  );

  // Upload Materials Section
  const UploadMaterials = () => (
    <div className="uploads">
      <h3>Upload Course Materials</h3>
      <UploadBox label="Cover Image" acceptedFormats="JPG, PNG" maxSize="2 MB" />
      <UploadBox label="Sales Video" acceptedFormats="MP4, AVI" maxSize="50 MB" />
    </div>
  );

  // Upload Box Component
  const UploadBox = ({ label, acceptedFormats, maxSize }) => (
    <div className="upload-box">
      <label>{label}</label>
      <button>Upload</button>
      <div className="dummy-info">
        <p>Accepted formats: {acceptedFormats}</p>
        <p>Max size: {maxSize}</p>
      </div>
    </div>
  );

  // Render Course Details Section
  const renderCourseDetails = () => (
    <div className="uploads">
      <h3>Course Details</h3>
      <div className="form-section">
        <label>Title</label>
        <input type="text" placeholder="Enter course title" />
      </div>
      <div className="form-section">
        <label>Character</label>
        <input type="text" placeholder="Enter character name" />
      </div>
      <div className="form-section">
        <label>Module</label>
        <input type="text" placeholder="Enter module name" />
      </div>
      <button onClick={() => setProgress(1)}>Back</button>
      <button onClick={() => setProgress(3)}>Save & Continue</button>
    </div>
  );

  // Render Pricing Section
  const renderPricing = () => (
    <div className="pricing-section">
      <h3>Pricing</h3>
      <div className="form-section">
        <label>Price</label>
        <input type="number" placeholder="e.g. 49.99" />
      </div>
      <div className="form-section">
        <label>Discount</label>
        <input type="number" placeholder="e.g. 10" />
        <span>% off</span>
      </div>
      <button onClick={() => setProgress(2)}>Back</button>
      <button onClick={() => setProgress(4)}>Save & Continue</button>
    </div>
  );

  // Render Publish Section
  const renderPublish = () => (
    <div className="publish-section">
      <h3>Publish</h3>
      <p>All your information is ready to be published!</p>
      <button onClick={() => setProgress(3)}>Back</button>
      <button onClick={() => alert("Course published!")}>Publish Course</button>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo">LOGO</div>
          <nav>
            <ul>
              <li>Home</li>
              <li>My Courses</li>
              <li>Settings</li>
              <li>Profile</li>
            </ul>
          </nav>
        </div>
        <div className="help-signout">
          <button>Help</button>
          <button>Sign out</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>
            <span className="title-txt">My Courses</span> / Create new course
          </h2>
          <div className="header-icons">
            <span className="icon">🔔</span>
            <span className="icon">💬</span>
            <span className="icon">🌙</span>
            <div className="profile">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="Profile"
                className="profile-pic"
              />
              <span className="profile-name">Alexander O</span>
            </div>
          </div>
        </header>

        <div className="steps">
          <span style={getStepStyle(1)}>1 Course Information & FAQ</span>
          <span style={getStepStyle(2)}>2 Course Details</span>
          <span style={getStepStyle(3)}>3 Pricing</span>
          <span style={getStepStyle(4)}>4 Publish</span>
        </div>

        <div className="content-wrapper">{renderCurrentSection()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
