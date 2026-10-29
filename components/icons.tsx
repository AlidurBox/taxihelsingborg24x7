export function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.97v2.23H7.8v3h2.6V21z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21 7.9a5.4 5.4 0 0 0-1.5-3.4A5.4 5.4 0 0 0 16.1 3C14.8 3 9.2 3 7.9 3a5.4 5.4 0 0 0-3.4 1.5A5.4 5.4 0 0 0 3 7.9C3 9.2 3 14.8 3 16.1a5.4 5.4 0 0 0 1.5 3.4A5.4 5.4 0 0 0 7.9 21c1.3.1 6.9.1 8.2 0a5.4 5.4 0 0 0 3.4-1.5 5.4 5.4 0 0 0 1.5-3.4c.1-1.3.1-6.9 0-8.2zm-2.3 10.3a2.9 2.9 0 0 1-1.6 1.6c-1.1.4-3.8.3-5.1.3s-4 .1-5.1-.3a2.9 2.9 0 0 1-1.6-1.6c-.4-1.1-.3-3.8-.3-5.1s-.1-4 .3-5.1a2.9 2.9 0 0 1 1.6-1.6c1.1-.4 3.8-.3 5.1-.3s4-.1 5.1.3a2.9 2.9 0 0 1 1.6 1.6c.4 1.1.3 3.8.3 5.1s.1 4-.3 5.1z" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.4-.5a2 2 0 0 0 .3-.5.5.5 0 0 0 0-.5c-.1-.1-.7-1.6-.9-2.2s-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2.1-1.4 2.5 2.5 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.6z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm12 8H5v9h14zm-8.5 2.5 1.4 1.4-.01.01L13.6 12.2 15 13.6l-3.1 3.1-2.8-2.8z" />
    </svg>
  );
}

// Linjeikoner för fördelar, tjänster och fordon. Ritas med currentColor.
const LINE_ICONS = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
  luggage: <><rect x="6" y="7" width="12" height="13" rx="2" /><path d="M9 7V4h6v3M10 11v5M14 11v5M8 20v1.5M16 20v1.5" /></>,
  plane: <path d="M12 2.5c.8 0 1.5.7 1.5 1.5v5.5l7.5 4.5v2l-7.5-2.3v4.8l2.3 1.7V22L12 21l-3.8 1v-1.8l2.3-1.7v-4.8L3 16v-2l7.5-4.5V4c0-.8.7-1.5 1.5-1.5z" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  road: <path d="M5 21 9 3M19 21 15 3M12 5v2.5M12 11v2.5M12 17v2.5" />,
  star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.7l-5.4 2.9 1.1-6-4.5-4.2 6.1-.8z" />,
  box: <><path d="M20 7.5 12 3.5l-8 4v9l8 4 8-4z" /><path d="m4 7.5 8 4 8-4M12 11.5v9" /></>,
  wheel: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.2" /><path d="M3.3 10.5c2.8-.8 5.8-.8 8.7 0s5.9.8 8.7 0M10.6 13.8 8 20.6M13.4 13.8l2.6 6.8" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8.5 15l2.5 2.5 4.5-4.5" /></>,
};

export type IconName = keyof typeof LINE_ICONS;

export function Icon({ name, className = 'ico' }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {LINE_ICONS[name]}
    </svg>
  );
}
