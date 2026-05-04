'use client';

import { useEffect, useRef, useState } from 'react';

export interface AcuityEmbedProps {
  ownerID: string;
  appointmentType?: string;
  className?: string;
}

export function AcuityEmbed({ ownerID, appointmentType, className = '' }: AcuityEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  const src = appointmentType
    ? `https://app.acuityscheduling.com/schedule.php?owner=${ownerID}&appointmentType=${appointmentType}&embed=true`
    : `https://app.acuityscheduling.com/schedule.php?owner=${ownerID}&embed=true`;

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== 'https://app.acuityscheduling.com') return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && typeof data.height === 'number' && data.height > 0) {
          setHeight(data.height);
        }
      } catch {
        // message non parseable, ignorer
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.acuityscheduling.com/js/embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`acuity-scheduling-embed w-full overflow-visible ${className}`}>
      <iframe
        ref={iframeRef}
        src={src}
        title="Réservation en ligne — Expert Boucles"
        width="100%"
        height={height}
        frameBorder={0}
        className="w-full block"
        style={{ height: `${height}px`, minHeight: '800px', overflow: 'hidden' }}
      />
    </div>
  );
}
