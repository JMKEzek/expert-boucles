import { ServiceCard, ServiceCardProps } from './ServiceCard';

export interface ServiceGridProps {
  services: ServiceCardProps[];
  columns?: number;
}

export function ServiceGrid({ services, columns = 3 }: ServiceGridProps) {
  return (
    <div
      className="grid w-full justify-items-center"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '80px 64px',
      }}
    >
      {services.map((service) => (
        <div key={service.id} className="w-[70%]">
          <ServiceCard {...service} />
        </div>
      ))}
    </div>
  );
}
