import { BlobServiceClient } from "@azure/storage-blob";

const deleteImageFromAzure = async (containerName, imageName) => {
  const blobServiceClient = new BlobServiceClient(`https://firstdraw.blob.core.windows.net${process.env.REACT_APP_AZURE_SASTOKEN}`);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  try {
    await containerClient.deleteBlob(imageName);
    console.log(`Image ${imageName} deleted successfully.`);
  } catch (error) {
    console.error("There was an error deleting the image: ", error);
  }
};

export default deleteImageFromAzure;

