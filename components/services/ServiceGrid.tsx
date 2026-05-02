import { ServiceCard, ServiceCardProps } from './ServiceCard';

export interface ServiceGridProps {
  services: ServiceCardProps[];
  columns?: number;
}

export function ServiceGrid({ services, columns = 3 }: ServiceGridProps) {
  return (
    <div
      className={`grid gap-8 w-full`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 1 ? '100%' : columns === 2 ? 'calc(50% - 16px)' : 'calc(33.333% - 21px)'}, 1fr))`,
      }}
    >
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
