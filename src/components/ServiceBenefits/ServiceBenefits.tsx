"use client";

import React, { FC } from "react";
import { MessageSquare, Calendar, Zap, Coffee } from "react-feather";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit: FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-5">
      {icon}
      <div>
        <h1 className="text-xl md:text-2xl text-nowrap">{title}</h1>
        <p className="text-gray-400 text-lg md:text-xl">{description}</p>
      </div>
    </div>
  );
};

const ServiceBenefits = () => {
  return (
    <div className="flex justify-center items-center md:px-10 py-5">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
        <Benefit
          icon={<Zap size={40} className="min-w-[40px]" />}
          title="Speed WiFi"
          description="1000 Mbps internet"
        />
        <Benefit
          icon={<Calendar size={40} className="min-w-[40px]" />}
          title="Flexible Plans"
          description="Hourly, daily, weekly, or monthly"
        />
        <Benefit
          icon={<Coffee size={40} className="min-w-[40px]" />}
          title="Amazing Coffee"
          description="Specialty coffee, always fresh."
        />
        <Benefit
          icon={<MessageSquare size={40} className="min-w-[40px]" />}
          title="Share Feedback"
          description="We’d love to hear from you!"
        />
      </div>
    </div>
  );
};

export default ServiceBenefits;
