"use client";

import { Activity } from "@/.contentlayer/generated";
import { CalendarDemo } from "./calendar";
import { ActivityCard } from "./card";
import { AgeSelector, GroupSelector, TypeSelector } from "./selector";
import { useState } from "react";

export default function ActivitiesView({
  activities,
}: {
  activities: Activity[];
}) {
  const [date, setDate] = useState<Date[] | undefined>(undefined);

  return (
    <>
      <div className="flex gap-4 containe flex-col sm:flex-row ">
        <GroupSelector />
        <TypeSelector />
        <AgeSelector />
      </div>

      <div className="flex sm:flex-row flex-col items-start">
        <div className="flex-none mr-2 mb-4">
          <CalendarDemo
            dateList={activities.map((a) => a.date.split("T")[0])}
            date={date}
            setDate={setDate}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {activities
            .filter((activity) => {
              if (!date || date.length === 0) return true;
              return (
                // activity.date.split("T")[0] === date.toISOString().split("T")[0]
                date.some(
                  (d) =>
                    activity.date.split("T")[0] ===
                    d.toISOString().split("T")[0]
                )
              );
            })
            .map((activity, i) => (
              <ActivityCard activity={activity} key={i} />
            ))}
        </div>
      </div>
    </>
  );
}
