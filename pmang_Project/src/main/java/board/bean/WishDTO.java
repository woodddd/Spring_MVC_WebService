package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class WishDTO {
	private int item_seq;
	private String item_subject;
	private String img1;
	private String item_price;
	private String item_location;
	private String item_state;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd")
	private Date logtime;
}
