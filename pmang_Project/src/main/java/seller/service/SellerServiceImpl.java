package seller.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import seller.bean.SellerManagementDTO;
import seller.bean.SellerManagementPaging;
import seller.dao.SellerManagementDAO;

@Service
public class SellerServiceImpl implements SellerService {
	@Autowired 
	private SellerManagementDAO sellerManagementDAO;
	@Autowired
	private SellerManagementPaging sellerManagementPaging;
	
	@Override
	public List<SellerManagementDTO> getSellerManagementList(String pg, String userid) {
		//페이징 처리
		int endNum = Integer.parseInt(pg)*5;
		int startNum = endNum-4;
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		
		return sellerManagementDAO.getSellerManagementList(map);
	}
	
	@Override
	public SellerManagementPaging sellerManagementPaging(String pg, String userid) {
		int totalA = sellerManagementDAO.getSellerManagementTotalA(userid);	//총 글 수 	
		
		sellerManagementPaging.setCurrentPage(Integer.parseInt(pg));
		sellerManagementPaging.setPageBlock(5);
		sellerManagementPaging.setPageSize(5);
		sellerManagementPaging.setTotalA(totalA);
		sellerManagementPaging.makePagingHTML();
		
		return sellerManagementPaging;
	}
	
	@Override
	public void sellerManagementDelete(int item_seq) {		
		sellerManagementDAO.sellerManagementDelete(item_seq);
	}
	
	@Override
	public void sellerModify(Map<String, String> map) {
		sellerManagementDAO.sellerModify(map);
	}

	@Override
	public SellerManagementPaging sellerManagementPaging(Map<String, String> map) {
		int totalA = sellerManagementDAO.getManagementSearchTotalA(map);
		
		sellerManagementPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		sellerManagementPaging.setPageBlock(5);
		sellerManagementPaging.setPageSize(Integer.parseInt(map.get("setting")));
		sellerManagementPaging.setTotalA(totalA);
		sellerManagementPaging.makePagingHTML();
		
		return sellerManagementPaging;
	}

	@Override
	public List<SellerManagementDTO> getManagementSearch(Map<String, String> map) {
		int endNum = Integer.parseInt(map.get("pg")) * Integer.parseInt(map.get("setting"));
		int startNum = endNum-Integer.parseInt(map.get("setting"))-1;
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		return sellerManagementDAO.getsellerManagementSearch(map);
	}

	@Override
	public void sellerLogtimeUpdate(int item_seq) {
		sellerManagementDAO.sellerLogtimeUpdate(item_seq);
		
	}

	@Override
	public void itemstateChange(Map<String, String> map) {
		sellerManagementDAO.itemstateChange(map);
	}

}
