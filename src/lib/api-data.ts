export const HERO_BODY = `POST /api/v1/payments/record
Authorization: Bearer <jwt>
Idempotency-Key: 8f14e45f-ceea-4b2a-9c1e-2b6a1d9f7a02

{
	"invoice_id": "inv_9f3a2c81",
	"amount": "499.00",
	"currency": "INR",
	"status": "success",
	"provider_reference": "razorpay_pay_Nk3xQ2"
}`

export const STACK = ['FastAPI','Python 3.14','SQLAlchemy 2.x','PostgreSQL 18','Redis','Celery + Beat','Pydantic v2','Docker Compose'];

const HERO_BODY_ALT = "POST /api/v1/payments/record\nAuthorization: Bearer <jwt>\nIdempotency-Key: 8f14e45f-ceea-4b2a-9c1e-2b6a1d9f7a02\n\n{\n\t\"invoice_id\": \"inv_9f3a2c81\",\n\t\"amount\": \"499.00\",\n\t\"currency\": \"INR\",\n\t\"status\": \"success\",\n\t\"provider_reference\": \"razorpay_pay_Nk3xQ2\"\n}"