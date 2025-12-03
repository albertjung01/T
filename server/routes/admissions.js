const express = require('express');
const router = express.Router();
const {
  getAdmissionsData,
  getSusiInfo,
  getJeongsiInfo,
  getAdmissionsCalendar
} = require('../data/admissions');

/**
 * GET /api/admissions
 * 모든 입시 정보 조회
 */
router.get('/', (req, res) => {
  try {
    const admissions = getAdmissionsData();
    res.json({
      success: true,
      data: admissions
    });
  } catch (error) {
    console.error('Admissions error:', error);
    res.status(500).json({
      error: '입시 정보 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * GET /api/admissions/susi
 * 수시 전형 정보 조회
 */
router.get('/susi', (req, res) => {
  try {
    const susiInfo = getSusiInfo();
    res.json({
      success: true,
      data: susiInfo
    });
  } catch (error) {
    console.error('Susi info error:', error);
    res.status(500).json({
      error: '수시 정보 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * GET /api/admissions/jeongsi
 * 정시 전형 정보 조회
 */
router.get('/jeongsi', (req, res) => {
  try {
    const jeongsiInfo = getJeongsiInfo();
    res.json({
      success: true,
      data: jeongsiInfo
    });
  } catch (error) {
    console.error('Jeongsi info error:', error);
    res.status(500).json({
      error: '정시 정보 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * GET /api/admissions/calendar
 * 입시 일정 조회
 */
router.get('/calendar', (req, res) => {
  try {
    const calendar = getAdmissionsCalendar();
    res.json({
      success: true,
      data: calendar
    });
  } catch (error) {
    console.error('Calendar error:', error);
    res.status(500).json({
      error: '입시 일정 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

module.exports = router;
