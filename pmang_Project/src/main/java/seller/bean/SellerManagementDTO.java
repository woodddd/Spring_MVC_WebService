package seller.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class SellerManagementDTO {
	private int item_seq;
	private String img1;
	private String item_subject;
	private String item_state;
	private String item_price;
	private int wish_count;
	private int comment_count;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
	private Date logtime;
}
