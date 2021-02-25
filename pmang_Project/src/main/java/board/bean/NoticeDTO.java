package board.bean;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class NoticeDTO {
	private String notice_seq;		//�������� ������
	private String noticeSubject;	//�������� ������
	private String noticeContent;	//�������� �۳���	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd")
	private String logtime;			//�� �� �ð�
}
