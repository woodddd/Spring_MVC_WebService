package board.bean;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class NoticeDTO {
	private String notice_seq;		//공지사항 시퀀스
	private String noticeSubject;	//공지사항 글제목
	private String noticeContent;	//공지사항 글내용	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd")
	private String logtime;			//글 쓴 시간
}
