const express = require('express');
const router = express.Router();
const chatbotService = require('../services/chatbotService');

/**
 * POST /api/chat
 * 챗봇에 메시지 전송
 */
router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        error: 'userId와 message는 필수입니다.'
      });
    }

    const result = await chatbotService.processMessage(userId, message);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: '메시지 처리 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * GET /api/chat/history/:userId
 * 사용자의 대화 히스토리 조회
 */
router.get('/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const history = chatbotService.getHistory(userId);

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      error: '히스토리 조회 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

/**
 * DELETE /api/chat/history/:userId
 * 사용자의 대화 히스토리 삭제
 */
router.delete('/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    chatbotService.clearHistory(userId);

    res.json({
      success: true,
      message: '대화 히스토리가 삭제되었습니다.'
    });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({
      error: '히스토리 삭제 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

module.exports = router;
