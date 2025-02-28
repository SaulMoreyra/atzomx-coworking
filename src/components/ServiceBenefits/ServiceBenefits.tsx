"use client";

import React from "react";
import { MessageSquare, Calendar, Zap, Coffee } from "react-feather";

const ServiceBenefits = () => {
  return (
    <div className="flex justify-center items-center md:px-10 py-5">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
        <div className="flex gap-5">
          <Zap size={40} className="min-w-[40px]" />
          <div>
            <h1 className="text-2xl text-nowrap">Speed WiFi</h1>
            <p className="text-gray-400 text-xl">1000 Mbps internet</p>
          </div>
        </div>
        <div className="flex gap-5">
          <Calendar size={40} className="min-w-[40px]" />
          <div>
            <h1 className="text-2xl text-nowrap">Flexible Plans</h1>
            <p className="text-gray-400 text-xl">
              Hourly, daily, weekly, or monthly
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <Coffee size={40} className="min-w-[40px]" />
          <div>
            <h1 className="text-2xl text-nowrap">Amazing Coffee</h1>
            <p className="text-gray-400 text-xl">
              Specialty coffee, always fresh.
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <MessageSquare size={40} className="min-w-[40px]" />
          <div>
            <h1 className="text-2xl">Share Feedback</h1>
            <p className="text-gray-400 text-xl">We’d love to hear from you!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBenefits;
