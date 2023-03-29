package vn.project.affiliate.common.util;

import lombok.Getter;
import lombok.Setter;
import lombok.val;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;

import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;

public final class ImageUtils {

    public static ImageInfo calculateWidthHeightOfImage(byte[] imageData) {
        try {
            if (imageData != null) {
                val img = ImageIO.read(new ByteArrayInputStream(imageData));
                if (img != null) {
                    val imageInfo = new ImageInfo();
                    imageInfo.setWidth(img.getWidth());
                    imageInfo.setHeight(img.getHeight());
                    return imageInfo;
                }
            }
        } catch (Exception ignore) {
        }

        return null;
    }

    @Getter
    @Setter
    public static class ImageInfo {
        private int width;
        private int height;
    }

    public static boolean isImage(String fileName) {
        String extension = FilenameUtils.getExtension(fileName);
        switch (extension.toLowerCase()) {
            case "gif":
            case "jpg":
            case "jpeg":
            case "png":
            case "ico":
                return true;
            default:
                return false;
        }
    }

    public static boolean isFlash(String fileName) {
        String extension = FilenameUtils.getExtension(fileName);
        return extension.equalsIgnoreCase("swf");
    }

    public static String getContentType(String fileName) {

        if (StringUtils.isBlank(fileName))
            return StringUtils.EMPTY;

        String extension = FilenameUtils.getExtension(fileName);
        switch (extension.toLowerCase()) {
            case "bwt":
                return "text/x-bwt";
            case "html":
                return "text/html";
            case "css":
            case "scss":
                return "text/css";
            case "js":
                return "application/javascript";
            case "json":
                return "application/json";
            case "gif":
                return "image/gif";
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "ico":
                return "image/x-icon";
            case "svg":
                return "image/svg+xml";
            case "eot":
                return "application/vnd.ms-fontobject";
            case "ttf":
                return "application/x-font-truetype";
            case "woff":
                return "application/font-woff";
            case "woff2":
                return "application/font-woff2";
            case "zip":
                return "application/zip";
            case "swf":
                return "application/x-shockwave-flash";
            case "xlsx":
                return "application/vnd.ms-excel";
            default:
                return StringUtils.EMPTY;
        }
    }

    public static String getExtension(String contentType) {

        switch (contentType.toLowerCase()) {
            case "text/x-bwt":
                return "bwt";
            case "text/html":
                return "html";
            case "text/css":
                return "css";
            case "application/javascript":
                return "js";
            case "application/json":
                return "json";
            case "image/gif":
                return "gif";
            case "image/jpeg":
            case "image/pjpeg":
                return "jpg";
            case "image/png":
                return "png";
            case "image/x-icon":
                return "ico";
            case "image/svg+xml":
                return "svg";
            case "application/vnd.ms-fontobject":
                return "eot";
            case "application/x-font-truetype":
                return "ttf";
            case "application/font-woff":
                return "woff";
            case "application/x-shockwave-flash":
                return "swf";
            default:
                return StringUtils.EMPTY;
        }
    }

    public static boolean isPublicRead(String fileName) {
        if (StringUtils.isBlank(fileName))
            return false;

        if (fileName.toLowerCase().endsWith("css.bwt") || fileName.toLowerCase().endsWith("js.bwt"))
            return true;

        String extension = FilenameUtils.getExtension(fileName);
        switch (extension.toLowerCase()) {
            case "css":
            case "scss":
            case "js":
            case "gif":
            case "jpg":
            case "jpeg":
            case "png":
            case "svg":
            case "eot":
            case "ttf":
            case "woff":
            case "swf":
            case "woff2":
            case "ico":
                return true;
            default:
                return false;
        }
    }

}
