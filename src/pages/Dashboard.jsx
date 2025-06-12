import React from "react";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="w-full pt-5 px-4 flex flex-col lg:flex-row gap-6">
        {/* Card 1 */}
        <div className="bg-green-900 w-full lg:w-1/3 h-80 rounded mt-6 relative flex flex-col">
          <div className="absolute bg-green-600 bottom-0 h-28 w-full border-t-cyan-100">
            <p className="flex flex-row gap-3.5 text-2xl md:text-3xl items-end justify-center pt-7 text-white font-bold">
              Manage Payments <SiGooglecampaignmanager360 />
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-neutral-700 w-full lg:w-1/3 h-auto rounded mt-6">
          <h2 className="text-white font-bold text-2xl md:text-3xl pl-3 pt-4">
            Invoice 101
          </h2>

          <div className="grid grid-cols-2 gap-3 mt-6 ml-3 text-white text-sm md:text-base">
            <div>Client</div>
            <div>Aditi</div>

            <div>Invoice Date:</div>
            <div>17/4/2023</div>

            <div>Amount:</div>
            <div>0.00</div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row mt-6 border-t border-white h-auto sm:h-24 items-stretch">
            <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r-2 border-white flex items-center justify-center py-4 sm:py-0">
              <p className="text-white flex items-center gap-2 text-xl md:text-2xl">
                View Invoice <LiaFileInvoiceSolid />
              </p>
            </div>
            <div className="w-full sm:w-1/2 flex items-center justify-center py-4 sm:py-0">
              <p className="text-white flex items-center gap-2 text-xl md:text-2xl">
                Copy Invoice <MdContentCopy />
                <MdOutlineStarPurple500 className="text-yellow-300" />
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-neutral-700 w-full lg:w-1/3 h-80 rounded mt-6 flex flex-col">
          <p className="text-white font-bold text-2xl md:text-3xl pl-4 pt-10">
            Delivery
          </p>
          <p className="text-white text-lg md:text-2xl pl-4 pt-3">
            This invoice has not been sent yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
