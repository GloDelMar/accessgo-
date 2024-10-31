import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
  }
});

async function uploadFileToS3(fileBuffer, fileName) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpeg'
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the file:', err);
      return res.status(400).json({ error: 'Failed to parse file.' });
    }

    console.log(files);
    const file = files.file[0];

    if (!file) {
      return res.status(400).json({ error: 'File is required.' });
    }

    if (!file.filepath) {
      return res.status(400).json({ error: 'File path is undefined.' });
    }

    try {
      const buffer = await fs.promises.readFile(file.filepath);
      const fileName = await uploadFileToS3(buffer, file.originalFilename);
      return res.status(200).json({ success: true, fileName });
    } catch (uploadError) {
      console.error('Error uploading to S3:', uploadError);
      return res.status(500).json({ error: 'Failed to upload file.' });
    }
  });
}
