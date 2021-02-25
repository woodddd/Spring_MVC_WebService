package seller.dao;

import java.util.List;
import java.util.Map;

import seller.bean.SellerManagementDTO;

public interface SellerManagementDAO {

	public List<SellerManagementDTO> getSellerManagementList(Map<String, Object> map);

	public int getSellerManagementTotalA(String userid);

	public void sellerManagementDelete(int item_seq);

	public void sellerModify(Map<String, String> map);

	public int getManagementSearchTotalA(Map<String, String> map);

	public List<SellerManagementDTO> getsellerManagementSearch(Map<String, String> map);

	public void sellerLogtimeUpdate(int item_Seq);

	public void itemstateChange(Map<String, String> map);

}
