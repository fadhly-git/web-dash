import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Card.css'; // Make sure to create a CSS file for the transition styles

const Card = ({ doctors, currentDoctorIndex }) => {
  const [currentDoctor, setCurrentDoctor] = useState(doctors[currentDoctorIndex]);

  useEffect(() => {
    setCurrentDoctor(doctors[currentDoctorIndex]);
  }, [currentDoctorIndex, doctors]);

  return (
    <div className="card-container">
      <TransitionGroup>
        <CSSTransition
          key={currentDoctorIndex}
          timeout={500}
          classNames="fade"
        >
          <div className="doctor-info">
            <div className="w-px bg-blue-500 mx-4"></div>
            <div className="lg:w-2/4 content">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Jadwal Dokter</h3>
              </div>
              <div className="content-center">
                <h4 className="text-2xl font-bold">
                  {currentDoctor.Nama_Dokter}
                </h4>
                <h6 className="text-lg">
                  Spesialis {currentDoctor.Jenis_Spesialis}
                </h6>
                <span className="text-lg">Hari Praktek</span>
                <h6 className="text-lg">{day}</h6>
                <span className="text-lg">Jam Praktek</span>
                <h6>{currentDoctor.jam_praktek}</h6>
                <h6 className={statusClass}>{currentDoctor.status}</h6>
              </div>
            </div>
            <div className="lg:w-1/4 mt-12 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full h-96 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
                <img
                  src="./img/shapes/waves-white.svg"
                  className="absolute top-0 hidden w-1/2 h-full lg:block"
                  alt="waves"
                />
                <div className="relative flex items-center justify-center h-full">
                  <img
                    className="relative z-10 w-full rounded-lg h-full object-cover"
                    src={
                      currentDoctor.Foto_Dokter ||
                      "./img/illustrations/rocket-white.png"
                    }
                    alt="Doctor"
                  />
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Card;