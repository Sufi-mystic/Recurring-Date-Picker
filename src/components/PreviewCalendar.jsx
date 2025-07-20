import React from 'react';
import { 
  format, 
  addDays, 
  addWeeks, 
  addMonths, 
  addYears, 
  isSameDay, 
  isSameMonth,
  isBefore,
  endOfMonth,
  startOfMonth,
  nextDay,
  previousDay
} from 'date-fns';

const PreviewCalendar = ({ recurrence }) => {
  // Helper function to get dates for weekly pattern with specific days
  const getWeeklyDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const maxIterations = 1000; // Safety net to prevent infinite loops
    
    // Convert day names to date-fns day numbers (0-Sunday, 6-Saturday)
    const dayNumbers = recurrence.daysOfWeek.map(day => {
      switch(day) {
        case 'sunday': return 0;
        case 'monday': return 1;
        case 'tuesday': return 2;
        case 'wednesday': return 3;
        case 'thursday': return 4;
        case 'friday': return 5;
        case 'saturday': return 6;
        default: return 1; // Default to Monday
      }
    });

    let iteration = 0;
    
    while (currentDate <= endDate && iteration < maxIterations) {
      // Find all selected days in the current week
      for (const dayNum of dayNumbers) {
        let nextDate = nextDay(currentDate, dayNum);
        
        // If we've moved to next week, adjust to stay in current week
        if (!isSameMonth(nextDate, currentDate)){
          nextDate = previousDay(nextDate, dayNum);
        }
        
        if (isBefore(nextDate, currentDate)) {
          nextDate = nextDay(nextDate, dayNum);
        }
        
        if (nextDate <= endDate) {
          dates.push(new Date(nextDate));
        }
      }
      
      // Move to next week
      currentDate = addWeeks(currentDate, recurrence.interval);
      iteration++;
    }
    
    return dates;
  };

  // Helper function for "nth weekday of month" pattern
  const getNthWeekdayOfMonth = (date, monthCounter) => {
    const { weekday, week } = recurrence.monthlyPattern;
    const dayNumber = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    }[weekday];
    
    let monthDate = addMonths(new Date(recurrence.startDate), monthCounter * recurrence.interval);
    monthDate = startOfMonth(monthDate);
    
    // Find first occurrence of the weekday
    let firstWeekday = nextDay(monthDate, dayNumber);
    
    // Calculate nth occurrence
    let nthWeekday;
    switch(week) {
      case 'first':
        nthWeekday = firstWeekday;
        break;
      case 'second':
        nthWeekday = addWeeks(firstWeekday, 1);
        break;
      case 'third':
        nthWeekday = addWeeks(firstWeekday, 2);
        break;
      case 'fourth':
        nthWeekday = addWeeks(firstWeekday, 3);
        break;
      case 'last':
        // Find last occurrence by checking next month's first occurrence
        const nextMonth = addMonths(monthDate, 1);
        const nextMonthFirst = nextDay(nextMonth, dayNumber);
        nthWeekday = addDays(nextMonthFirst, -7);
        break;
      default:
        nthWeekday = firstWeekday;
    }
    
    return nthWeekday;
  };

  // Main date generation function
  const generatePreviewDates = () => {
    const dates = [];
    let currentDate = new Date(recurrence.startDate);
    const endDate = recurrence.endDate || addYears(currentDate, 1);
    const maxDates = 50; // Limit for preview
    
    // Handle different recurrence patterns
    switch (recurrence.frequency) {
      case 'daily':
        while (currentDate <= endDate && dates.length < maxDates) {
          dates.push(new Date(currentDate));
          currentDate = addDays(currentDate, recurrence.interval);
        }
        break;
        
      case 'weekly':
        if (recurrence.daysOfWeek.length > 0) {
          // Use specialized weekly date generator
          const weeklyDates = getWeeklyDates(currentDate, endDate);
          dates.push(...weeklyDates.slice(0, maxDates));
        } else {
          // Simple weekly recurrence
          while (currentDate <= endDate && dates.length < maxDates) {
            dates.push(new Date(currentDate));
            currentDate = addWeeks(currentDate, recurrence.interval);
          }
        }
        break;
        
      case 'monthly':
        if (recurrence.monthlyPattern.type === 'weekday') {
          // "nth weekday of month" pattern
          let monthCounter = 0;
          while (dates.length < maxDates) {
            const nextDate = getNthWeekdayOfMonth(currentDate, monthCounter);
            if (nextDate > endDate) break;
            dates.push(new Date(nextDate));
            monthCounter += recurrence.interval;
          }
        } else {
          // Simple day-of-month pattern
          while (currentDate <= endDate && dates.length < maxDates) {
            dates.push(new Date(currentDate));
            currentDate = addMonths(currentDate, recurrence.interval);
            
            // Handle days that don't exist in next month (e.g., 31st)
            if (currentDate.getDate() !== recurrence.monthlyPattern.day) {
              currentDate = endOfMonth(currentDate);
            }
          }
        }
        break;
        
      case 'yearly':
        while (currentDate <= endDate && dates.length < maxDates) {
          dates.push(new Date(currentDate));
          currentDate = addYears(currentDate, recurrence.interval);
        }
        break;
        
      default:
        // Default to daily
        while (currentDate <= endDate && dates.length < maxDates) {
          dates.push(new Date(currentDate));
          currentDate = addDays(currentDate, recurrence.interval);
        }
    }
    
    return dates.sort((a, b) => a - b);
  };

  const previewDates = generatePreviewDates();

  return (
    <div className="preview-calendar mt-0 bg-warning shadow">
      <h5>Preview</h5>
      <div className="card">
        <div className="card-body">
          <p className="text-muted">Next occurrences:</p>
          <ul className="list-group">
            {previewDates.slice(0, 10).map((date, index) => (
              <li key={index} className="list-group-item">
                <i className='fa fa-thumb-tack me-2 text-secondary'></i>
                {format(date, 'MMMM d, yyyy (EEEE)')}
                {isSameDay(date, new Date()) && (
                  <span className="badge bg-warning ms-2">Today</span>
                )}
              </li>
            ))}
            {previewDates.length > 10 && (
              <li className="list-group-item text-muted">
                + {previewDates.length - 10} more...
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PreviewCalendar;