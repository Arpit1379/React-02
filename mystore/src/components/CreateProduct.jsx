import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  ThemeProvider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function CreateProduct() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
     // Check if file is not null before appending
     if (file) {
       formData.append("myFile", file);
     }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    const response = await axios.post(
      "http://localhost:3002/api/product/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data) {
      console.log("Upload success", response.data);
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom>
            Create Product
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              {/* TextFields and Select wrapped in Grid item */}
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                </Select>
              </FormControl>
              <Grid item xs={12}>
                {/* File upload button enhanced with CloudUploadIcon */}
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload File
                  <input
                    type="file"
                    name="myFile"
                    id="fileToUpload"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                {/* Submit button remains unchanged */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </ThemeProvider>
      </>
  );
}

export default CreateProduct;

