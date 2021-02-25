package board.dao;

import java.util.List;
import java.util.Map;

import board.bean.ItemDTO;
import board.bean.ReportDTO;
import board.bean.ReviewDTO;
import board.bean.WishDTO;
import member.bean.SellerDTO;

public interface MystoreDAO {

	public void profileImgModify(SellerDTO sellerDTO);

	public SellerDTO getMystore(String userid);

	public void mystoreHitUpdate(String userid);

	public void mystoreModify(Map<String, String> map);

	public List<ItemDTO> getMystoreItemList(Map<String, Object> map);

	public List<WishDTO> getMystoreWishList(Map<String, Object> map);

	public void wishListDelete(Map<String, Object> map);

	public List<ReviewDTO> getMystoreReviewList(Map<String, Object> map);

	public String getMystoreItemCnt(String userid);

	public String getMystoreWishCnt(String userid);

	public String getMystoreReviewCnt(String userid);

	public List<ItemDTO> getMystoreItemPopularList(Map<String, Object> map);

	public List<ItemDTO> getMystoreItemLowerPriceList(Map<String, Object> map);

	public List<ItemDTO> getMystoreItemHighestPriceList(Map<String, Object> map);

	public List<ItemDTO> getMystoreWishPopularList(Map<String, Object> map);

	public List<ItemDTO> getMystoreWishHighestPriceList(Map<String, Object> map);

	public List<ItemDTO> getMystoreWishLowerPriceList(Map<String, Object> map);

	public int getUserCnt();

	public int getItemCnt();

	public List<ReportDTO> getReportList();

	public int getTotalA();

	public List<ReportDTO> getReport(String userid);

	public List<String> getReportTarget();

	public void noticeWrite(Map<String, String> map);

	public void insertSeller(String userId);

}
