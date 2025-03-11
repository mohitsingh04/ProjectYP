import Link from "next/link";
import React from "react";

export default function CategorySugesstions({ suggestion }) {
  return (
    <tr>
      <td>
        <div className="d-flex">
          <img
            src={
              suggestion?.property_logo?.[0]
                ? `${process.env.NEXT_PUBLIC_API_URL}${suggestion?.property_logo?.[0]}`
                : "/img/video.jpg"
            }
            width={50}
            style={{
              aspectRatio: "4/4",
              objectFit: "cover",
            }}
            className="rounded"
            alt=""
          />
          <div className="ps-3">
            <Link
              href={`/property/${
                suggestion?.uniqueId
              }/${suggestion?.property_name
                ?.replace(/\s+/g, "-")
                .toLowerCase()}/${suggestion?.property_city
                ?.replace(/\s+/g, "-")
                .toLowerCase()}`}
            >
              {suggestion?.property_name}
            </Link>

            <h6 className="text-muted m-0">
              {suggestion?.property_city} {suggestion?.property_state}
            </h6>
          </div>
        </div>
      </td>
    </tr>
  );
}
