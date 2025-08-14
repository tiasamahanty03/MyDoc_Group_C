import React from "react";
import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {

  const {
    dToken,
    appointments,
    getAppointments,
  } = useContext(DoctorContext)

    useEffect(() => {
    if (dToken) {  
      getAppointments();
    }
  }, [dToken]);

  return(
     <div>
   <p>Doctor Appointments</p>
   
    <div></div>



     </div>
  );
};

export default DoctorAppointments;
