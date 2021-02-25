package seller.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class SellerManagementPaging {
	private int currentPage;//�쁽�옱�럹�씠吏�
	private int pageBlock;//[�씠�쟾][1][2][3][4][5][�떎�쓬]
	private int pageSize;//1�럹�씠吏��떦 25媛쒖뵫
	private int totalA;//珥앷��닔
	private StringBuffer pagingHTML;
	
	public void makePagingHTML(){
		pagingHTML = new StringBuffer();
		int totalP = (totalA + pageSize-1) / pageSize; //珥앺럹�씠吏��닔

		int startPage = (currentPage-1) / pageBlock * pageBlock + 1;
		
		int endPage = startPage + pageBlock - 1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > pageBlock)
			pagingHTML.append("<span id='paging' onclick='boardPaging("+(startPage-1)+")'>&gt;</span>");
		
		for(int i=startPage; i<=endPage; i++) {
			if(i == currentPage)
				pagingHTML.append("<span id='currentPaging' onclick='boardPaging("+i+")'>"+i+"</span>");
			else
				pagingHTML.append("<span id='paging' onclick='boardPaging("+i+")'>"+i+"</span>");
		}//for
		
		if(endPage < totalP)
			pagingHTML.append("<span id='paging' onclick='boardPaging("+(endPage+1)+")'>&lt;</span>");
	}
}