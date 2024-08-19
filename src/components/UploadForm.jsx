import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useStorage from '../hooks/useStorage';

const UploadForm = () => {
  const { startUpload}=useStorage();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
   if(e.target.files && e.target.files[0])
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit=(e)=>{
   e.preventDefault();
   if(selectedFile){
    startUpload(selectedFile)
  }
  setSelectedFile(null)
}

  return (
    <div className="py-2">
    <Box component="form" onSubmit={handleSubmit}>
    <input
      type="file"
      accept=".jpeg, .png, .svg"
      onChange={handleFileChange}
      className="hidden"
      id="file-input"
    />
    <label htmlFor="file-input">
      <Button
        variant="contained"
        color="primary"
        component="span"
        startIcon={<CloudUploadIcon />}
      >
        Upload File
      </Button>
    </label>

    {selectedFile && (
  <div>
    <Typography variant="subtitle1" className="ml-4">
      Selected File: {selectedFile.name}
    </Typography>
    <Button type="submit" sx={{ color: "white", backgroundColor: "gray", "&:hover": { backgroundColor: "blue",color: "white"  }}}>Upload</Button>
  </div>
)}
    </Box>
  </div>
  )
}

export default UploadForm
