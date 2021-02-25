package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ReviewDTO {
	
	private String sellerid;	//������ ��ȣ
	private int item_seq;	//��ǰ��ȣ
	private String reviewWriter;	//���� �ۼ���
	private String reviewSubject;	//��������
	private String reviewContent;	//���䳻��
	private String reviewStamp;		//���� ����
	private String img1;		//�������1
	private String img2;		//�������2
	private String img3;		//�������3
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd")
	private Date reviewLogtime;		//�����Ͻð�
	
	
	private String pf_photo;
}
