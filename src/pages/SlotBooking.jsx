import React, { useState, useEffect } from 'react';
import { Copy, Calendar, Clock } from 'lucide-react';

const SlotBooking = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slots, setSlots] = useState([
    { id: 1, date: '', fromTime: '', toTime: '', fromPeriod: 'AM', toPeriod: 'AM' },
    { id: 2, date: '', fromTime: '', toTime: '', fromPeriod: 'AM', toPeriod: 'AM' },
    { id: 3, date: '', fromTime: '', toTime: '', fromPeriod: 'AM', toPeriod: 'AM' }
  ]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateSlot = (slotId, field, value) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, [field]: value } : slot
    ));
  };

  const copySlot = (sourceSlotId, targetSlotId) => {
    const sourceSlot = slots.find(slot => slot.id === sourceSlotId);
    if (sourceSlot && sourceSlot.date && sourceSlot.fromTime && sourceSlot.toTime) {
      setSlots(prev => prev.map(slot => 
        slot.id === targetSlotId ? {
          ...slot,
          date: sourceSlot.date,
          fromTime: sourceSlot.fromTime,
          toTime: sourceSlot.toTime,
          fromPeriod: sourceSlot.fromPeriod,
          toPeriod: sourceSlot.toPeriod
        } : slot
      ));
    }
  };

  const clearSlot = (slotId) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId ? {
        ...slot,
        date: '',
        fromTime: '',
        toTime: '',
        fromPeriod: 'AM',
        toPeriod: 'AM'
      } : slot
    ));
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute of ['00', '15', '30', '45']) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
        times.push(timeStr);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth > 480 && windowWidth <= 768;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: isMobile ? '16px' : '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: isMobile ? '16px' : isTablet ? '20px' : '24px'
      }}>
        <h2 style={{
          color: '#1e293b',
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: '600',
          marginBottom: isMobile ? '16px' : '24px',
          textAlign: 'center'
        }}>
          Student Availability Booking
        </h2>

        {slots.map((slot, index) => (
          <div key={slot.id} style={{
            backgroundColor: '#f1f5f9',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            padding: isMobile ? '12px' : '20px',
            marginBottom: '16px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: isTablet ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              flexDirection: isTablet ? 'column' : 'row',
              gap: isTablet ? '12px' : '0'
            }}>
              <h3 style={{
                color: '#334155',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '500',
                margin: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Calendar size={20} />
                Slot {slot.id}
              </h3>

              <div style={{ 
                display: 'flex', 
                gap: '8px',
                flexWrap: 'wrap',
                width: isTablet ? '100%' : 'auto'
              }}>
                {index > 0 && (
                  <select 
                    onChange={(e) => e.target.value && copySlot(parseInt(e.target.value), slot.id)}
                    value=""
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: 'white',
                      fontSize: isMobile ? '12px' : '14px',
                      cursor: 'pointer',
                      minWidth: '120px'
                    }}
                  >
                    <option value="">Copy from...</option>
                    {slots.filter(s => s.id < slot.id && s.date).map(s => (
                      <option key={s.id} value={s.id}>
                        Slot {s.id} ({s.date})
                      </option>
                    ))}
                  </select>
                )}
                
                <button
                  onClick={() => clearSlot(slot.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                color: '#475569',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}>
                Select Date
              </label>
              <input
                type="date"
                value={slot.date}
                onChange={(e) => updateSlot(slot.id, 'date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: isMobile ? '8px' : '10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: isMobile ? '14px' : '16px'
                }}
              />
            </div>

            {/* Time Selection */}
            {isMobile ? (
              // Mobile Layout - Stacked
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px'
                  }}>
                    From Time
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={slot.fromTime}
                      onChange={(e) => updateSlot(slot.id, 'fromTime', e.target.value)}
                      style={{
                        flex: '1',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Select time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select
                      value={slot.fromPeriod}
                      onChange={(e) => updateSlot(slot.id, 'fromPeriod', e.target.value)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        width: '60px'
                      }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px'
                  }}>
                    To Time
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={slot.toTime}
                      onChange={(e) => updateSlot(slot.id, 'toTime', e.target.value)}
                      style={{
                        flex: '1',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Select time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select
                      value={slot.toPeriod}
                      onChange={(e) => updateSlot(slot.id, 'toPeriod', e.target.value)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        width: '60px'
                      }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : isTablet ? (
              // Tablet Layout
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px'
                  }}>
                    From Time
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={slot.fromTime}
                      onChange={(e) => updateSlot(slot.id, 'fromTime', e.target.value)}
                      style={{
                        flex: '1',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '16px'
                      }}
                    >
                      <option value="">Select time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select
                      value={slot.fromPeriod}
                      onChange={(e) => updateSlot(slot.id, 'fromPeriod', e.target.value)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '16px',
                        width: '70px'
                      }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px'
                  }}>
                    To Time
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={slot.toTime}
                      onChange={(e) => updateSlot(slot.id, 'toTime', e.target.value)}
                      style={{
                        flex: '1',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '16px'
                      }}
                    >
                      <option value="">Select time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select
                      value={slot.toPeriod}
                      onChange={(e) => updateSlot(slot.id, 'toPeriod', e.target.value)}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '16px',
                        width: '70px'
                      }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop Layout
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr auto',
                gap: '12px',
                alignItems: 'end'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px'
                  }}>
                    From Time
                  </label>
                  <select
                    value={slot.fromTime}
                    onChange={(e) => updateSlot(slot.id, 'fromTime', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={slot.fromPeriod}
                    onChange={(e) => updateSlot(slot.id, 'fromPeriod', e.target.value)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '16px',
                      width: '70px'
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '6px'
                  }}>
                    To Time
                  </label>
                  <select
                    value={slot.toTime}
                    onChange={(e) => updateSlot(slot.id, 'toTime', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={slot.toPeriod}
                    onChange={(e) => updateSlot(slot.id, 'toPeriod', e.target.value)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '16px',
                      width: '70px'
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            )}

            {/* Display Selected Time */}
            {slot.date && slot.fromTime && slot.toTime && (
              <div style={{
                marginTop: '12px',
                padding: isMobile ? '10px' : '12px',
                backgroundColor: '#dbeafe',
                borderRadius: '6px',
                border: '1px solid #93c5fd'
              }}>
                <div style={{
                  color: '#1e40af',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock size={16} />
                  {new Date(slot.date).toLocaleDateString('en-US', { 
                    weekday: isMobile ? 'short' : 'long', 
                    year: 'numeric', 
                    month: isMobile ? 'short' : 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div style={{
                  color: '#1e40af',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  marginTop: '4px'
                }}>
                  {slot.fromTime} {slot.fromPeriod} - {slot.toTime} {slot.toPeriod}
                </div>
              </div>
            )}
          </div>
        ))}

        <div style={{
          marginTop: '24px',
          padding: isMobile ? '12px' : '16px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #0ea5e9'
        }}>
          <h4 style={{
            color: '#0c4a6e',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            margin: '0 0 8px 0'
          }}>
            Booking Summary
          </h4>
          {slots.filter(slot => slot.date && slot.fromTime && slot.toTime).length === 0 ? (
            <p style={{ 
              color: '#64748b', 
              margin: '0', 
              fontSize: isMobile ? '12px' : '14px' 
            }}>
              No time slots selected yet
            </p>
          ) : (
            <div style={{ 
              fontSize: isMobile ? '12px' : '14px', 
              color: '#0c4a6e' 
            }}>
              {slots.filter(slot => slot.date && slot.fromTime && slot.toTime).map(slot => (
                <div key={slot.id} style={{ marginBottom: '4px' }}>
                  <strong>Slot {slot.id}:</strong> {new Date(slot.date).toLocaleDateString()} 
                  {' '}({slot.fromTime} {slot.fromPeriod} - {slot.toTime} {slot.toPeriod})
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          style={{
            width: '100%',
            padding: isMobile ? '12px' : '14px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
        >
          Book Selected Time Slots
        </button>
      </div>
    </div>
  );
};

export default SlotBooking;