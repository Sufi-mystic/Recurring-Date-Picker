import React from 'react';

const FrequencySelector = ({ frequency, interval, onFrequencyChange, onIntervalChange }) => {
  return (
    <div className="frequency-selector mb-4 bg-warning p-2 rounded-1 shadow">
      <h5><i className='fa fa-sliders me-2'></i>Recurrence Pattern</h5>
      <div className="form-group">
        <label>Frequency</label>
        <select 
          className="form-control"
          value={frequency}
          onChange={(e) => onFrequencyChange(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      
      <div className="form-group mt-3">
        <label>Repeat every</label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            min="1"
            value={interval}
            onChange={(e) => onIntervalChange(e.target.value)}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              {frequency === 'daily' ? 'day(s)' : 
               frequency === 'weekly' ? 'week(s)' :
               frequency === 'monthly' ? 'month(s)' : 'year(s)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencySelector;