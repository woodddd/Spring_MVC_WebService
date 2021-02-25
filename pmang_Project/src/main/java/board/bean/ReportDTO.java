package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ReportDTO {
	private int report_seq;
	private String userId;
	private String targetType;
	private String reportContent;
	private int target_seq;

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private Date logtime;

	
	private int countReport;

}
