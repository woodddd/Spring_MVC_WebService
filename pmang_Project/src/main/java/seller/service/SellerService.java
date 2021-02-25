package seller.service;

import java.util.List;
import java.util.Map;

import seller.bean.SellerManagementDTO;
import seller.bean.SellerManagementPaging;

public interface SellerService {
	public List<SellerManagementDTO> getSellerManagementList(String pg, String userid);

	public SellerManagementPaging sellerManagementPaging(String pg, String userid);

	public void sellerManagementDelete(int item_seq);

	public void sellerModify(Map<String, String> map);

	public SellerManagementPaging sellerManagementPaging(Map<String, String> map);

	public List<SellerManagementDTO> getManagementSearch(Map<String, String> map);

	public void sellerLogtimeUpdate(int item_seq);

	public void itemstateChange(Map<String,String> map);
}
