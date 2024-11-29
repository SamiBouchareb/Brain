import React from 'react';
import { X, Clock, Calendar as CalendarIcon } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '02:00 PM', '03:00 PM', '04:00 PM'
];

const exercises = [
  'Pattern Recognition',
  'Number Sequence',
  'Word Association',
  'Memory Matrix',
];

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50">
                <CalendarIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Schedule Training</h2>
                <p className="text-sm text-gray-500 mt-1">Select your preferred time and exercise</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
                  >
                    <Clock className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                    <span className="text-sm text-gray-600 group-hover:text-indigo-600">{time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Exercise</label>
              <div className="space-y-2">
                {exercises.map((exercise) => (
                  <button
                    key={exercise}
                    className="w-full flex items-center px-4 py-3 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-indigo-600">{exercise}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}