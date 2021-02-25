package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QnaDTO {
	private int qna_seq;
	private String userid;	//문의 글 작성한사람
	private String select1;	//문의 카테고리1
	private String select2;	//문의 카테고리2
	private String qnaContent;	//문의 내용
	private String qnaReply;	//문의 답변
	private String img1;
	private String img2;
	private String img3;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd")
	private Date logtime;
	
}
