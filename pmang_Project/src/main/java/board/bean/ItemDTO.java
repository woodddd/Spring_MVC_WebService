package board.bean;

import java.util.Date;


import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ItemDTO {
	private int item_seq;
	private String userId;
	private String img1, img2, img3;
	private String item_subject;
	private String category1, category2, category3;
	private String condition;
	private String item_state;
	private String item_location;
	private String nego;
	private String item_content;
	private String hashtag1, hashtag2, hashtag3;
	private String buyer_key;

	private int item_price;
	private int qty;
	private int hit;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private Date logtime;

}
