'use client';

import { useState, useEffect } from 'react';

const TIMEZONES = [
  { name: 'New York', timezone: 'America/New_York', emoji: '🗽' },
  { name: 'London', timezone: 'Europe/London', emoji: '🇬🇧' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', emoji: '🗻' },
  { name: 'Sydney', timezone: 'Australia/Sydney', emoji: '🦘' },
  { name: 'Istanbul', timezone: 'Europe/Istanbul', emoji: '🇹🇷' },
  { name: 'Dubai', timezone: 'Asia/Dubai', emoji: '🌴' },
  { name: 'Singapore', timezone: 'Asia/Singapore', emoji: '🦁' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', emoji: '🐉' },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', emoji: '🇹🇭' },
  { name: 'Mexico City', timezone: 'America/Mexico_City', emoji: '🌮' },
];

export default function DigitalClock() {
  const [times, setTimes] = useState([]);
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updatedTimes = TIMEZONES.map((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          hour: is24Hour ? '2-digit' : 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: !is24Hour,
        });
        return {
          ...tz,
          time: formatter.format(now),
        };
      });
      setTimes(updatedTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">🌍 World Clock</h1>
          <p className="text-gray-300 text-lg">Real-time clocks from around the world</p>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all border border-white/50"
          >
            {is24Hour ? '24-Hour' : '12-Hour'} Format
          </button>
        </div>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {times.map((item, index) => (
            <ClockCard key={index} item={item} />
          ))}
        </div>

        {/* Info */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          Updates every second • All times shown in local format
        </div>
      </div>
    </div>
  );
}

function ClockCard({ item }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Emoji & City Name */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{item.emoji}</div>
        <h2 className="text-xl font-bold text-white">{item.name}</h2>
        <p className="text-gray-400 text-sm">{item.timezone}</p>
      </div>

      {/* Digital Time Display */}
      <div className="bg-black/40 rounded-xl p-4 text-center border border-white/10">
        <div className="font-mono text-3xl font-bold text-cyan-400 tracking-wider">
          {item.time}
        </div>
      </div>

      {/* Analog Clock */}
      <div className="mt-4 flex justify-center">
        <AnalogClock timezone={item.timezone} />
      </div>
    </div>
  );
}

function AnalogClock({ timezone }) {
  const [rotation, setRotation] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const updateRotation = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const timeObj = {};
      parts.forEach(({ type, value }) => {
        timeObj[type] = parseInt(value);
      });

      const hours = timeObj.hour % 12;
      const minutes = timeObj.minute;
      const seconds = timeObj.second;

      setRotation({
        hour: (hours * 30 + minutes * 0.5) % 360,
        minute: (minutes * 6 + seconds * 0.1) % 360,
        second: (seconds * 6) % 360,
      });
    };

    updateRotation();
    const interval = setInterval(updateRotation, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-white/30 shadow-lg">
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-cyan-400 rounded-full z-30"></div>
      </div>

      {/* Hour hand */}
      <div
        className="absolute w-1 h-5 bg-white/80 left-1/2 top-1/4 origin-bottom -translate-x-1/2 rounded-full"
        style={{ transform: `translateX(-50%) rotateZ(${rotation.hour}deg)` }}
      ></div>

      {/* Minute hand */}
      <div
        className="absolute w-0.5 h-6 bg-white/60 left-1/2 top-1/3 origin-bottom -translate-x-1/2 rounded-full"
        style={{ transform: `translateX(-50%) rotateZ(${rotation.minute}deg)` }}
      ></div>

      {/* Second hand */}
      <div
        className="absolute w-0.5 h-5 bg-cyan-400 left-1/2 top-1/4 origin-bottom -translate-x-1/2 rounded-full"
        style={{ transform: `translateX(-50%) rotateZ(${rotation.second}deg)` }}
      ></div>

      {/* Hour markers */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute w-0.5 h-1.5 bg-white/40 left-1/2 top-1 -translate-x-1/2"
          style={{ transform: `translateX(-50%) rotate(${i * 90}deg)` }}
        ></div>
      ))}
    </div>
  );
}
