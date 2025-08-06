import dayjs from "dayjs";
import { apiConfig } from "../apiConfig.js";
import { createSchedule } from "../../modules/form//create-schedule.js";

export async function fetchSchedule(data) {
  try {
    const response = await fetch(
      `${apiConfig.baseURL}/schedules?date=${data.dateTime}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const schedules = await response.json();

    const dailySchedules = schedules.filter((schedule) =>
      dayjs(schedule.dateTime).isSame(dayjs(data.dateTime), "day")
    );

    document.getElementById("morning").innerHTML = "";
    document.getElementById("afternoon").innerHTML = "";
    document.getElementById("night").innerHTML = "";

    dailySchedules.forEach((schedule) => {
      createSchedule(schedule);
    });

    return dailySchedules;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
  }
}
