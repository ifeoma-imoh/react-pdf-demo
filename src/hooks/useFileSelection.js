import { useCallback, useEffect, useState } from "react";

const useFileSelection = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addFile = (file) => {
    setSelectedFiles((currentSelection) => [...currentSelection, file]);
  };

  const removeFile = (file) => {
    setSelectedFiles((currentSelection) => {
      const fileIndex = currentSelection.indexOf(file);
      const newSelection = currentSelection.slice();
      newSelection.splice(fileIndex, 1);
      return newSelection;
    });
  };

  const getBase64Representation = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getBase64Strings = useCallback(async () => {
    setIsLoading(true);
    const base64Strings = await Promise.all(
      selectedFiles.map((file) => getBase64Representation(file))
    );
    setBase64Strings(base64Strings);
    setIsLoading(false);
  }, [selectedFiles]);

  useEffect(() => {
    getBase64Strings().catch(console.error);
  }, [getBase64Strings]);

  return [addFile, removeFile, base64Strings, isLoading];
};

export default useFileSelection;
