package vn.project.affiliate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.affiliate.service.AwsStorageService;

import javax.imageio.ImageIO;
import javax.validation.Valid;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/aws")
public class AwsStorageController {

    @Autowired
    private AwsStorageService service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestBody @Valid String base64String) throws IOException {

        String base64Image = base64String.split("base64%")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
//        try {
            return new ResponseEntity<>(service.uploadFileBase64(base64String), HttpStatus.OK);
//        } catch (Exception e){
//            log.error(e.toString());
//            return new ResponseEntity<>("Invalid Access Key",HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam(value="file") MultipartFile file){
//        try {
//            return new ResponseEntity<>(service.uploadFile(file), HttpStatus.OK);
//        } catch (Exception e){
//            log.error(e.toString());
//            return new ResponseEntity<>("Invalid Access Key",HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable(value="fileName") String fileName){

        byte[] data = service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        try {
            return ResponseEntity
                    .ok()
                    .contentLength(data.length)
                    .header("Content-type", "application/octet-stream")
                    .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable(value="fileName") String fileName){
        try {
            return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
        } catch (Exception e){
            log.error(e.toString());
            return new ResponseEntity<>("Invalid Access Key",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
