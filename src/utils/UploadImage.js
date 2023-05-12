import { BlobServiceClient } from "@azure/storage-blob";
import { Buffer } from 'buffer';

Buffer.from('anything', 'base64');
window.Buffer = window.Buffer || require("buffer").Buffer;

const testAzureConnection = async (sasToken) => {
  const blobServiceClient = new BlobServiceClient(`https://firstdraw.blob.core.windows.net${sasToken}`);


  const containersIterator = blobServiceClient.listContainers();
  for await (const container of containersIterator) {
    console.log(`Container: ${container.name}`);
  }
};



const uploadImageToAzure = async (file, meta, uid) => {
  const base64Data = file.result.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const img = new Image();
  img.src = 'data:image/jpeg;base64,' + base64Data;
  await new Promise((resolve) => img.onload = resolve);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 200;
  canvas.height = 200;

  ctx.drawImage(img, 0, 0, 200, 200);

  const resizedBase64Data = canvas.toDataURL('image/jpeg').replace(/^data:image\/\w+;base64,/, "");
  const resizedBuffer = Buffer.from(resizedBase64Data, 'base64');

  const blobServiceClient = new BlobServiceClient(`https://firstdraw.blob.core.windows.net${process.env.REACT_APP_AZURE_SASTOKEN}`);

  const containerName = "userprofile";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = `${uid}_profile.jpeg`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const options = {
    blobHTTPHeaders: {
      blobContentType: meta.type
    }
  };
  const uploadBlobResponse = await blockBlobClient.uploadData(resizedBuffer, options);
  console.log("File uploaded successfully.");
};



export default uploadImageToAzure;



