import React, { useState, useEffect } from "react";
import { Card} from "../../../Components/utils/card";
import CustomCalendar from "../../../Components/Calendar/asideCalendar";

export default function Dashboard() {
  const [showDateCard, setShowDateCard] = useState(false);

  useEffect(() => {
    localStorage.setItem("showDateCard", showDateCard);
  }, [showDateCard]);
  return (
    <div className="flex flex-col">
      <Card className="bg-white shadow-lg p-4 overflow-y-auto outline outline-gray-200 outline-1">
      <div className="flex justify-center items-center mb-4 overflow-y-auto">
            <CustomCalendar
              handleDateClick={() => setShowDateCard(true)}

              today={new Date().getDate()}
            />
          </div>
      </Card>

    </div>

  );
}