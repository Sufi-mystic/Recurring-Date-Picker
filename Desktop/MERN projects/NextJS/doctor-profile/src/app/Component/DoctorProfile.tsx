"use client";
import Image from "next/image";
import { useState } from "react";
import { FC } from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { FaUsers, FaStar, FaHeart } from "react-icons/fa";
import { GoGraph } from "react-icons/go";


type DoctorProps = {
  doctor: {
    name: string;
    specialization: string;
    hospital: string;
    patients: string;
    experience: string;
    rating: string;
    about: string;
    degree: string;
    service: string;
    availability: string[];
    image: string;
  };
};

const DoctorProfile: FC<DoctorProps> = ({ doctor }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="max-w-md bg-white m-auto p-4">
        <div className="mb-4 flex">
            <div className="flex-none"> <IoIosArrowBack className="bg-sky-400 w-7 h-7 rounded-full p-1 text-white"/></div>
            <h2 className="text-xl font-semibold text-center flex-auto">{doctor.name}</h2>
            <button className="flex-none" onClick={()=> setLiked(!liked)}> 
              {
                liked ? (
                  <FaHeart className="text-red-500  w-7 h-7 rounded-full bg-white px-1 text-sm"/>
                ) : (
                  <CiHeart className="text-blue-400 w-7 h-7 rounded-full bg-gray-200 p-1 text-2xl"/>
                )
              }
            </button>
        </div>
    <div className="max-w mx-auto bg-white px-4 py-6 border-t-2 border-gray-300 rounded-sm shadow-sm">
      <div className="flex justify-center mb-4">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h2 className="text-xl font-semibold text-center">{doctor.name}</h2>
      <p className="text-sm text-center text-gray-500">{doctor.specialization}</p>
      <p className="text-sm text-center text-gray-500">{doctor.hospital}</p>

      <div className="flex justify-around text-center mt-4 p-1">
        <div>
          <p className="text-lg text-center mx-2 my-1"> <FaUsers className="bg-gray-300 w-7 h-7 text-black rounded-full text-lg p-1"/> </p>
          <p className="font-semibold">{doctor.patients}</p>
          <p className="text-xs text-gray-500">Patients</p>
        </div>
        <div>
          <p className="text-lg text-center mx-4 my-1"> <GoGraph className="bg-gray-300 w-7 h-7 text-black rounded-full text-lg p-1"/> </p>
          <p className="font-semibold">{doctor.experience}</p>
          <p className="text-xs text-gray-500">Years exper.</p>
        </div>
        <div>
          <p className="text-lg text-center mx-2 my-1"> <FaStar className="bg-gray-300 w-7 h-7 text-black rounded-full text-lg p-1"/> </p>
          <p className="font-semibold">{doctor.rating}</p>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>

      <div className="mt-6 p-2 border-t-2 border-gray-300">
        <h3 className="text-md font-semibold mb-2">About Me</h3>
        <p className="text-sm text-gray-700 overflow-hidden text-ellipsis">{doctor.about}</p>
      </div>

      <div className="mt-6 p-2">
        <h3 className="text-md mb-2 pb-2 border-b-2 border-gray-300 font-semibold mb-1">Qualification</h3>
        <div className="flex">
        <h3 className="flex-1"> Degree </h3>
        <p className="text-sm flex-1 text-gray-500 text-right">{doctor.degree}</p>
        </div>
      </div>

      <div className="mt-2 p-2">
        <h3 className="text-md font-semibold mb-2">Service and Specialization</h3>
        <div className="flex">
          <p className="text-md flex-1">Service</p>
          <p className="text-sm flex-1 text-gray-500 text-right">{doctor.service}</p>
        </div>
        <div className="flex">
         <p className="text-md flex-1 text-gray-700">Specialization</p>
         <p className="text-sm flex-1 text-gray-500 text-right">{doctor.specialization}</p>
        </div>
      </div>

      <div className="mt-4 p-2">
        <h3 className="text-md font-semibold mb-2">Consulting Availability</h3>
        <ul className="text-sm text-gray-500">
          {doctor.availability.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 mx-4">
        <button className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Book an Appointment
        </button>
      </div>
    </div>
    </div>
  );
};

export default DoctorProfile;
