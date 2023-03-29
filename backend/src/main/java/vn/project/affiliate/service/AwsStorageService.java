package vn.project.affiliate.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
@Slf4j
public class AwsStorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public String uploadFile(MultipartFile file){
        File fileObj = convertMultipartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        fileObj.delete();
        return "File uploaded : " + fileName;
    }

    // Temporary
    public String uploadFileBase64(String base64String){
        System.out.println(base64String);
        String base64Image = base64String.split("base64%")[1];
        byte[] bI = org.apache.commons.codec.binary.Base64.decodeBase64(base64Image.getBytes());
        System.out.println(bI);
        InputStream fis = new ByteArrayInputStream(bI);
        String fileName = System.currentTimeMillis() + "_";

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(bI.length);
        metadata.setContentType("image/png");
        metadata.setCacheControl("public, max-age=31546000");
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fis, metadata));
        return "File upload: " + fileName;
    }

    public byte[] downloadFile(String fileName){
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try{
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e){
            e.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName){
        s3Client.deleteObject(bucketName, fileName);
        return fileName + " removed ";

    }


    private File convertMultipartFileToFile(MultipartFile file){
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)){
            fos.write(file.getBytes());
        } catch(IOException e){
            log.error("Error converting", e);
        }
        return convertedFile;
    }
}
