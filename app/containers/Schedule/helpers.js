export function Minutes(dep) {
  const departure = dep;
  const a = departure.split(':'); // split it at the colons
  const minutes = +a[0] * 60 + +a[1];
  return minutes;
}

export function Schedules({ schedules, selectedFormat }) {
  const preparedSchedules = [];

  Object.keys(schedules).forEach(s => {
    const computedRefuelTime =
      Minutes(schedules[s].departure) - schedules[s].groundTime;

    const n = {};
    const t = [];

    Object.keys(selectedFormat).forEach(f => {
      const timeLine = Minutes(selectedFormat[f].time);
      const departure = Minutes(schedules[s].departure);
      const groundTime = schedules[s].groundTime;
      // ### Set refuel time ###

      // 1. Build preparedSchedules first layer
      n.id = schedules[s].id;
      n.key = schedules[s].key;
      n.flightNo = schedules[s].flightNo;
      n.destination = schedules[s].destination;
      n.equipment = schedules[s].equipment;
      n.terminal = schedules[s].terminal;
      n.departure = schedules[s].departure;
      n.groundTime = schedules[s].groundTime;

      // 2. Build preparedSchedules {types} object
      const type = {};
      if (computedRefuelTime <= timeLine && timeLine <= departure && groundTime > 0) {
        type.type = '@pending';
      } else {
        type.type = '@blank';
      }
      type.key = selectedFormat[f].key;
      type.time = selectedFormat[f].time;
      t.push(type);
    });

    n.types = t;

    // 3. Building preparedSchedules object...
    preparedSchedules.push(n);
  });

  return preparedSchedules || [];
}
