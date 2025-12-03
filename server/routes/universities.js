const express = require('express');
const router = express.Router();
const { getUniversityData, getUniversityById, getUniversityByName } = require('../data/universities');

/**
 * GET /api/universities
 * 모든 대학 정보 조회
 */
router.get('/', (req, res) => {
  try {
    const universities = getUniversityData();
    res.json({
      success: true,
      data: universities
    });
  } catch (error) {
    console.error('Universities error:', error);
    res.status(500).json({
      error: '대학 정보 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * GET /api/universities/:id
 * ID로 대학 정보 조회
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const university = getUniversityById(parseInt(id));

    if (!university) {
      return res.status(404).json({
        error: '해당 대학을 찾을 수 없습니다.'
      });
    }

    res.json({
      success: true,
      data: university
    });
  } catch (error) {
    console.error('University by ID error:', error);
    res.status(500).json({
      error: '대학 정보 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * GET /api/universities/search/:name
 * 이름으로 대학 검색
 */
router.get('/search/:name', (req, res) => {
  try {
    const { name } = req.params;
    const university = getUniversityByName(name);

    if (!university) {
      return res.status(404).json({
        error: '해당 대학을 찾을 수 없습니다.'
      });
    }

    res.json({
      success: true,
      data: university
    });
  } catch (error) {
    console.error('University search error:', error);
    res.status(500).json({
      error: '대학 검색 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

module.exports = router;
