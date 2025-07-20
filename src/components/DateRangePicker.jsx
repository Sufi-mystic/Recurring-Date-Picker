import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const [endOption, setEndOption] = useState(endDate ? 'date' : 'never');

  const handleStartDateChange = (date) => {
    onChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    onChange(startDate, date);
  };

  const handleEndOptionChange = (option) => {
    setEndOption(option);
    if (option === 'never') {
      onChange(startDate, null);
    }
  };

  return (
    <div className="date-range-picker mb-4 text-start bg-warning p-2 rounded-1 shadow">
      <h5 className='text-center mb-3'> <i className='fa fa-calendar me-2'></i> Date Range</h5>
      
      <div className="form-group">
        <label className='fw-bold me-2'> Start Date </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          className="form-control"
          minDate={new Date()}
        />
      </div>
      
      <div className="form-group text-start mt-2">
        <label className='fw-bold'> End Date </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="endNever"
            checked={endOption === 'never'}
            onChange={() => handleEndOptionChange('never')}
          />
          <label className="form-check-label" htmlFor="endNever">
            Never
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="endDate"
            checked={endOption === 'date'}
            onChange={() => handleEndOptionChange('date')}
          />
          <label className="form-check-label" htmlFor="endDate">
            On date
          </label>
        </div>
        {endOption === 'date' && (
          <div className="mt-2 ml-4">
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              className="form-control"
              minDate={startDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;