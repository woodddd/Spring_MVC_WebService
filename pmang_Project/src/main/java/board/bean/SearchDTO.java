package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class SearchDTO {
	private String userid;
	private String keyword;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="MM.dd.")
	Date logtime;
}
