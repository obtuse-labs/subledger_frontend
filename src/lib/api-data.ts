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

export const PRIMITIVES = [
    {num:'01',name:'Plans',desc:'Price, currency and billing cycle that a subscription snapshots from.'},
    {num:'02',name:'Customers',desc:'The people and organisations being billed.'},
    {num:'03',name:'Subscriptions',desc:'Links a customer to a plan; moves through active, paused, cancelled, expired.'},
    {num:'04',name:'Invoices',desc:'Subscription or one-time — a discriminated union enforced at the DB level.'},
    {num:'05',name:'Payments',desc:'Recorded attempts against an invoice, made idempotent by a UNIQUE key.'},
    {num:'06',name:'Ledger',desc:'The append-only record of every money-flow event, insert-only.'}
];

export const LEDGER_BODY = `GET /api/v1/ledger?invoice_id=inv_9f3a2c81

[
    { "entry_type": "invoice_created", "amount": "499.00", "currency": "INR" },
    { "entry_type": "payment_success", "amount": "499.00", "currency": "INR" },
    { "entry_type": "payment_failure", "amount": "499.00", "currency": "INR" }
]`;

export const QUICKSTART_BODY = `git clone https://github.com/utkarsh-vats/subledger_backend.git && cd subledger_backend
cp .env.example .env.local
docker compose --env-file .env.local up -d\t\t# api · postgres 18 · redis · celery
docker compose exec web alembic upgrade head
# open http://localhost:8001/docs\t\t\t\t# interactive OpenAPI schema`;

export const github = "https://github.com/utkarsh-vats/subledger_backend";

const QUICKSTART_BODY_ALT = 'git clone https://github.com/utkarsh-vats/subledger_backend.git && cd subledger_backend\ncp .env.example .env.local\ndocker compose --env-file .env.local up -d      # api · postgres 18 · redis · celery\ndocker compose exec web alembic upgrade head\n# open http://localhost:8001/docs                # interactive OpenAPI schema';

const LEDGER_BODY_ALT = 'GET /api/v1/ledger?invoice_id=inv_9f3a2c81\n\n[\n  { "entry_type": "invoice_created", "amount": "499.00", "currency": "INR" },\n  { "entry_type": "payment_success", "amount": "499.00", "currency": "INR" },\n  { "entry_type": "payment_failure", "amount": "499.00", "currency": "INR" }\n]';

const HERO_BODY_ALT = "POST /api/v1/payments/record\nAuthorization: Bearer <jwt>\nIdempotency-Key: 8f14e45f-ceea-4b2a-9c1e-2b6a1d9f7a02\n\n{\n\t\"invoice_id\": \"inv_9f3a2c81\",\n\t\"amount\": \"499.00\",\n\t\"currency\": \"INR\",\n\t\"status\": \"success\",\n\t\"provider_reference\": \"razorpay_pay_Nk3xQ2\"\n}"