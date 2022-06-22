import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const UploadButton = ({ addFile, removeFile, loading }) => {
  const beforeUpload = (file) => {
    addFile(file);
    return false;
  };

  const props = {
    onRemove: removeFile,
    multiple: true,
    showUploadList: false,
    beforeUpload,
    accept: "image/*",
  };

  return (
    <Upload {...props}>
      <Button loading={loading} icon={<UploadOutlined />} type="primary" ghost>
        Click to Upload
      </Button>
    </Upload>
  );
};

export default UploadButton;
