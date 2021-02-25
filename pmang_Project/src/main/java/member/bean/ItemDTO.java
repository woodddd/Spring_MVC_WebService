package member.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ItemDTO {

	private String img1, img2, img3;
	private String itemSubject;
	private String category1, category2, category3;
	private String condition;
	private String item_state;
	private String item_location;
	private String item_price;
	private String nego;
	private String item_content;
	private String hashtag1, hashtag2, hashtag3;
	private String qty;
	
	private int item_like;
	private int hit;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private Date logtime;

}
