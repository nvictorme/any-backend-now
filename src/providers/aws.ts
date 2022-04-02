import {S3} from "aws-sdk";

const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
});

export const generateUploadUrl = async (filename: string): Promise<string|null> => {
    try {
        const uploadUrl = await s3.getSignedUrlPromise('putObject', {
            Bucket: process.env.AWS_BUCKET,
            Key: filename,
            Expires: 60
        });
        return uploadUrl;
    } catch (e) {
        console.error(e);
        return null;
    }
}
