import Dropzone from "react-dropzone-uploader";

export function DropImg({ imgtype, formik }) {
  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status, allFiles) => {
    if (imgtype === "gallery") {
      const arr = [];
      allFiles.forEach((f) => arr.push(f.file));
      formik.setFieldValue("images", arr);
    }
  };

  // const handleSubmit = (files, allFiles) => {
  //     allFiles.forEach((f) => f.remove());
  // };

  return (
    <Dropzone
      maxFiles={8}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      //  onSubmit={handleSubmit}
      // maxFiles={(imgtype == "logo"
      //     || imgtype == "image"
      //     || imgtype == "images"
      //     || imgtype == "loan_img"
      //     || imgtype == "admission_process_img"
      //     || imgtype == "scholarship_img"
      //     || imgtype == "property_img"
      //     || imgtype == "announcement_img") ? 1 : 20}
    />
  );
}
