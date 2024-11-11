'use client';

import React, { useState } from 'react';
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import './calendar.scss';

// Sample events data
const events = [
  { date: new Date(2023, 5, 15), title: 'Team Meeting' },
  { date: new Date(2023, 5, 20), title: 'Project Deadline' },
  { date: new Date(2023, 5, 25), title: 'Birthday Party' },
];

export default function CalandarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth((prevDate) => addMonths(prevDate, 1));
  const prevMonth = () =>
    setCurrentMonth((prevDate) => addMonths(prevDate, -1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="calendar-page">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth} className="nav-button">
            &lt;
          </button>
          <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth} className="nav-button">
            &gt;
          </button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
          {monthDays.map((day) => (
            <div
              key={day.toString()}
              className={`calendar-day ${
                !isSameMonth(day, currentMonth)
                  ? 'other-month'
                  : isSameDay(day, new Date())
                  ? 'today'
                  : ''
              }`}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      </div>
      <div className="events">
        <h3 className="events-header">Upcoming Events</h3>
        <ul className="events-list">
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <span className="event-title">{event.title}</span>
              <span className="event-date">
                {format(event.date, 'MMM d, yyyy')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
