package board.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import board.bean.ReviewDTO;

@Transactional
@Repository
public class ReviewDAOMybatis implements ReviewDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void reviewWrite(ReviewDTO reviewDTO) {
		sqlSession.insert("reviewSQL.reviewWrite",reviewDTO);
		
	}

}
