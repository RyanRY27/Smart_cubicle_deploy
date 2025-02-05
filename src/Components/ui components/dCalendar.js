import { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const CalendarComponent = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Remove gridlines from all views */
      .fc-daygrid-day-frame,
      .fc-daygrid-day,
      .fc-timegrid-slot,
      .fc-timegrid-divider,
      .fc-scrollgrid-section,
      .fc-scrollgrid-sync-table,
      .fc-daygrid-body,
      .fc-list-table,
      .fc-daygrid-day-top {
        border: none !important;
      }

      /* Remove borders between time slots in week and day views */
      .fc-timegrid-slot {
        border-bottom: none !important;
      }

      /* Remove borders in the List view */
      .fc-list-day-cushion, .fc-list-table tr {
        border: none !important;
      }

      /* Remove header borders */
      .fc-scrollgrid {
        border: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleDateClick = (arg) => {
    alert(`Date: ${arg.dateStr}`);
  };

  const handleEventDrop = (info) => {
    alert(`Event dropped on: ${info.event.start}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      editable={true}
      height="auto"
      width="100%"
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      views={{
        dayGridMonth: { buttonText: 'Month' },
        timeGridWeek: { buttonText: 'Week', slotMinTime: '07:00:00', slotMaxTime: '20:00:00' },
        timeGridDay: { buttonText: 'Day', slotMinTime: '07:00:00', slotMaxTime: '20:00:00' },
        listWeek: { buttonText: 'List' },
      }}
      dateClick={handleDateClick}
      eventDrop={handleEventDrop}
      events={[
        { title: 'All Day Event', date: new Date().toISOString().split('T')[0] },
        { title: 'Conference', date: '2024-06-10' },
        { title: 'Conference', date: '2025-02-03' },
        { title: 'Birthday Party', date: '2025-02-07' },
        { title: 'Long Event', date: '2025-02-08' },
        { title: 'Repeating Event', date: '2025-02-09' },
        { title: 'Reporting Event', date: '2025-02-10' },
        { title: 'Team Meeting', date: '2024-06-10T11:30:00', end: '2024-06-10T12:00:00' },
        { title: 'Lunch Break', date: '2024-06-10T14:00:00' },
        { title: 'Project Deadline', date: '2024-06-11' },
        { title: 'Weekly Review', date: '2024-06-12T10:00:00', end: '2024-06-12T11:00:00' },
      ]}
    />
  );
};

export default CalendarComponent;
