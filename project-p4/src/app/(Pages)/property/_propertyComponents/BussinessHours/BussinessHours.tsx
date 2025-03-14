"use client";
import API from "@/service/API/API";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

interface BusinessHours {
  open: string;
  close: string;
}

interface BusinessHoursData {
  monday?: BusinessHours;
  tuesday?: BusinessHours;
  wednesday?: BusinessHours;
  thursday?: BusinessHours;
  friday?: BusinessHours;
  saturday?: BusinessHours;
  sunday?: BusinessHours;
}

interface Property {
  uniqueId: string;
}

export default function BusinessHours({
  property,
}: {
  property: Property | null;
}) {
  const [bussinessHours, setBussinessHours] = useState<BusinessHoursData>({});

  const getBussinessHours = async () => {
    try {
      const response = await API.get<BusinessHoursData>(
        `/business-hours/${property?.uniqueId}`
      );
      setBussinessHours(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (property) {
      getBussinessHours();
    }
  }, [property]);

  const formatTime = (time: string) => {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr || "00";
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="subs-title">Business Hours</h5>
        {bussinessHours && Object.keys(bussinessHours).length > 0 ? (
          <div className="p-0">
            <Table responsive className="text-center">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Opening Time</th>
                  <th>Closing Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(bussinessHours)
                  .filter(([key]) =>
                    [
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ].includes(key)
                  )
                  .map(([day, time]) => (
                    <tr key={day}>
                      <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                      {time && "open" in time && "close" in time ? (
                        <>
                          <td>{formatTime(time.open)}</td>
                          <td>{formatTime(time.close)}</td>
                        </>
                      ) : (
                        <>
                          <td>Closed</td>
                          <td>Closed</td>
                        </>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No business hours available.</p>
        )}
      </div>
    </div>
  );
}
