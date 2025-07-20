import React from 'react';

const weekOptions = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
  { value: 'last', label: 'Last' }
];

const weekdayOptions = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
];

const MonthlyPatternSelector = ({ pattern, onChange }) => {
  const handleTypeChange = (type) => {
    onChange({
      ...pattern,
      type
    });
  };

  const handleDayChange = (day) => {
    onChange({
      ...pattern,
      day: parseInt(day)
    });
  };

  const handleWeekdayChange = (weekday) => {
    onChange({
      ...pattern,
      weekday
    });
  };

  const handleWeekChange = (week) => {
    onChange({
      ...pattern,
      week
    });
  };

  return (
    <div className="monthly-pattern-selector mb-4">
      <h5> <i className='fa fa-pencil me-2'></i> Monthly Pattern</h5>
      
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="monthlyDay"
            checked={pattern.type === 'day'}
            onChange={() => handleTypeChange('day')}
          />
          <label className="form-check-label" htmlFor="monthlyDay">
            On day
          </label>
        </div>
        {pattern.type === 'day' && (
          <div className="mt-2 ml-4">
            <input
              type="number"
              className="form-control"
              min="1"
              max="31"
              value={pattern.day}
              onChange={(e) => handleDayChange(e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="monthlyWeekday"
            checked={pattern.type === 'weekday'}
            onChange={() => handleTypeChange('weekday')}
          />
          <label className="form-check-label" htmlFor="monthlyWeekday">
            On the
          </label>
        </div>
        {pattern.type === 'weekday' && (
          <div className="mt-2 ml-4 row">
            <div className="col-md-5">
              <select
                className="form-control"
                value={pattern.week}
                onChange={(e) => handleWeekChange(e.target.value)}
              >
                {weekOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-7">
              <select
                className="form-control"
                value={pattern.weekday}
                onChange={(e) => handleWeekdayChange(e.target.value)}
              >
                {weekdayOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyPatternSelector;