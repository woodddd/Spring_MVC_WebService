package member.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class SellerDTO {
	private String userid;	
	private String marketname;	
	private String pf_photo;
	private String pf_content;
	private int markethit;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private Date marketdate;
}
