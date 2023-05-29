import { BlobServiceClient } from "@azure/storage-blob";
import { Buffer } from 'buffer';
import {cardSize} from "../assets/data/metadata"

Buffer.from('anything', 'base64');
window.Buffer = window.Buffer || require("buffer").Buffer;


const uploadImageToAzure = async (cardname, file, meta, containerName, w=cardSize[0].width, h=cardSize[0].height) => {
  
  const base64Data = file.result.replace(/^data:image\/\w+;base64,/, "");
  
  const img = new Image();
  img.src = 'data:image/jpeg;base64,' + base64Data;
  await new Promise((resolve) => img.onload = resolve);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(img, 0, 0, w, h);

  const resizedBase64Data = canvas.toDataURL('image/jpg').replace(/^data:image\/\w+;base64,/, "");
  const resizedBuffer = Buffer.from(resizedBase64Data, 'base64');

  const blobServiceClient = new BlobServiceClient(`https://firstdraw.blob.core.windows.net${process.env.REACT_APP_AZURE_SASTOKEN}`);

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = `${cardname}.jpg`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const options = {
    blobHTTPHeaders: {
      blobContentType: meta.type
    }
  };
  const uploadBlobResponse = await blockBlobClient.uploadData(resizedBuffer, options);
  console.log(uploadBlobResponse)
  console.log("File uploaded successfully.");
};



export default uploadImageToAzure;



