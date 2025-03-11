import React, { useCallback, useEffect, useState } from "react";
import EnquiryTable from "./EnquiryComponents/EnquiryTable";
import ArchiveTable from "./EnquiryComponents/ArchiveTable";
import { API } from "../../../../context/Api";
import { useParams } from "react-router-dom";
import ViewEnquiry from "./EnquiryComponents/ViewEnquiry";
import ArchiveView from "./EnquiryComponents/ArchiveView";
import DataRequest from "../../../../context/DataRequest";

export default function AllEnquiry() {
  const { User } = DataRequest();
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [enquires, setEnquires] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewing, setIsViewing] = useState(null);
  const [isViewingArchive, setIsViewingArchive] = useState(null);

  const getProperty = useCallback(async () => {
    try {
      const response = await API.get(`/property/${objectId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const getEnquiry = useCallback(async () => {
    try {
      setLoading(true);
      if (property) {
        const response = await API.get(
          `/property/enquiry/${property?.uniqueId}`
        );
        setEnquires(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [property]);
  const getArchiveEnquiry = useCallback(async () => {
    try {
      setLoading(true);
      if (property) {
        const response = await API.get(
          `/property/archive/enquiry/${property?.uniqueId}`
        );
        setArchiveData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [property]);

  useEffect(() => {
    getArchiveEnquiry();
    getEnquiry();
  }, [getEnquiry, getArchiveEnquiry]);

  return (
    <div className="tab-pane Enquirytab show">
      {isViewing ? (
        <ViewEnquiry setIsViewing={setIsViewing} isViewing={isViewing} />
      ) : isViewingArchive ? (
        <ArchiveView
          setIsViewing={setIsViewingArchive}
          isViewing={isViewingArchive}
        />
      ) : (
        <>
          <EnquiryTable
            enquires={enquires}
            loading={loading}
            setIsViewing={setIsViewing}
            getEnquiry={getEnquiry}
            getArchiveEnquiry={getArchiveEnquiry}
          />
          {User?.role === "Super Admin" && (
            <ArchiveTable
              archiveData={archiveData}
              loading={loading}
              setIsViewingArchive={setIsViewingArchive}
              getArchiveEnquiry={getArchiveEnquiry}
            />
          )}
        </>
      )}
    </div>
  );
}
