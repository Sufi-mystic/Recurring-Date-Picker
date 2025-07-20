// RecurringDatePicker.jsx
import React, { useState } from 'react';
import FrequencySelector from './FrequencySelector';
import DayOfWeekSelector from './DayOfWeekSelector';
import MonthlyPatternSelector from './MonthlyPatternSelector';
import DateRangePicker from './DateRangePicker';
import PreviewCalendar from './PreviewCalendar';
import './RecurringDatePicker.css';

const RecurringDatePicker = () => {
  const [recurrence, setRecurrence] = useState({
    frequency: 'weekly', // daily, weekly, monthly, yearly
    interval: 1, // every X days/weeks/months/years
    daysOfWeek: [], // for weekly
    monthlyPattern: { // for monthly
      type: 'day', // 'day' or 'weekday'
      day: 1, // day of month
      weekday: 'monday', // day of week
      week: 'first' // first, second, third, fourth, last
    },
    startDate: new Date(),
    endDate: null,
    endAfter: null // number of occurrences
  });

  const handleFrequencyChange = (frequency) => {
    setRecurrence(prev => ({
      ...prev,
      frequency,
      // Reset dependent fields when frequency changes
      daysOfWeek: frequency === 'weekly' ? prev.daysOfWeek : [],
      monthlyPattern: frequency === 'monthly' ? prev.monthlyPattern : {
        type: 'day',
        day: 1,
        weekday: 'monday',
        week: 'first'
      }
    }));
  };

  const handleIntervalChange = (interval) => {
    setRecurrence(prev => ({
      ...prev,
      interval: Math.max(1, parseInt(interval) || 1)
    }));
  };

  const handleDaysOfWeekChange = (days) => {
    setRecurrence(prev => ({
      ...prev,
      daysOfWeek: days
    }));
    console.log(days)
  };

  const handleMonthlyPatternChange = (pattern) => {
    setRecurrence(prev => ({
      ...prev,
      monthlyPattern: pattern
    }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setRecurrence(prev => ({
      ...prev,
      startDate,
      endDate
    }));
  };

  return (
    <div className="recurring-date-picker container-fluid">
      <h2 className="mb-4 mt-0"><i className='fa fa-calendar-check fa-md text-white bg-warning p-2 m-2 rounded-circle'></i>Recurring Date Picker</h2>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <FrequencySelector 
            frequency={recurrence.frequency}
            interval={recurrence.interval}
            onFrequencyChange={handleFrequencyChange}
            onIntervalChange={handleIntervalChange}
          />
          
          {recurrence.frequency === 'weekly' && (
            <DayOfWeekSelector 
              selectedDays={recurrence.daysOfWeek}
              onChange={handleDaysOfWeekChange}
            />
          )}
          
          {recurrence.frequency === 'monthly' && (
            <MonthlyPatternSelector 
              pattern={recurrence.monthlyPattern}
              onChange={handleMonthlyPatternChange}
            />
          )}
          
          <DateRangePicker 
            startDate={recurrence.startDate}
            endDate={recurrence.endDate}
            onChange={handleDateRangeChange}
          />
        </div>
        
        <div className="col-md-6">
          <PreviewCalendar 
            recurrence={recurrence}
          />
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;