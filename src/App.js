import "./App.css";
import { useRef } from "react";
import useFileSelection from "./hooks/useFileSelection";
import UploadButton from "./components/UploadButton";
import { Button, Row, Col } from "antd";
import Pdf from "react-to-pdf";

const App = () => {
  const [addFile, removeFile, base64Strings, isLoading] = useFileSelection();
  const ref = useRef();

  return (
    <div style={{ margin: "2%" }}>
      <Row justify="center" style={{ marginBottom: "10px" }}>
        <Col span={6}>
          <UploadButton
            addFile={addFile}
            removeFile={removeFile}
            loading={isLoading}
          />
        </Col>
        <Col span={6}>
          {base64Strings.length >= 1 && (
            <Pdf
              targetRef={ref}
              filename="images.pdf"
              options={{ orientation: "landscape" }}
              scale={0.9}
            >
              {({ toPdf }) => (
                <Button danger onClick={toPdf}>
                  Generate Pdf
                </Button>
              )}
            </Pdf>
          )}
        </Col>
      </Row>
      <div ref={ref}>
        <Row gutter={[0, 16]} justify="center">
          {base64Strings.map((base64String, index) => (
            <Col span={5}>
              <img
                src={base64String}
                key={index}
                style={{ height: "200px", width: "250px" }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default App;
