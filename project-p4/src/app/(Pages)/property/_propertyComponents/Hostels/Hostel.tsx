interface Property {
  property_logo?: string[];
  property_name?: string;
  property_address?: string;
  property_city?: string;
  property_pincode?: string;
  property_state?: string;
  featured_image?: string;
  property_hostel_type: string[];
  description: string;
}

interface PropertyBannerProps {
  property: Property | null;
}
export default function Hostel({ property }: PropertyBannerProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="subs-title">Hostel</h5>
        <div>
          <ul>
            {property?.property_hostel_type?.map((hostel, index) => (
              <li key={index}>{hostel}</li>
            ))}
          </ul>
          <p
            dangerouslySetInnerHTML={{
              __html: property?.property_hostel_description ?? "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
