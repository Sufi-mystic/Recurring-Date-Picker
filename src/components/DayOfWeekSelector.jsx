import React from 'react';

const days = [
  { value: 'sunday', label: 'Sun' },
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' }
];

const DayOfWeekSelector = ({ selectedDays, onChange }) => {
  const toggleDay = (day) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    onChange(newDays);
  };

  return (
    <div className="day-of-week-selector mb-4 ms-2">
      <h5> <i className='fa fa-repeat me-2'></i> Repeat on</h5>
      <div className="btn-group-toggle d-flex flex-wrap row">
        {days.map(day => (
          <button
            key={day.value}
            type="button"
            className={`btn ${selectedDays.includes(day.value) ? 'btn-warning' : 'btn-outline-warning'} col-md-4 shadow-sm`}
            onClick={() => toggleDay(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DayOfWeekSelector;