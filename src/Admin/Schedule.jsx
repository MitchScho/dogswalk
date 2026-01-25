/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useMemo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import './Schedule.scss';

function Schedule({ state }) {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(moment());

  // Get all days in the current month view
  const calendarDays = useMemo(() => {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const startOfCalendar = startOfMonth.clone().startOf('week');
    const endOfCalendar = endOfMonth.clone().endOf('week');

    const days = [];
    const day = startOfCalendar.clone();

    while (day.isSameOrBefore(endOfCalendar, 'day')) {
      days.push(day.clone());
      day.add(1, 'day');
    }

    return days;
  }, [currentMonth]);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, 'month'));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, 'month'));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentMonth(moment());
  };

  // Handle day click
  const handleDayClick = (day) => {
    const dateString = day.format('YYYY-MM-DD');
    navigate(`/admin/schedule/${dateString}`);
  };

  // Check if a day has walks
  const hasWalks = (day) => state.walks.some((walk) => moment(walk.date).isSame(day, 'day'));

  // Get walks for a specific day
  const getWalksForDay = (day) => state.walks.filter((walk) => moment(walk.date).isSame(day, 'day'));

  // Get total number of dogs accepted for a specific day
  const getDogsCountForDay = (day) => {
    const walksForDay = getWalksForDay(day);
    return walksForDay.reduce((total, walk) => total + (walk.dogs ? walk.dogs.length : 0), 0);
  };

  // Check if day is today
  const isToday = (day) => day.isSame(moment(), 'day');

  // Check if day is in current month
  const isCurrentMonth = (day) => day.isSame(currentMonth, 'month');

  return (
    <div className="schedule-container">
      <div className="schedule-top-header">
        <h2 className="schedule-page-title">Schedule</h2>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="schedule-header">
        <button
          type="button"
          className="schedule-nav-button"
          onClick={goToPreviousMonth}
        >
          ← Previous
        </button>
        <h2 className="schedule-month-title">
          {currentMonth.format('MMMM YYYY')}
        </h2>
        <button
          type="button"
          className="schedule-nav-button"
          onClick={goToNextMonth}
        >
          Next →
        </button>
      </div>
      <button
        type="button"
        className="schedule-today-button"
        onClick={goToToday}
      >
        Today
      </button>

      <div className="schedule-calendar">
        <div className="schedule-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="schedule-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="schedule-days">
          {calendarDays.map((day) => {
            const dayHasWalks = hasWalks(day);
            const dogsCount = getDogsCountForDay(day);
            const dayIsToday = isToday(day);
            const dayIsCurrentMonth = isCurrentMonth(day);

            return (
              <button
                key={day.format('YYYY-MM-DD')}
                type="button"
                className={`schedule-day ${
                  !dayIsCurrentMonth ? 'schedule-day--other-month' : ''
                } ${dayIsToday ? 'schedule-day--today' : ''} ${
                  dayHasWalks ? 'schedule-day--has-walks' : ''
                }`}
                onClick={() => handleDayClick(day)}
              >
                <span className="schedule-day-number">{day.format('D')}</span>
                {dayHasWalks && (
                  <span className="schedule-day-walks-count">
                    {dogsCount}
                    {' '}
                    dog
                    {dogsCount !== 1 ? 's' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
