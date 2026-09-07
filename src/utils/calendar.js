const TZ_SUFFIX = '+05:30'; // IST — wedding is in Jaipur

function toUtc(dateTimeLocal) {
  return new Date(dateTimeLocal.endsWith('Z') ? dateTimeLocal : `${dateTimeLocal}${TZ_SUFFIX}`);
}

function gcalFormat(date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, '');
}

export function googleCalendarUrl(ev) {
  const start = toUtc(`${ev.date}T${ev.startTime}`);
  const end = start;
  end.setHours(end.getHours() + (ev.durationHours || 4));
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${gcalFormat(start)}/${gcalFormat(end)}`,
    details: ev.details || `Celebrate with Akshay & Kirti — ${ev.title}.`,
    location: ev.location || 'Jaipur, Rajasthan, India',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(ev) {
  const start = toUtc(`${ev.date}T${ev.startTime}`);
  const end = start;
  end.setHours(end.getHours() + (ev.durationHours || 4));
  const stamp = new Date().toISOString().replace(/[-:]|\.\d{3}/g, '');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Akshay & Kirti Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:akshay-kirti-${ev.uid}@wedding`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${gcalFormat(start)}`,
    `DTEND:${gcalFormat(end)}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    `DESCRIPTION:${escapeIcs(ev.details || `Celebrate with Akshay & Kirti — ${ev.title}.`)}`,
    `LOCATION:${escapeIcs(ev.location || 'Jaipur, Rajasthan, India')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

function escapeIcs(text) {
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function downloadIcs(ev) {
  const blob = new Blob([buildIcs(ev)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.uid}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}