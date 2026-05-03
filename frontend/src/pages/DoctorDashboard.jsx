// import React from "react";
// import "../styles/DoctorDashboard.css";

// export default function DoctorDashboard() {
//   const doctor = {
//     name: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     email: "sarah.johnson@healthcare.com",
//     phone: "+1 (555) 987-6543",
//     image: "https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc",
//   };

//   const todayAppointments = [
//     { id: 1, patient: "John Doe", time: "10:00 AM", type: "Check-up", status: "confirmed", duration: "30 min" },
//     { id: 2, patient: "Jane Smith", time: "11:00 AM", type: "Follow-up", status: "confirmed", duration: "45 min" },
//     { id: 3, patient: "Robert Johnson", time: "2:00 PM", type: "Consultation", status: "pending", duration: "30 min" },
//     { id: 4, patient: "Maria Garcia", time: "3:30 PM", type: "Urgent Care", status: "confirmed", duration: "60 min" },
//   ];

//   const stats = [
//     { title: "Today's Appointments", value: todayAppointments.length },
//     { title: "Total Patients", value: "2,500+" },
//     { title: "This Month Earnings", value: "$12,450" },
//     { title: "Avg. Consultation", value: "42 min" },
//   ];

//   return (
//     <div className="dashboard">
//       <header className="header">
//         <h1>HealthCare+ Doctor</h1>
//       </header>

//       <section className="welcome">
//         <div>
//           <h2>Welcome back, {doctor.name}!</h2>
//           <p>You have {todayAppointments.length} appointments today</p>
//         </div>
//         <img src={doctor.image} alt={doctor.name} width="80" />
//       </section>

//       <section>
//         {stats.map((stat, index) => (
//           <div key={index}>
//             <h3>{stat.title}</h3>
//             <p>{stat.value}</p>
//           </div>
//         ))}
//       </section>

//       <section>
//         <h2>Today's Appointments</h2>
//         {todayAppointments.map((appt) => (
//           <div key={appt.id}>
//             <h3>{appt.patient}</h3>
//             <p>{appt.time} • {appt.type}</p>
//             <p>Status: {appt.status}</p>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }




import React from "react";
import "../styles/DoctorDashboard.css";

export default function DoctorDashboard() {
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    email: "sarah.johnson@healthcare.com",
    phone: "+1 (555) 987-6543",
    image: "https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc",
  };

  const todayAppointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM", type: "Check-up", status: "confirmed", duration: "30 min" },
    { id: 2, patient: "Jane Smith", time: "11:00 AM", type: "Follow-up", status: "confirmed", duration: "45 min" },
    { id: 3, patient: "Robert Johnson", time: "2:00 PM", type: "Consultation", status: "pending", duration: "30 min" },
    { id: 4, patient: "Maria Garcia", time: "3:30 PM", type: "Urgent Care", status: "confirmed", duration: "60 min" },
  ];

  const stats = [
    { title: "Today's Appointments", value: todayAppointments.length },
    { title: "Total Patients", value: "2,500+" },
    { title: "This Month Earnings", value: "$12,450" },
    { title: "Avg. Consultation", value: "42 min" },
  ];

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="header">
        <h1>💙DocCure</h1>
        <div className="header-icons">
          <span>🔔</span>
          <span>⚙️</span>
          <span>⎋</span>
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="welcome">
        <div>
          <h2>Welcome back, {doctor.name}!</h2>
          <p>You have {todayAppointments.length} appointments today</p>
        </div>
        <img src={doctor.image} alt={doctor.name} />
      </section>

      {/* Stats */}
      <section className="stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h4>{stat.title}</h4>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <div className="main-content">

        {/* Appointments */}
        <div className="appointments">
          <div className="appointments-header">
            <h2>Today's Appointments</h2>
            <span className="badge">
              {todayAppointments.length} appointments
            </span>
          </div>

          {todayAppointments.map((appt) => (
            <div key={appt.id} className="appointment-card">

              <div className="appointment-top">
                <h3>{appt.patient}</h3>
                <span className={`status ${appt.status}`}>
                  {appt.status}
                </span>
              </div>

              <p className="appointment-info">
                ⏰ {appt.time} • {appt.type} • {appt.duration}
              </p>

              <div className="actions">
                <button className="btn confirm">✔ Confirm</button>
                <button className="btn outline">View Details</button>
                <button className="btn cancel">✖ Cancel</button>
              </div>

            </div>
          ))}
        </div>

        {/* Profile */}
        <div className="profile">
          <h3>Your Profile</h3>
          <img src={doctor.image} alt={doctor.name} />
          <h2>{doctor.name}</h2>
          <p className="specialty">{doctor.specialty}</p>
          <p>{doctor.email}</p>
          <p>{doctor.phone}</p>
          <button className="btn outline">Edit Profile</button>
        </div>

      </div>
    </div>
  );
}