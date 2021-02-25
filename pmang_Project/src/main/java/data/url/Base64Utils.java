package data.url;

import java.util.Base64;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Base64Utils {
	private static final String BASE_64_PREFIX_png = "data:image/png;base64,";
	private static final String BASE_64_PREFIX_jpeg = "data:image/jpeg;base64,";
	private static final String BASE_64_PREFIX_jpg = "data:image/jpg;base64,";


    public static byte[] decodeBase64ToBytes(String imageString) {
        if (imageString.startsWith(BASE_64_PREFIX_png))
            return Base64.getDecoder().decode(imageString.substring(BASE_64_PREFIX_png.length()));
        else if (imageString.startsWith(BASE_64_PREFIX_jpeg))
        	 return Base64.getDecoder().decode(imageString.substring(BASE_64_PREFIX_jpeg.length()));
        else if (imageString.startsWith(BASE_64_PREFIX_jpg))
       	 	return Base64.getDecoder().decode(imageString.substring(BASE_64_PREFIX_jpg.length()));
        else
            throw new IllegalStateException("it is not base 64 string");
    }
    

}
