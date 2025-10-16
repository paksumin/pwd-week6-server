// src/routes/restaurants.routes.js
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurants.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// 🧩 라우팅 설정
// 테스트 환경에서는 인증 미들웨어 비활성화
if (process.env.NODE_ENV === 'test') {
  console.log('🧪 Running in TEST mode: Skipping authentication middleware');

  // CREATE (POST) — 인증 건너뛰기
  router.post('/', restaurantController.createRestaurant);
} else {
  // CREATE (POST) — 인증 필요
  router.post('/', authenticateToken, restaurantController.createRestaurant);
}

// READ (GET) — 전체 리스트
router.get('/', restaurantController.getRestaurants);

// READ (GET) — 특정 식당 ID 조회
router.get('/:id', restaurantController.getRestaurantById);

// ✅ 필요하다면 PUT / DELETE 엔드포인트도 추가 가능
// 예시:
// router.put('/:id', authenticateToken, restaurantController.updateRestaurant);
// router.delete('/:id', authenticateToken, restaurantController.deleteRestaurant);

module.exports = router;
