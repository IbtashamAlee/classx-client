import React from "react";
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";

export function MarkAttendanceCard (props) {

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  }

  return (
      <div
          className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 flex justify-between item-center">
        <div>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{props.attendance.title}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.attendance.endingTime}>{getDateTime(props.attendance.endingTime)}</time>
            </p>
          </div>
        </div>
        <div className={"flex items-center"}>
          <Button variant={"contained"}>Mark Present</Button>
        </div>
      </div>
  )
}
