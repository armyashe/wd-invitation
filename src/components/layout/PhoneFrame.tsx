import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[500px] mx-auto bg-white shadow-2xl relative min-h-screen overflow-x-hidden pb-10">
      {children}
    </div>
  );
};

export default PhoneFrame;

