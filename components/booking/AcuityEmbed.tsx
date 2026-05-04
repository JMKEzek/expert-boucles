export interface AcuityEmbedProps {
  ownerID: string;
  className?: string;
}

export function AcuityEmbed({ ownerID, className = '' }: AcuityEmbedProps) {
  return (
    <div className={`acuity-scheduling-embed ${className}`}>
      <script
        src="https://embed.acuityscheduling.com/js/embed.js"
        type="text/javascript"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://embed.acuityscheduling.com/css/embed.css"
      />
      <script type="text/javascript">
        {`
          Acuity.beforeSubmit = function(xhr, data) {
            // Custom hook before form submission
          };
          Acuity.afterSubmit = function(xhr, data) {
            // Custom hook after form submission
          };
        `}
      </script>
      <div
        id="acuity-scheduling-embed"
        data-owner-id={ownerID}
      />
    </div>
  );
}
